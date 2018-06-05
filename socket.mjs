import child_process from 'child_process';
import WebSocket from 'ws';

const { exec } = child_process;
const wss = new WebSocket.Server({ port: 3000 });
let isDarkMode = false;

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
}, Math.ceil(1000 / 15));
