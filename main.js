'use strict';

const { app, BrowserWindow, globalShortcut } = require('electron');
const DiscordRPC = require('./rpc');
const prompt = require('./prompt');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: false,
	//frame: false,
	//fullScreen: true,
    //titleBarStyle: 'hidden',
	title: 'Taiko No Tatsujin',
	//resizeable: false,
	//moveable: false,
	webPreferences: {
	  devTools: false,
	  preload: __dirname + '/renderer.js'
	}
  });

  mainWindow.setMenu(null);
  //mainWindow.setFullScreen(true);
  mainWindow.loadURL("https://taiko.bui.pm/");

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function multiplayer() {
    prompt({
	  title: 'Multiplayer',
	  label: 'Enter multiplayer game code (it comes after the "#" in the game URL)',
	  value: '-----',
	  inputAttrs: {
		  type: 'text'
	  }
    })
	.then((input) => {
      if (input || !input.includes('-----') || input.length > 5 || input.length < 5) {
	    mainWindow.loadURL("https://taiko.bui.pm/#" + input);
	  }
    });
}

app.on('ready', createWindow);
app.on('ready', () => {
  setInterval(function(){mainWindow.setTitle("Taiko no Tatsujin")}, 500);
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    return false;
  });
  var RX = false;
  globalShortcut.register('F11', () => {
	if (RX) {
      RX = false;
	  mainWindow.setFullScreen(false);
	} else {
	  RX = true;
	  mainWindow.setFullScreen(true);
	}
    return false;
  });
  globalShortcut.register('Alt+Enter', () => {
	if (RX) {
      RX = false;
	  mainWindow.setFullScreen(false);
	} else {
	  RX = true;
	  mainWindow.setFullScreen(true);
	}
    return false;
  });
  globalShortcut.register('CommandOrControl+W', () => {
    return false;
  });
  globalShortcut.register('F1', multiplayer);
  globalShortcut.register('Alt+M', multiplayer);
});

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const clientId = '578730910640373790';

DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc || !mainWindow) {
    return;
  }

  rpc.setActivity({
    details: '  ',
    state: '  ',
    largeImageKey: 'taiko',
    largeImageText: 'Taiko No Tatsujin',
    instance: false
  });
}

rpc.on('ready', () => {
  setActivity();
  setInterval(() => {
    setActivity();
  }, 15e3);
});


rpc.login({ clientId }).catch(console.error);