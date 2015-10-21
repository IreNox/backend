@ECHO OFF

echo %~dp0

cd server

IF "%1"=="start" (
	CALL:start
)

IF "%1"=="stop" (
	CALL:stop
)

cd ..
GOTO end

:start
echo Start Server...
call forever start -w -l %~dp0log/server.log -o %~dp0log/server_out.log -e %~dp0log/server_error.log server.js
GOTO:EOF

:stop
echo Stop Server...
call forever stop server.js
GOTO:EOF

:end