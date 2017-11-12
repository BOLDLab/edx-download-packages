const fs = require('fs');
const model_dir = process.env.EDI_BASE_DIR+'edx-download-packages/models/';
const mysql_model_schemas = process.env.EDI_BASE_DIR+'edx-download-packages/model_schemas/mysql';
const sqlite_model_schemas = process.env.EDI_BASE_DIR+'edx-download-packages/model_schemas/sqlite';

/*
  Extracts schemas for mysql and sqlite DBs.
  The mysql DB schema only needs to be generated once.
  Add the course_id foreign key to each model to complete the schema.

  See McGillx Docs:
  http://mcgillx-research-documentation.readthedocs.io/en/latest/rstfiles/edx_relational_db_migration.html#constructing-the-db
*/

fs.readdir(model_dir,
  (err, files) => {
      files.forEach(file => {

          const a = file.split('_');
          const b = file.split('.');

          let mysql_n = "";
          a.forEach((o, i) => {
              if( i > 2 ) {
                      mysql_n += o;
                  if( i < a.length - 1 )
                      mysql_n += "_";
              }
          });

          const mysql_model_name = mysql_n;
          const sqlite_model_name = b[0]+".js";

          fs.mkdir(model_dir, () => { /*silent*/ });
          fs.mkdir(process.env.EDI_BASE_DIR+'edx-download-packages/model_schemas', () => { /*silent*/ });
          fs.mkdir(mysql_model_schemas, () => { /*silent*/  });
          fs.mkdir(sqlite_model_schemas, () => { /*silent*/  });

          // extract mysql schemas
          fs.exists(mysql_model_schemas,
                  () => {
                      fs.copyFile(model_dir+file, mysql_model_schemas+"/"+mysql_model_name,
                          () => {
                                console.log("Copied mysql schema for: "+mysql_model_name);
                      });

                      fs.copyFile(model_dir+file, sqlite_model_schemas+"/"+sqlite_model_name,
                          () => {
                                console.log("Copied sqlite schema for: "+sqlite_model_name);
                      });
                  }
          );

          //extract sqlite schemas
        });
    });
