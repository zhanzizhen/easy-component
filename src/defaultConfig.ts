export default `
/**
 * easy-component, a vscode extension, works for increase coding efficience.
 * if you modify this file, you need to reload your vscode window.
 * */

const generateJs = (Name) => \`import React from 'react';

export default class \${Name} extends React.Component {
  render() {
    return (
      <div>hello world</div>
    )
  }
}

\`;

const generateCss = (Name) => \`.root{
  // some styles
}
\`;

const generateIndex = (Name) =>  \`import \${Name} from './\${Name}';

export default \${Name};
\`;

module.exports = [
  {
    label: '模板1',
    creator: (Name) => ({
      // {{Name}}是你在vscode输入框的输入值
      [Name]: {
        [\`\${Name}.jsx\`]: generateJs(Name), // 配置你的js文件内容
        [\`\${Name}.scss\`]: generateCss(Name), // 配置你的css文件内容
        'index.js': generateIndex(Name), // Component entry
      },
    })
  },
  {
    label: '模板2',
    creator: (Name)=>({
      [Name]: {
        [\`\${Name}.txt\`]: 'hello world'
      }
    })
  }
];
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
