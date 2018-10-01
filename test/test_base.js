'use strict';

var expect	= require('expect.js');
var testReq	= require('../');

testReq.ROOT_PATH	= __dirname;

describe('#base', function()
{
	it('#require', function()
	{
		var requireAfterWrite = testReq('base');
		expect(requireAfterWrite('base.json')).to.eql({data: 1});
	});

	describe('#check result', function()
	{
		beforeEach(function()
		{
			testReq.BUILD = false;
		});
		afterEach(function()
		{
			testReq.BUILD = false;
		});

		checkResult('base');
	});

	describe('#build', function()
	{
		beforeEach(function()
		{
			testReq.BUILD = true;
		});
		afterEach(function()
		{
			testReq.BUILD = false;
		});

		checkResult('tmp');
	});
});


function checkResult(type)
{
	var requireAfterWrite = testReq(type);

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
			expect(testReq.code2arr(data)).to.eql(testReq.code2arr(otherData));
		});

		it('#function width outcode', function()
		{
			var data = function code()
			{
				console.log(11);
			}

			data = data.toString()+'\n var dd = 1;';

			var otherData = requireAfterWrite('base_string_func2.js', data);
			expect(testReq.code2arr(data)).to.eql(testReq.code2arr(otherData));
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
		expect(testReq.code2arr(data)).to.eql(testReq.code2arr(otherData));
	});
}
