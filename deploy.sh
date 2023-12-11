#!/usr/bin/env bash

npm run migrate

echo "Migration complete"

npm run seed

echo "Seeding complete"

npm i
