/***********************************************
    Function:   Layout Settings
    Author:     Adam Lawrence
    Contact:    adam@adamlawrencedesign.com 
*************************************************/

function LayoutSettings(defaults)
{
	// this.wrap = wrap;
	// this.el = el;
	this.defaults = defaults;
	this.addDefaults();
}

LayoutSettings.prototype.delete = function()
{

};

LayoutSettings.prototype.buildContent = function()
{
	
};

LayoutSettings.prototype.addListener = function()
{
	var _this, node;

	_this = this;
	node = this.defaults;

	$(node.wrapTrigger).on('click', node.trigger, function()
	{
		$('html, body').animate(
		{
			scrollTop: $('header').offset().top
		}, 'slow');
		$(node.wrapSettings).slideDown();
	});

	$(node.wrapSettings).on('click', node.close, function()
	{
		$(node.wrapSettings).slideUp();
	});

	this.delete();

}

LayoutSettings.prototype.addDefaults = function()
{
	if(!this.defaults)
	{
		this.defaults = {
							'wrapTrigger': '#layoutList',
							'trigger': '.linkTo',	
							'wrapSettings': '#wrap-layout-settings',
							'img': '#img-layout-settings',
							'wrapInfo': '#wrap-layout-info',
							'keywordsInput': '#insert-keywords',
							'keywordsDisplay': '#display-keywords',
							'wrapAddWebsites': '#layout-websites-wrap',
							'inputSchoolCom': '#insert-school-com',
							'inputSchoolInd': '#insert-school-ind',
							'inputSportsCom': '#insert-sports-ind',
							'inputSportsInd': '#insert-sports-ind',
							'inputSchoolClient': '#insert-school-cli',
							'close': '#close-layout-bottom, #close-layout-top'
						}	
	};

	this.addListener();

}



// Sroll To 
// Build content
// Slide down 
// add listener 
	// delete on click server query 
	// allow in different portals
