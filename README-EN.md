# easy-component README

## background

What is an easy-Component? A vscode plug-in.

Application scenario: Use the configured template to quickly generate folders and files.

## How To Use

How to use easy-Component: Call the 'easy Create Component' command and enter a name value.

First use: You need to call the 'Easy Create Component' command (with 'CTRL + Shift + p') and the Easy-Component will automatically generate 'easy-Component.js' in the.vscode folder

## Easy Component.js

The path to easy-component.js is' project root /.vscode/ easy-Component.js' and is the only configuration entry.

Easy-component will read your configuration when creating the file by requiring ('.vscode/easy-component.js'), so make sure that 'easy-Component.js' is a valid CommonJS module.

```ts
/** File structure **/
interface FileStructure {
  // dirName Indicates the folder name
  [dirName: string]:
    | string // your file content
    | FileStructure; // Nested file object;
}

/** inputName is the name of the component you entered  **/
type Creator = (inputName: string) => FileStructure;
```

The output of `easy-component.js` can be:

1. Module.exports = Creator, example:

    ```js
    module.exports = (inputName) => {
      [inputName]: {
        'index.ts': 'file content 1',
        [`${inputName}.tsx`]: 'file content 2',
        [`${inputName}.scss`]: 'file content 3'
      }
    };
    ```

    If you type App in 'Easy Create Component', the following files will be generated in the root directory:

    ```text
      -App
        -index.ts
        -App.tsx
        -App.scss
    ```

2. If you want to use multiple templates, you can also export an array (since v2.1.0) : module.exports = [{label: string; creator: creator}]

## Use example

1. Single template:
   ![guide gif](https://user-images.githubusercontent.com/22932241/104184497-8033e900-544e-11eb-94b8-110edb42236b.gif)

2. Multi-template: [to be added]

## Requirements

- nodejs > = 7.6

## Extension Settings

${appRoot}/.vscode/easy-component.js

## Known Issues

Q. What is the difference between easy-Component and Code snippets
A. Code snippet has the ability to create code snippets, whereas Easy-Component has the ability to create files

Q. Is the Easy-Component flexible
A. Flexible. It is not A string-base template, but supports function. Users can customize the generation logic of file structure in function.

## Release Notes

### 0.2.0

relase the first stable version

### 1.0.0

1. Tested in a formal environment (vscode marketplace)
2. Solved the bug of file generation location
3. Optimized interactive experience
4. Adjusted the code structure

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

1. Rename easy-Component.config. js to Easy-Component.js
2. Adjust the easy-Component. js directory from the root directory to the.vscode directory

### 2.1.0

1. Easy-component. js supports output arrays, thus supporting multiple templates

### 2.1.2

1. improve documentation
