#!/bin/sh
cd ..

cd server
forever stop server.js
cd ..

git pull

cd server
forever start server.js
cd ..

cd update_script
