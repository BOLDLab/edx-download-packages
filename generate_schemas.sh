#use npm install sequelize-auto -g to install
sequelize-auto -o ${EDI_BASE_DIR}/edx-download-packages/models -e sqlite -d ${EDI_BASE_DIR}/edx-download-packages/newcastlex_research.db -h localhost -a ${EDI_BASE_DIR}/edx-download-packages/model_defs.json

node ${EDI_BASE_DIR}/edx-download-packages/extract_schemas.js
