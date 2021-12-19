# @handlebars/allow-prototype-access 

[![NPM version](https://img.shields.io/npm/v/@handlebars/allow-prototype-access.svg)](https://npmjs.com/package/@handlebars/allow-prototype-access)

> Revert a Handlebars-instance ^4.6.0 to the proto-accessing behavior of 4.5.3

This package allows you to create a new Handlebars instance, that behaves like version 4.5.3 and allows access to the
prototype

## Why?

In the past, Handlebars would allow you to access prototype methods and properties of the input object form the
template.

```hbs
start{{aString.trim}}end
```

with the input

```
{
    aString: '   abc    '
}
```

would result in the output `startabcend`.

Multiple security issues have come from this behaviour. Details can be found in the npm-security advisories
[755](https://www.npmjs.com/advisories/755),
[1164](https://www.npmjs.com/advisories/1164), [1316](https://www.npmjs.com/advisories/1316),
[1324](https://www.npmjs.com/advisories/1324) and [1325](https://www.npmjs.com/advisories/1325) and in the blog-article
of [Mahmoud Gamal](http://mahmoudsec.blogspot.com/2019/04/handlebars-template-injection-and-rce.html).

Those issues have been fixed, but we cannot be sure that there are ways around the fixes. That's why, in `handlebars@^4.6.0`.
access to the object prototype has been disabled completely.

Now, if you use custom classes as input to Handlebars, your code won't work anymore.

```js
class TestClass {
  aMethod() {
    return "returnValue";
  }
}

const Handlebars = require("handlebars");
const template = Handlebars.compile("start {{aMethod}} end");
const output = template(new TestClass());

console.log(output);
```

```
Handlebars: Access has been denied to resolve the property "aMethod" because it is not an "own property" of its parent.
You can add a runtime option to disable the check or this warning:
See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details
start  end
```

This has now led to a number of problems for projects like [typedoc](https://npmjs.com/package/typedoc), because they are using such classes
as input for the template.

This package automatically adds runtime options to each template-calls, disabling the security restrictions.

## When NOT to use it?

The question is: Who is writing the templates that Handlebars is executing? Is it only your developers? Is it the user?

The leak published in [npm advisory 755](https://www.npmjs.com/advisories/755) meant that somebody writing a template
could effectively execute code inside your server. Although the disclosed exploits have been fixed, new exploits have
become much more probable, now that the principle is well-known, so:

**If your users are writing templates and you execute them on your server you should NOT use this package, but rather
find other ways to solve the problem.** I suggest you  convert your class-instances to plain JavaScript objects before
passing them to the template function.
Every property or function you access, must be an "own property" of its parent.

```js
class TestClass {
  aMethod() {
    return "returnValue";
  }

  asTemplateInput() {
    return {
      aMethod: this.aMethod.bind(this)
    };
  }
}

const Handlebars = require("handlebars");

const template = Handlebars.compile("{{aMethod}}");
const output = template(new TestClass().asTemplateInput());

console.log(output);
```




# Installation

```
npm install @handlebars/allow-prototype-access
```

# Usage (plain Handlebars)

The following example demonstrates how to use this module:

```js
class TestClass {
  aMethod() {
    return "returnValue";
  }
}

const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const insecureHandlebars = allowInsecurePrototypeAccess(Handlebars)

const template = insecureHandlebars.compile('{{aMethod}}')
const output = template(new TestClass);

console.log(output)
```

This will generate the following output

```
returnValue
```

# Usage ([express-handlebars](https://npmjs.com/package/express-handlebars) and [mongoose](https://npmjs.com/package/mongoose))

`express-handlebars` does not allow you to specify runtime-options to pass
to the template function. This package can help you disable prototype checks
for you models.

**Only do this, if you have full control over the templates that are executed in the server.**

```js
const express = require('express');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const app = express();

app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
...
```





# License

`@handlebars/allow-prototype-access` is published under the MIT-license.

See [LICENSE.md](LICENSE.md) for details.


 
# Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).