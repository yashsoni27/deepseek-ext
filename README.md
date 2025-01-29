# DeepSeek VSCode Extension

A Visual Studio Code extension that integrates the DeepSeek language model directly into your editor, allowing you to chat with AI without leaving VSCode.

## Features

- Chat with DeepSeek AI directly within VSCode
- Stream responses in real-time
- Simple and clean interface
- Powered by the DeepSeek-R1 1.5B model

![DeepSeek Chat Interface](images/chat-interface.png)

## Requirements

- VSCode 1.60.0 or higher
- Node.js and npm installed
- Ollama installed locally with the DeepSeek model

## Installation

1. Install Ollama from [ollama.ai](https://ollama.ai)
2. Pull the DeepSeek model:
   ```bash
   ollama pull deepseek-r1:1.5b
   ```
3. Install this extension from the VSCode marketplace

## Usage

1. Open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Type "DeepSeek: Start Chat" to open the chat interface
3. Type your question in the text area
4. Click "Ask" or press Enter to get a response

## Known Issues

- Currently only supports the DeepSeek-R1 1.5B model
- Requires local installation of Ollama

## Release Notes

### 1.0.0
- Initial release
- Basic chat functionality with streaming responses
- Integration with Ollama

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This extension is licensed under the MIT License.

---

**Note:** This extension is not affiliated with DeepSeek. DeepSeek is a trademark of its respective owner.
