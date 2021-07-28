# easy-component README

## 背景

easy-component 是什么？一个 vscode 插件。

使用场景：通过配置好的模板，来快速生成文件夹+文件。

## How To Use

怎么使用 easy-component： 调用`Easy Create Component`命令，然后输入一个 name 值即可。

初次使用时：需要先调用`Easy Create Component`命令（通过`ctrl + shift + p`），easy-component 会自动在.vscode 文件夹生成`easy-component.js`

## easy-component.js 的介绍

easy-component.js 的路径是`项目根目录/.vscode/easy-component.js`，是唯一的配置入口。

easy-component 会在创建文件的时候，通过 require('.vscode/easy-component.js')去读取你的配置，所以请确保`easy-component.js`是个合法的 commonjs 模块。

```ts
/**文件结构**/
interface FileStructure {
  // dirName表示文件夹名字
  [dirName: string]:
    | string // 你的file content
    | FileStructure; // 嵌套的file object;
}

/** inputName是你输入的组件名**/
type Creator = (inputName: string) => FileStructure;
```

`easy-component.js`的输出可以是：

1. module.exports = Creator，举例：

   ```js
   module.exports = (inputName) => {
     [inputName]: {
       'index.ts': 'file content 1',
       [`${inputName}.tsx`]: 'file content 2',
       [`${inputName}.scss`]: 'file content 3'
     }
   };
   ```

   若你在`Easy Create Component`中输入 App，那么将在根目录生成如下文件：

   ```text
   -App
    -index.ts
    -App.tsx
    -App.scss
   ```

2. 若你想使用多模板，也可以输出一个数组(since v2.1.0)：module.exports = [{ label: string; creator: Creator }]

## 使用示例

1. 单模板的：
   ![guide gif](https://user-images.githubusercontent.com/22932241/104184497-8033e900-544e-11eb-94b8-110edb42236b.gif)

2. 多模板的：[待补充]

## Requirements

- nodejs>=7.6

## Extension Settings

${appRoot}/.vscode/easy-component.js

## Known Issues

Q. easy-component 和 code snippet 有啥区别
A. code snippet 只有创建代码片段的能力，而 easy-component 有创建文件的能力

Q. easy-component 灵活吗
A. 灵活，它不是 string-base 的 template，它支持 function，用户可以在 function 里面去自定义文件结构的生成逻辑。

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
2. improvement the easy-component.js

### 1.1.1

1. improvement README.md

### 1.2.0

1. fix the bug on macOs

### 2.0.0

1. change easy-component.js's output to a funtion, which is more flexible for uses.

### 2.0.1

1. 把 easy-component.config.js 改名为 easy-component.js
2. easy-component.js 从根目录调整为.vscode 目录

### 2.1.0

1. easy-component.js 支持输出数组，从而支持多模板

### 2.1.2

1. improve documentation
