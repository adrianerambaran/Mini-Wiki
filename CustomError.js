/*
-This extends Javascripts generic Error class. 
-Give a custom error code for error handling.
*/
module.exports = function customError(mes, code)
{
	this.Error = mes || 'Error';
	this.code = code;
	this.stack = (new Error()).stack;
}
