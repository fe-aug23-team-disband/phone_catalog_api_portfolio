#!/usr/bin/env bash

npm i

npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate

echo "Migration complete"

npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:seed:all

echo "Seeding complete"
