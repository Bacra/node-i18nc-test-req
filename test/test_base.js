'use strict';

var expect				= require('expect.js');
var testRequire			= require('../');
var requireAfterWrite	= testRequire('base');
testRequire.ROOT_PATH	= __dirname;

describe('#base', function()
{
	it('#json', function()
	{
		var data = {data: 1};
		var otherData = requireAfterWrite('base.json', data);
		expect(data).to.eql(otherData);
	});

	describe('#string', function()
	{
		it('#base', function()
		{
			var data = 'var d = 1;';
			var otherData = requireAfterWrite('base_string.js', data);
			expect(data).to.eql(otherData);
		});

		it('#function', function()
		{
			var data = function code()
			{
				console.log(11);
			}

			data = data.toString();

			var otherData = requireAfterWrite('base_string_func.js', data);
			expect(testRequire.code2arr(data)).to.eql(testRequire.code2arr(otherData));
		});

		it('#function width outcode', function()
		{
			var data = function code()
			{
				console.log(11);
			}

			data = data.toString()+'\n var dd = 1;';

			var otherData = requireAfterWrite('base_string_func2.js', data);
			expect(testRequire.code2arr(data)).to.eql(testRequire.code2arr(otherData));
		});

		it('#module.exports', function()
		{
			var data = {num: 22};
			var code = 'module.exports = '+JSON.stringify(data);

			var otherData = requireAfterWrite('base_string_module.js', code);
			expect(data).to.eql(otherData);
		});
	});

	it('#function', function()
	{
		var data = function code()
		{
			console.log(11);
		}

		var otherData = requireAfterWrite('base_func.js', data);
		expect(testRequire.code2arr(data)).to.eql(testRequire.code2arr(otherData));
	});
});
