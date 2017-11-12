#!/bin/bash

# use this script by passing the database password:
# db_password='my_password' extract_packages.sh yyyy-mm-dd

export EDI_BASE_DIR=~/Documents/DataCzar/
export DECRYPT_DIR=/Volumes/PEGASUS/EdX_Data/
export DATA_DIR=/Volumes/PEGASUS/EdX_Data_ENC/
export MYSQL_PASSWORD=$db_password
export DIR=$1
export WEEKS_PRIOR=$2

node ${EDI_BASE_DIR}edx-download-packages/get_latest_from_aws.js --count-weeks-prior $WEEKS_PRIOR --wildcard '*NHI*,*MTN*,*SWL*,*HOV*,*SSS*' --output $DIR

echo "Importing course data from: ${EDI_BASE_DIR}edx-download-packages/sample/${DIR}"
python3 ${EDI_BASE_DIR}edx-download-packages/course-progress.py --course 'MTN101x SWL101x NHI101x HOV101x SSS101x' --directory ${EDI_BASE_DIR}edx-download-packages/sample/${DIR} --tables 'auth_user auth_userprofile student_courseenrollment student_courseaccessrole user_id_map student_languageproficiency' -D

#rm -rf ${EDI_BASE_DIR}edx-download-packages/sample/**

${EDI_BASE_DIR}edx-download-packages/generate_schemas.sh

#cp -vf ${EDI_BASE_DIR}edx-download-packages/newcastlex_research.db ${EDI_BASE_DIR}build-research-db/db/
cp -Rvf ${EDI_BASE_DIR}edx-download-packages/model_schemas/sqlite ${EDI_BASE_DIR}build-research-db/model_schemas/

# remove .DS_Store
rm -vf ${EDI_BASE_DIR}build-research-db/model_schemas/mysql/.DS_Store
rm -vf ${EDI_BASE_DIR}build-research-db/model_schemas/sqlite/.DS_Store
rm -vf ${EDI_BASE_DIR}build-research-db/model_schemas/sqlite/.js

echo "Executing MySql import script..."
node ${EDI_BASE_DIR}build-research-db/index.js

# remove unencrypted data for security
#rm -vf ${EDI_BASE_DIR}edx-download-packages/newcastlex_research.db
#rm -vf ${EDI_BASE_DIR}build-research-db/db/newcastlex_research.db
#rm -rf $DECRYPT_DIR/** && echo "Removed decrypted files"
#rm -rf clean/** && echo "Removed cleaned decrypted data"
