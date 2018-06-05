import child_process from 'child_process';
import express from 'express';
import opn from 'opn';
import WebSocket from 'ws';

const app = express();
const { exec } = child_process;
const wss = new WebSocket.Server({ port: 8081 });
let isDarkMode = false;

app.use(express.static('public'));

app.listen(8080);

wss.on('connection', ws => {
	if (isDarkMode) {
		ws.send('dark');
	} else {
		ws.send('light');
	}
});

setInterval(() => {
	const cmd = 'defaults read -g AppleInterfaceStyle';

	child_process.exec(cmd, (err, stdout, stderr) => {
		if (!isDarkMode && stdout) {
			isDarkMode = true;
			wss.clients.forEach(ws => {
				ws.send('dark');
			});
		} else if (isDarkMode && stderr) {
			isDarkMode = false;
			wss.clients.forEach(ws => {
				ws.send('light');
			});
		}
	});
}, 1000 / 15);

opn('http://127.0.0.1:8080/');
opn('/System/Library/PreferencePanes/Appearance.prefPane');

console.log('Listening at http://127.0.0.1:8080/');
