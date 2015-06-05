/***********************************************
    Function:   Loading
    Author:     Adam Lawrence
    Contact:    adam@adamlawrencedesign.com 
*************************************************/

function PageLoader(defaults)
{
	this.defaults = defaults;
	this.defaultInit();
}

PageLoader.prototype.finishedLoading = function()
{
	var el = this.defaults;

	$(el.header).css({
						'margin-top': '0',
					});
	
	setTimeout(function()
	{
		$(el.loader).fadeOut(400);
	},800);
	
};

PageLoader.prototype.loading = function()
{
	var el = this.defaults;

	$(el.loader).css('display','block');
	$(el.header).css({
						'margin-top': '-4em',
						'-webkit-transition': 'all 1000ms linear',
						'-webkit-transition': 'all 1000ms linear',
						'-moz-transition': 'all 1000ms linear',
						'-o-transition': 'all 1000ms linear',
						'transition': 'all 1000ms linear',
						'z-index':'102',
						'position':'relative',
					})	// .addClass('linear');
};

PageLoader.prototype.defaultInit = function()
{
	if(!this.defaults)
	{
		this.defaults = {
							loader: '#loading-fullPage',
							header: 'header'
		};
	}

	this.loading();

};
