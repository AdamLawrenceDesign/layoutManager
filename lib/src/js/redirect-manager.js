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
	var currentURL, newURL, endURL, path;

	currentURL = window.location.href;
	endURL = currentURL.search(this.rootDir) + this.rootDir.length;
	path = currentURL.substr(currentURL, endURL) + '/' + this.pageRef + '?' + this.addInfo;

	window.location = path;
	// console.log('Page Redirects Successfully, to pathway ' + path);
};
