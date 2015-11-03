@ECHO OFF

cd client

IF "%1"=="start" (
	CALL:start
)

IF "%1"=="stop" (
	CALL:stop
)

cd ..
GOTO end

:start
echo Start Client...
call forever start -w -a -l %~dp0log/client.log -o %~dp0log/client_out.log -e %~dp0log/client_error.log client.js
GOTO:EOF

:stop
echo Stop Client...
call forever stop client.js
GOTO:EOF

:end