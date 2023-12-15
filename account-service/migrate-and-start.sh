#!/bin/sh

npx prisma generate
npm run build
npx prisma db push
node dist/main.js