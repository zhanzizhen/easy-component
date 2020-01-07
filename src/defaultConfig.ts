export default `
// easy-component, a vscode extension, works for crease coding efficience.

const jsContent = \`import React from 'react';

class {{Name}} extends React.Component {
  render() {
    return (
      <div>hello world</div>
    )
  }
}

export default {{Name}};
\`;

const cssContent = \`.root{
  // some styles
}
\`;

const indexContent = \`import {{Name}} from './{{Name}}';

export default {{Name}};
\`;

module.exports = {
  // {{Name}}是你在vscode输入框的输入值
  '{{Name}}': {
    '{{Name}}.jsx': jsContent, // 配置你的js文件内容
    '{{Name}}.scss': cssContent, // 配置你的css文件内容
    'index.js': indexContent, // Component entry
  },
};
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
