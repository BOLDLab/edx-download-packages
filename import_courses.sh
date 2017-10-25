#!/bin/bash

# use this script by passing the database password:
# db_password='my_password' import_courses.sh yyyy-mm-dd
export EDI_BASE_DIR=/Users/ps158/Documents/DataCzar/
export DECRYPT_DIR=/Volumes/PEGASUS/EdX_Data/
export DATA_DIR=/Volumes/PEGASUS/EdX_Data_ENC/
export MYSQL_PASSWORD=$db_password
export DIR=$1

node get_latest_from_aws.js --count 1 --wildcard *NHI*,*MTN*,*SWL*,*HOV*,*SSS*

echo "Importing course data from: sample/${DIR}"
python course-progress.py --course 'MTN101x SWL101x NHI101x HOV101x SSS101x' --directory sample/${DIR} --tables 'auth_user auth_userprofile student_courseenrollment student_courseaccessrole user_id_map student_languageproficiency' -D

./generate_schemas.sh
#rm -rvf sample/**
cp -vf newcastlex_research.db ${EDI_BASE_DIR}build-research-db/db
cp -Rvf model_schemas/sqlite ${EDI_BASE_DIR}build-research-db/model_schemas/

# remove .DS_Store
rm -vf ${EDI_BASE_DIR}build-research-db/model_schemas/mysql/.DS_Store
rm -vf ${EDI_BASE_DIR}build-research-db/model_schemas/sqlite/.DS_Store
rm -vf ${EDI_BASE_DIR}build-research-db/model_schemas/sqlite/.js

node ${EDI_BASE_DIR}build-research-db/index.js
