@echo off
echo Checking requiries...
echo.
@echo off
NET SESSION >nul 2>&1
set NODE_VER=null
set NODE_EXEC=node-v0.8.11-x86.msi
set SETUP_DIR=%CD%
node -v >tmp.txt
set /p NODE_VER=<tmp.txt
del tmp.txt
IF %NODE_VER% == null (
	echo Installing node...
	mkdir tmp
	IF NOT EXIST tmp/%NODE_EXEC% (
		echo Node setup file does not exist. Downloading...
		cd ../bin
		START /WAIT wget http://nodejs.org/dist/v0.8.11/%NODE_EXEC%
		move %NODE_EXEC% %SETUP_DIR%/tmp
	)
	cd %SETUP_DIR%/tmp
	START /WAIT %NODE_EXEC%
	cd %SETUP_DIR%
) ELSE (
	echo Node is already installed. Proceeding...
)
echo Checking dependencies...
IF NOT EXIST node_modules\ws\index.js (
	echo Installing dependencies ...
	call npm i --save doc-ready
	call npm i --save node-fetch
	call npm i --save ws
	cd %SETUP_DIR%
) ELSE (
	echo Dependencies already installed!
)
echo.
echo Starting process...
echo Press F11 or Alt+Enter to enter fullscreen.
TITLE Taiko no Tatsujin
electron\dist\electron.exe main.js
echo Exit 127
exit