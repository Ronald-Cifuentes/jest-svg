# jest-svg

## based on:
* [original](https://github.com/half-halt/svg-jest)
* [issue](https://github.com/half-halt/svg-jest/issues/7#issue-1421584058)
* [documentation](https://jestjs.io/docs/code-transformation)

This library transforms .SVG files for jest in React components.

The transformed item will have the following properties on it.
* data-jest-file-name: The name of the file (e.g. 'some-image.svg')
* data-jest-svg-name: Only the name portion of the file (e.g. 'some-image')
* data-testid: Same as data-jest-svg-name, but works with @testing-library/react getByTestId()

Works with both of these formats:

```js
import MySvg from '../images/image.svg';

import { ReactComponent as MySvg}  from '../images/image.svg';
```

The following JavaScript 
```js
const MyComponent = () => {
  return (
    <div>
	<MySvg/>
    </div>
  );
}
```

The resulting HTML:

```html
<div>
    <svg data-jest-file-name='image.svg' 
        data-jest-svg-name='image'
        data-testid='image'/>
</div>
```

# Usage
Configuring Jest, the example below uses package.json, but you can see: https://jestjs.io/docs/en/configuration for other examples.

```json
{
    "jest": {
        "transform": {
            "\\.svg$": "jest-svg"
        }
    }
}
```
