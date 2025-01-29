import * as vscode from 'vscode';
import ollama from 'ollama';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "deepseek-ext" is now active!');

	const disposable = vscode.commands.registerCommand('deepseek-ext.start', () => {

		const panel = vscode.window.createWebviewPanel(
			'deepChat',
			'DeepSeek Chat',
			vscode.ViewColumn.One,
			{enableScripts: true}
		)

		panel.webview.html = getWebviewContent();

		panel.webview.onDidReceiveMessage(async (message: any) => {
			if (message.command === 'chat') {
				const userPrompt = message.question;
				// console.log("User Prompt: ", userPrompt);
				let responseText = '';
				try {
					const streamResponse = await ollama.chat({
						model: 'deepseek-r1:1.5b',
						messages: [{role: 'user', content: userPrompt}],
						stream: true
					})

					for await (const part of streamResponse) {
						responseText += part.message.content;
						panel.webview.postMessage({command: 'chatResponse', answer: responseText});
					}

				} catch (error) {
					panel.webview.postMessage({command: 'chatResponse', answer: `Error: ${String(error)}`});
				}
			}
		})

	})

	context.subscriptions.push(disposable);
}

function getWebviewContent(): string {
	return /*html*/`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<style>
			body {font-family: sans-serif; margin: 1rem;}
			#prompt {width:100%; box-sizing: border-box; padding: 0.5rem;}
			#response {border: 1px solid #ccc; padding: 0.5rem; margin-top: 1rem;}
		</style>
	</head>
	<body>
		<h2>Deepseek VSCode Extension</h2>
		<textarea id="prompt" rows="3" placeholder="Ask your question here"></textarea><br />
		<button id="askBtn">Ask</button>
		<div id="response"></div>

		<script>
			const vscode = acquireVsCodeApi();
			const prompt = document.getElementById('prompt');
			const askBtn = document.getElementById('askBtn');
			const response = document.getElementById('response');

			document.getElementById('askBtn').addEventListener('click', () => {
				const question = document.getElementById('prompt').value;
				vscode.postMessage({command: 'chat', question});
			});

			window.addEventListener('message', event => {
				const {command, answer} = event.data;
				if (command === 'chatResponse') {
					response.innerText	= answer;
				}
			});
		</script>

	</body>
	</html>
	`
}

export function deactivate() {}
