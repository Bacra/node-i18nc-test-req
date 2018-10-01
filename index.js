'use strict';

// var _	= require('lodash');
var fs		= require('fs');
var path	= require('path');
var mkdirp	= require('mkdirp');
var debug	= require('debug')('i18nc-test-require');

exports = module.exports = requireAfterWrite;
exports.ROOT_PATH = __dirname;

function requireAfterWrite(subpath)
{
	var file_path = 'output/'+subpath;

	return function(filename, data, options)
	{
		var file = file_path+'/'+filename;
		return requireAfterWriteReal(file, data, options);
	};
}

exports.requireAfterWriteReal = requireAfterWriteReal;
function requireAfterWriteReal(file, data)
{
	if (!process.env.TEST_BUILD || arguments.length == 1)
	{
		return _require(file);
	}

	var type = typeof data;
	switch(type)
	{
		case 'object':
			data = JSON.stringify(data, null, '\t');
			if (path.extname(file) == '.js')
			{
				data = 'module.exports = '+data;
			}
			break;

		case 'string':
			if (data.substr(0, 14) != 'module.exports')
			{
				if (data.substr(0, 8) == 'function'
					&& !_checkTextWrapCode(data)
					// 如果包含function，但内容有超过3行，那可能就不是单纯的func了
					&& data.match(/\n\S+/g).length <= 3)
				{
					data = 'module.exports = '+data+'\n';
				}
				else
				{
					data = wrapCode4pkg(data);
				}
			}
			break;

		case 'function':
			data = 'module.exports = '+data.toString()+'\n';
			break;
	}

	var realfile = path.join(exports.ROOT_PATH, file);
	mkdirp.sync(path.dirname(realfile));
	fs.writeFileSync(realfile, data);

	debug('build write file:%s', realfile);

	return _require(file);
}

function _require(file)
{
	var file = path.normalize(exports.ROOT_PATH + '/' + file);
	// for browserify require key
	var data = require(file);

	if (typeof data == 'function')
	{
		var tmp = data.toString();
		if (_checkTextWrapCode(tmp))
		{
			return tmp.substr(25, tmp.length-28);
		}
	}

	return data;
}


exports.wrapCode4pkg = wrapCode4pkg;
function wrapCode4pkg(code)
{
	return 'module.exports = function textWrapCode(){\n\n'+code+'\n\n}\n';
}

function _checkTextWrapCode(code)
{
	return code.substr(0, 24) == 'function textWrapCode(){';
}
