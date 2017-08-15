
module.exports = function customError(mes, code)
{
	this.Error = mes || 'Error';
	this.code = code;
	this.stack = (new Error()).stack;
}