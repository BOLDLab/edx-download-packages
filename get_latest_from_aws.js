const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const debug = require('debug')('latest_aws');

if(!process.env.DATA_DIR) {
  console.error("DATA DIR env variable not set");
  process.exit(1);
}

if(!process.env.DECRYPT_DIR) {
  console.error("DECRYPT_DIR env variable not set");
  process.exit(1);
}

if(!process.env.GPG_TTY) {
    console.error("GPG_TTY env variable not set.");
    console.error("Please set to environment variable:\n");
    console.error("GPG_TTY=$(tty)\nexport GPG_TTY");
    console.error("https://www.gnupg.org/documentation/manuals/gnupg/Invoking-GPG_002dAGENT.html#Invoking-GPG_002dAGENT");
    process.exit(1);
}

let errors = 0;
let count = 1;
let wildcard = '*';
let default_dir = null;

process.argv.forEach((arg, i, a) => {
    if(arg === '-c' || arg === '--count-weeks-prior') {
        count = a[i+1];
    }
    if(arg === '-w' || arg === '--wildcard') {
        wildcard = a[i+1];
    }
    if(arg === '-o' || arg === '--output') {
        default_dir = a[i+1];
    }
});

const run = (error, stdout, sterr) => {
  console.log("Processing these files");

  if(!fs.existsSync(process.env.EDI_BASE_DIR+'edx-download-packages/buffer.json')) {
      a = stdout.split('\n');
      a.sort().reverse();

      const p = JSON.stringify(a);
      fs.writeFileSync(process.env.EDI_BASE_DIR+'edx-download-packages/buffer.json', p);
  }

  console.log("Weeks prior");
  if(count > 0) {
      console.log(a.slice(count-1, count));
  } else {
      console.log(a[0]);
  }

  const result = [];
  let c = count;

  const iterate = (v) => {
      let a2 = [];
      let date = '';

      if(v) {
          a2 = v.split(' ');

          const record = {
              date: a2[0],
              time: a2[1],
              name: a2[a2.length-1],
              size: a2[a2.length-2]
          };

          result.push(record);

          const dir = default_dir ? default_dir : record.date;

          console.log(record);
          console.log("Using wildcard: "+wildcard);
          console.log("Fetching and decrypting, this may take a minute...");

          console.log(process.env.EDI_BASE_DIR+'edx-download-packages/newcastleX_download_zip.sh '+dir+' '+record.name+' '+wildcard);
          const thread = exec(process.env.EDI_BASE_DIR+'edx-download-packages/newcastleX_download_zip.sh '+dir+' '+record.name+' '+wildcard, (err, stdout, sterr) => {
              if(sterr) {
                  console.error("ERROR downloading files");
                  console.error(sterr);
                  console.error("continuing anyway...");
                  ++errors;
              }
              if(stdout) {
                  console.log("INFORMATION:");
                  console.log(stdout);
                  console.log("Error count: "+errors);
                  console.log((c+1)+" / "+a.length+" records");
              }
          });

          thread.stdout.on('data', (data) => {
              console.log(`stdout: ${data}`);
          });

          thread.stderr.on('data', (data) => {
              console.log(`stderr: ${data}`);
          });

          thread.on('close', (code) => {
              console.log(`child process exited with code ${code}`);
              if(c == count)
                return;
              else
                iterate(a[++c]);
          });
      }
    };

  iterate(a[c]);
};

const has_buffer = fs.existsSync(process.env.EDI_BASE_DIR+'edx-download-packages/buffer.json');

let diff = 0;
  if(has_buffer) {
      const s = fs.readFileSync(process.env.EDI_BASE_DIR+'edx-download-packages/buffer.json');
      a = JSON.parse(s);

      const stats = fs.statSync(process.env.EDI_BASE_DIR+'edx-download-packages/buffer.json',
        (err, stats) => {
            if(err) { debug(err); }
      });

      diff = new Date().getTime() - new Date(stats.ctime).getTime();
  }

  const days = has_buffer ? Math.floor(diff/1000/60/60/24) : 0;

  if(days < 7) {
    console.log("Starting from buffer, no AWS query required");
    run();
  } else {
    console.log("Downloading latest data file from EdX");
    exec('aws s3 ls course-data | grep newcastle', run);
  }
