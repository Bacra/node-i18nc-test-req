I18NC-Test-Req
==================

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls][coveralls-image]][coveralls-url]
[![NPM License][license-image]][npm-url]


# Install

```
npm install i18nc-test-req --save-dev
```

# Useage

```javascript
var expect = require('expect.js');
var testReq = require('i18nc-test-req');
var requireAfterWrite = testReq('base');
testReq.ROOT_PATH = __dirname;

var data = function code(){
  console.log(11);
}

var otherData = requireAfterWrite('func.js', data);
expect(testReq.code2arr(data)).to.eql(testReq.code2arr(otherData));
```

## Run In Production

```
mocha test/test_*
```

## Run In Development

```
cross-env TEST_BUILD=true mocha test/test_*
```


[npm-image]: http://img.shields.io/npm/v/i18nc-test-req.svg
[downloads-image]: http://img.shields.io/npm/dm/i18nc-test-req.svg
[npm-url]: https://www.npmjs.org/package/i18nc-test-req
[travis-image]: https://travis-ci.com/Bacra/node-i18nc-test-req.svg?branch=master
[travis-url]: https://travis-ci.com/Bacra/node-i18nc-test-req
[coveralls-image]: https://img.shields.io/coveralls/Bacra/node-i18nc-test-req.svg
[coveralls-url]: https://coveralls.io/github/Bacra/node-i18nc-test-req
[license-image]: http://img.shields.io/npm/l/i18nc-test-req.svg
