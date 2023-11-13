
支持 React 项目本地开发时 <kbd>Option(Alt)+Click</kbd> 页面上对应元素即可跳转到编辑器对应组件行列。

目前也支持了 Vue3 项目的跳转，不过只能跳转到文件，无法跳转到具体行列。

![](/assets/tutorial.gif)


### 使用
安装地址： [chrome应用商店](https://chrome.google.com/webstore/detail/react1s/gpcoahaomdfmekggblkckofkgjggnjlp)

ps: 可能有部分朋友连接不上chrome应用商店，可以将本项目中build文件夹中的zip包下载然后自行本地上传到浏览器拓展中

### 插件配置
目前支持 VS Code、VS Code-insiders、WebStorm 和自定义路径，默认配置是VS Code，可点击插件选项调整配置
![编辑器配置](/assets/editor.png)


### QA
>Q: Option(Alt)+Click不起作用
>
>A: 对于一些比较旧的React项目，babel 配置可能需要[@babel/plugin-transform-react-jsx-source](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-source)支持

>Q: 在 WSL2 环境中如何使用
>
>A: 编辑器配置选择自定义路径，然后填入 `vscode://vscode-remote/wsl+Ubuntu/${fileName}:${lineNumber}:${columnNumber}`，其中的 Ubuntu 可替换成自己的 WSL2 发行版名称

>Q: 在 VS Code 最新版本(1.84)中使用时，控制台报错，无法跳转到编辑器，这是由于 VS Code 的跳转 url 策略更新导致的问题，临时解决方案如下
>
>A: 编辑器配置选择自定义路径，然后填入 `vscode://file${fileName}:${lineNumber}:${columnNumber}`

### 参考项目

[click-to-component](https://github.com/ericclemmons/click-to-component)
