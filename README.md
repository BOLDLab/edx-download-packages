# edx-download-packages

## Requires:
**Node: v8.6.0**

**Python: v3.6.3**

```
npm install sequelize-auto -g
npm install tables -g

chmod +x extract_packages.sh
chmod +x generate_schemas.sh
chmod +x newcastleX_download_zip.sh

# Ensure you install a Python 3.6.3+ `virtualenv` within the `edx-download-packages` folder called 'env'.

source env/bin/activate

db_password='my_password' extract_packages.sh output_directory_name[e.g. 2017-10-09]
```
The command will extract the sqlite schemas for each table to `sample\`.

It will generate a sqlite database containing each file as a table to the build-research-db application: `build-research-db/db/newcastlex_research.db`

If you are using this script standalone then change the `storage:` property on around line 11 of `index.js`
