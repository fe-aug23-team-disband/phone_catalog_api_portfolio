#!/usr/bin/env bash

npx sequelize-cli db:migrate

echo "Migration complete"

npm run seed

npx sequelize-cli db:seed:undo:all

npx sequelize-cli db:seed:all

npm i
