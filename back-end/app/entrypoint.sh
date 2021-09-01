#!/bin/sh

cd /app
ln -s /deps/node_modules /app/node_modules
exec npm start