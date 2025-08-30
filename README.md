
# React1s Chrome Extension

[中文](#中文) | [English](#english)

## 中文

支持 React 项目本地开发时 <kbd>Option(Alt)+Click</kbd> 页面上对应元素即可跳转到编辑器对应组件行列。

目前也支持了 Vue3 项目的跳转，不过只能跳转到文件，无法跳转到具体行列。

## English

Support for React projects during local development. Use <kbd>Option(Alt)+Click</kbd> on page elements to jump to the corresponding component lines in your editor.

Currently also supports Vue3 project navigation, but can only jump to files, not specific lines and columns.

![](/assets/tutorial.gif)


### 使用
安装地址： [chrome应用商店](https://chrome.google.com/webstore/detail/react1s/gpcoahaomdfmekggblkckofkgjggnjlp)

ps: 可能有部分朋友连接不上chrome应用商店，可以将本项目中build文件夹中的zip包下载然后自行本地上传到浏览器拓展中

### 插件配置
目前支持 VS Code、VS Code-insiders、WebStorm 和自定义路径，默认配置是VS Code，可点击插件选项调整配置
![插件配置面板](/assets/editor.png)

### 国际化支持
插件现在支持多种语言：
- 中文 (默认)
- English
- 日本語
- 한국어
- Español
- Français
- Deutsch

插件会自动检测浏览器语言并显示相应的文本。

### QA
>Q: Option(Alt)+Click不起作用
>
>A: 对于一些比较旧的React项目，babel 配置可能需要[@babel/plugin-transform-react-jsx-source](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-source)支持

>Q: 在 WSL2 环境中如何使用
>
>A: 在插件配置面板选择自定义路径，然后填入 `vscode://vscode-remote/wsl+Ubuntu/${fileName}:${lineNumber}:${columnNumber}`，其中的 Ubuntu 可替换成自己的 WSL2 发行版名称

>Q: 在 VS Code 最新版本(1.84)中使用时，控制台报错，无法跳转到编辑器，这是由于 VS Code 的跳转 url 策略更新导致的问题，临时解决方案如下
>
>A: 在插件配置面板选择自定义路径，然后填入 `vscode://file${fileName}:${lineNumber}:${columnNumber}`

## English

### Installation
Install from: [Chrome Web Store](https://chrome.google.com/webstore/detail/react1s/gpcoahaomdfmekggblkckofkgjggnjlp)

Note: If you can't access the Chrome Web Store, you can download the zip file from the build folder and manually upload it to your browser extensions.

### Extension Configuration
Currently supports VS Code, VS Code-insiders, WebStorm, and custom paths. Default configuration is VS Code. Click the extension options to adjust settings.
![Extension Configuration Panel](/assets/editor.png)

### Internationalization Support
The extension now supports multiple languages:
- Chinese (default)
- English
- Japanese
- Korean
- Spanish
- French
- German

The extension automatically detects your browser language and displays the appropriate text.

### FAQ
>Q: Option(Alt)+Click doesn't work
>
>A: For some older React projects, babel configuration may need [@babel/plugin-transform-react-jsx-source](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-source) support

>Q: How to use in WSL2 environment
>
>A: Select custom path in the extension configuration panel, then enter `vscode://vscode-remote/wsl+Ubuntu/${fileName}:${lineNumber}:${columnNumber}`, where Ubuntu can be replaced with your WSL2 distribution name

>Q: Console errors in VS Code latest version (1.84), unable to jump to editor
>
>A: Select custom path in the extension configuration panel, then enter `vscode://file${fileName}:${lineNumber}:${columnNumber}`

### 参考项目

[click-to-component](https://github.com/ericclemmons/click-to-component)
