export default `
/**
 * easy-component, a vscode extension, works for increase coding efficience.
 * if you modify this file, you need to reload your vscode window.
 * */

const generateJsText = (ComponentName) => \`import React from 'react';

class \${ComponentName} extends React.Component {
  render() {
    return (
      <div>hello world</div>
    )
  }
}

export default \${ComponentName};
\`;

const generateCssText = (ComponentName) => \`.root{
  // some styles
}
\`;

const generateIndexText = (ComponentName) =>  \`import \${ComponentName} from './\${ComponentName}';

export default \${ComponentName};
\`;

module.exports = (ComponentName) => ({
  // {{Name}}是你在vscode输入框的输入值
  [ComponentName]: {
    [\`\${ComponentName}.jsx\`]: generateJsText(ComponentName), // 配置你的js文件内容
    [\`\${ComponentName}.scss\`]: generateCssText(ComponentName), // 配置你的css文件内容
    'index.js': generateIndexText(ComponentName), // Component entry
  },
});
`;

/*
{{Name}}：你在vscode输入框的输入值
举例： 配置"{{Name}}": {
            "{{Name}}.jsx": jsContent,
            "{{Name}}.scss": cssContent,
          }
  当你在输入框输入App时，产生结果是下面这些文件：
  -App
    -App.jsx
    -App.scss
  
  github: https://github.com/zhanzizhen/easy-component
*/
