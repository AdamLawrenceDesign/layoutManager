/***********************************************
	Function:	Redirect Manager
	Description: For Dynamic links slices path way and adds target
	Author: 	Adam Lawrence
	Contact: 	me@adamlawrence.com.au	
*************************************************/

function Redirect(rootDir, pageRef, addInfo)
{
	this.rootDir = rootDir;
	this.pageRef = pageRef;
	this.addInfo = addInfo;
	this.init();
}

Redirect.prototype.init = function()
{
	window.location = 'http://192.168.0.216' + '/' + this.rootDir + '/' + this.pageRef + '?' + this.addInfo;
};
