# easy-component README

a vscode extension

## Features

react 或者 vue 的开发过程中，为了组件的可维护和可复用性，我们经常需要写很多功能单一的小组件。
这导致我们经常需要手动的新建一个组件文件夹(一般包括一个 js 文件和一个 scss/less)，同时还要往这两个文件写一些样板代码。
这个过程是费时且无聊的，easy-component 这个 vscode 插件就是为此而生。

它提供一个模板配置文件`easy-component.config.js`，位于根目录。你可以配置你想要的生成结果，然后通过 ctrl + shift + p 调用`Create Component Structure`命令来生成组件文件。

## Requirements

- nodejs>=7.6

## Extension Settings

just set it on \${appRoot}/easy-component.config.js

## Known Issues

Q. how to generate easy-component.config.js
A. run `ctrl + shift + p` then select the command `Create Component Structure`

## Release Notes

### 0.2.0

正式发布第一版

### 1.0.0

1. 经过正式环境的测试（vscode marketplace）
2. 解决了文件生成位置的 bug
3. 优化了交互体验
4. 调整了代码结构

### 1.1.0

1. 优化代码架构
2. 完善配置文件的默认配置

### 1.1.1

1. 优化 README.md
