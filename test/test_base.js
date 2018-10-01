'use strict';

var expect				= require('expect.js');
var testRequire			= require('../');
var requireAfterWrite	= testRequire('generator');
testRequire.ROOT_PATH	= __dirname;

describe('#base', function()
{
	it('#write', function()
	{
		var json = {d: 1};
		var otherJSON = requireAfterWrite('base.json', json);
		expect(json).to.eql(otherJSON);
	});
});
