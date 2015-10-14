#!/bin/sh
cd ..

# check for git updates
check_for_update() {
	git fetch origin
	git_diff=`git diff origin/master`
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

if [ check_for_update ]
	then update_data
fi

cd update_script
chmod +x ./update.sh
