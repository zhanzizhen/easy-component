# easy-component README

## Features

react 或者 vue 的开发过程中，为了代码可复用性和代码可维护性性，我们经常需要尽量小的去划分组件。
但是，经常需要手动的新建一个组件文件夹，这个文件夹一般包括一个 js 文件和一个 css(scss/less)，同时还要往这两个文件写一些样板代码。
这个过程是无聊且费时，easy-component 这个 vscode 插件就是为此而生。

它提供一个模板配置文件，你可以配置你想要的生成结果，然后通过 ctrl + shift + p 调用`Create Component Structure`命令，便可以生成你的配置结果。

模板配置文件： \${appRoot}/easy-component.config.js

## Requirements

- nodejs>=7.6

## Extension Settings

none

<!-- ## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension. -->

## Release Notes

Users appreciate release notes as you update your extension.

### 0.2.0

正式发布第一版

### 1.0.0

1. 经过正式环境的测试（vscode marketplace）
2. 解决了文件生成位置的 bug
3. 优化了交互体验
4. 调整了代码结构
