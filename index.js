const path = require("path");

const buildModuleReact = (fnName, pathName, fileName) => {
  return `
		const React = require('react');

		const ${fnName} = (props) => 
		{
			return React.createElement('svg', { 
				...props, 
				'data-jest-file-name': '${pathName}',
				'data-jest-svg-name': '${fileName}',
				'data-testid': '${fileName}'
			});
		}

		module.exports.default = ${fnName};
		module.exports.ReactComponent = ${fnName};
	`;
};

const createFunctionName = (base) => {
  const words = base.split(/\W+/);
  return words.reduce((identifer, word) => {
    return identifer + word.substr(0, 1).toUpperCase() + word.substr(1);
  }, "");
};

const processSvg = (contents, fileName) => {
  const parts = path.parse(fileName);
  if (parts.ext.toLowerCase() === ".svg") {
    const functionName = createFunctionName(parts.name);
    const code = buildModuleReact(functionName, parts.base, parts.name);
    return { code };
  }

  return contents;
};

module.exports = { process: processSvg };
