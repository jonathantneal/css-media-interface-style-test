!function () {
	function init() {
		// connect to the WebSocket watching for "Dark Mode"
		var socket = new WebSocket('ws://127.0.0.1:8081');
		var style = document.querySelector('style#textarea');
		var textarea = document.querySelector('textarea');
		var mode;

		// whenever the WebSocket is updated, update the CSS files
		socket.addEventListener('message', function (event) {
			mode = event.data;

			update();
		});

		textarea.addEventListener('input', update);

		function update() {
			if (mode === 'dark') {
				style.firstChild.data = textarea.value.replace('(color-scheme: dark)', 'all');
			} else {
				style.firstChild.data = textarea.value.replace('(color-scheme: light)', 'all');
			}
		}
	}

	// do this once the page is parsed
	!function d() {
		/c/.test(document.readyState) && document.body
		? document.removeEventListener('readystatechange', d) | init()
		: document.addEventListener('readystatechange', d)
	}()
}()
