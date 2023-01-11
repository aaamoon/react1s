
支持React项目本地开发时<kbd>Option+Click</kbd> 页面上对应元素即可跳转到编辑器对应组件行列。

![](/assets/tutorial.gif)


### USAGE
安装地址： [chrome应用商店](https://chrome.google.com/webstore/detail/react1s/gpcoahaomdfmekggblkckofkgjggnjlp)

ps: 可能有部分朋友连接不上chrome应用商店，可以将本项目中build文件夹中的zip包下载然后自行本地上传到浏览器拓展中

### 插件配置
目前支持 VS Code、VS Code-insiders、WebStorm，默认配置是VS Code，可点击插件选项调整配置
![编辑器配置](/assets/editor.png)


### QA
>Q: Option+Click不起作用
>
>A: 对于一些比较旧的React项目，babel 配置可能需要[@babel/plugin-transform-react-jsx-source](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx-source)支持