const jsContent = `
import React from 'react'

class \${Name} extends React.component{
  render(){
    return (
      <div>hello world</div>
    )
  }
}
`;

const cssContent = `
.root{
  font-size: 14px;
}
`;

export default {
  "${Name}": {
    "${Name}.jsx": jsContent,
    "${Name}.scss": cssContent
  }
};
