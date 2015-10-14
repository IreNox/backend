#!/bin/sh

BASEDIR=$(dirname $0)
cd &BASEDIR
cd ..
git checkout .

check_for_update() {
	git fetch origin
	git_diff=`git diff origin/master | grep diff`
	if [ -n "$git_diff" ]
		then return 1
	fi
	
	return 0
}

function update_data() {
	cd server
	forever stop server.js
	cd ..

	git merge origin/master

	cd server
	forever start server.js
	cd ..
}

check_for_update
update=$?

if [ $update = 1 ] ;
	then update_data
fi

cd update_script
chmod +x ./update.sh
