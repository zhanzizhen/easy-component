export default `
// {{Name}}：你在vscode输入框的输入值
/*
举例1：
"{{Name}}": {
    "{{Name}}.jsx": jsContent,
    "{{Name}}.scss": cssContent,
  }
  当你在输入框输入App时，最后的产生结果是：
  -App
    -App.jsx
    -App.scss
*/

const jsContent = \`import React from 'react'

class {{Name}} extends React.component{
  render(){
    return (
      <div>hello world</div>
    )
  }
}
\`;

const cssContent = \`.root{
  // some styles
}
\`;

module.exports = {
  // {{Name}}是你在vscode输入框的输入值
  '{{Name}}': {
    '{{Name}}.jsx': jsContent, // 配置你的js文件内容
    '{{Name}}.scss': cssContent, // 配置你的css文件内容
  },
};
`;
