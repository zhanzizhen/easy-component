# easy-component README

a vscode extension

## Features

En: In the development of React or Vue, we used to write a quantity of small component for the better code-readable. Consequently we have to create js/css one by one and write some template code in them. These repeated codes are boring and cost us too much time. So the vscode plugin named easy-component was created to slove the problem.

It provides a `easy-component.config.js` config file located in the root of app. You can press `ctrl + shift + p` in vscode and then choose `Create Component Structure` order to create files.

Zh: React 或者 Vue 的开发过程中，为了组件的可维护和可复用性，我们经常需要写很多功能单一的小组件。
这导致我们经常需要手动的新建一个组件文件夹(一般包括一个 js 文件和一个 scss/less)，同时还要往这两个文件写一些样板代码。
这个过程是费时且无聊的，easy-component 这个 vscode 插件就是为此而生。

它提供一个模板配置文件`easy-component.config.js`，位于根目录。你可以配置你想要的生成结果，然后通过 `ctrl + shift + p` 调用`Create Component Structure`命令来生成组件文件。

## Requirements

- nodejs>=7.6

## Extension Settings

just set it on \${appRoot}/easy-component.config.js

## Known Issues

Q. how to generate easy-component.config.js
A. run `ctrl + shift + p` then select the command `Create Component Structure`

## Release Notes

### 0.2.0

relase the first stable version

### 1.0.0

1. 经过正式环境的测试（vscode marketplace）
2. 解决了文件生成位置的 bug
3. 优化了交互体验
4. 调整了代码结构

### 1.1.0

1. improvement the code structure
2. improvement the easy-component.config.js

### 1.1.1

1. improvement README.md

### 1.2.0

1. try to fix the bug on macOs
