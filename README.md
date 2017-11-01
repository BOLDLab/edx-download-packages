# edx-download-packages

## Requires:
**Node: v8.6.0**

**Python: v3.6.3**

**GNUpg 2.2.1**

*Tested on: OS X El Capitan and OS X High Sierra*

*May need minor modification for use on other flavours of Unix*

```
npm install sequelize-auto -g
npm install tables -g

db_password='my_password' extract_packages.sh output_directory_name[e.g. 2017-10-09|latest|my_data_folder]
```
The command will extract the sqlite schemas for each table to `sample\output_directory_name`.
The `db_password` parameter is for the mySQL server.

It will generate a sqlite database containing each file as a table to the build-research-db application: `build-research-db/db/newcastlex_research.db`. The sqlite database is generated without a password.

If you are using this script standalone then change the `storage:` property on around line 11 of `index.js`
