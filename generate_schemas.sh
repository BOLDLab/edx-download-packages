#use npm install sequelize-auto -g to install
sequelize-auto -o "./models" -e sqlite -d newcastlex_research.db -h localhost -a ./model_defs.json

node extract_schemas.js
