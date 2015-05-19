/***********************************************
    Function:   Layout Settings
    Author:     Adam Lawrence
    Contact:    adam@adamlawrencedesign.com 
*************************************************/

function LayoutSettings(defaults)
{
	this.defaults = defaults;
	this.addDefaults();
	this.allowIn();
	this.commit();
	this.keywords();
	this.rank();
}

LayoutSettings.prototype.allowIn = function()
{
	var _this, node;

	_this = this;
	node = this.defaults;
	
	$(node.wrapAddWebsites).on('click', 'a', function()
	{
		if(!!$(this).attr('data-allow'))
		{
			$(this).attr('data-allow','').find('span').addClass('hidden');
		} else 
		{
			$(this).attr('data-allow','true').find('span').removeClass('hidden');
		};
	});
};

LayoutSettings.prototype.rank = function()
{
	var node, value;

	node = this.defaults;

	$(node.rankChange).on('change', function()
	{
        value = this.options[this.selectedIndex].text;
        $(node.rank).html(value);
	});

};

LayoutSettings.prototype.keywords = function()
{
	var node;

	node = this.defaults;

	function displayKeywords()
	{
		var display = $(node.keywordsDisplay);

		display.html($(node.keywordsDisplay).html() + ' ' + $(node.keywordsInput).val());

		if(display.html().charAt(0) == ' ')
		{
			display.html((display.html().substring(1)));
		}
	};

	document.onkeydown = function(event)
	{
		var key = window.event ? window.event.keyCode : event.keyCode;
		switch(key) 
		{	
			case 13:
				displayKeywords();
			break;
		}
	};

	$(node.wrapSettings).on('click', node.keywordsAdd, function()
	{
		displayKeywords();
	});

	$(node.wrapSettings).on('click', node.keywordsClear, function()
	{
		$(node.keywordsDisplay).html('');		
		$(node.keywordsInput).val('');		
	});
};

LayoutSettings.prototype.commit = function()
{
	var _this, node;

	_this = this;
	node = this.defaults;

	$(node.commit).on('click', function()
	{
		var layoutId, layoutUpdate, path, filter, editedBy;

		path = 'http://192.168.0.216/AdvAPI/api/WLValues/' + $(node.layoutId).html();

		if(!$(node.keywordsDisplay).html())
		{
			filter = "_";
		}
		else {
			filter = $(node.keywordsDisplay).html().replace(/ /g,'_');
		};		


		if(!$(node.editedBy).html())
		{
			editedBy = "_";
			console.log(editedBy)
		}
		else {
			editedBy = $(node.editedBy).html().replace(/ /g,'_');
		};


		layoutUpdate = { 
						"productID": parseInt($(node.productId).html()),  
						"allowCommunity": ($(node.allowCommunity).attr('data-allow') === 'true'),
						"allowSchool": ($(node.allowSchool).attr('data-allow') === 'true'),
						"allowSports": ($(node.allowSports).attr('data-allow') === 'true'),
						"allowFamily": ($(node.allowFamily).attr('data-allow') === 'true'),
						"allowClient": ($(node.allowClient).attr('data-allow') === 'true'),
						"allowOther": ($(node.allowOther).attr('data-allow') === 'true'),
						"filter": filter,
						"deleted": false,
						"dateModified": todaysDate,
						"lastEditedBy": editedBy,
						"rank": parseInt($(node.rank).html()),
						"numberOfPages": parseInt($(node.pages).html())			
					};
		
		var serverPush = new ServerRequest(path, 'PUT', layoutUpdate, function()
										{
											$(node.wrapSettings).slideUp('400', function()
											{
												location.reload();	
											});
										});	
		
	});
};

LayoutSettings.prototype.delete = function()
{
	var node, update, path;

	node = this.defaults;
	
	$(node.delete).on('click', function()
	{
		path = 'http://192.168.0.216/AdvAPI/api/WLValues/' + $(node.layoutId).html();

		data = {
				"productID": parseInt($(node.productId).html()),  
				"allowCommunity": ($(node.allowCommunity).attr('data-allow') === 'true'),
				"allowSchool": ($(node.allowSchool).attr('data-allow') === 'true'),
				"allowSports": ($(node.allowSports).attr('data-allow') === 'true'),
				"allowFamily": ($(node.allowFamily).attr('data-allow') === 'true'),
				"allowClient": ($(node.allowClient).attr('data-allow') === 'true'),
				"allowOther": ($(node.allowOther).attr('data-allow') === 'true'),
				"filter": $(node.keywordsDisplay).html().replace(/ /g,'_'),
				"deleted": true,
				"dateModified": todaysDate,
				"lastEditedBy": $(node.editedBy).html().replace(/#/g, ''),
				"rank": parseInt($(node.rank).html()),
				"numberOfPages": parseInt($(node.pages).html())						
				};
		
		var putRequest = new ServerRequest(path, 'PUT', data,  function()
		{
			$(node.wrapSettings).slideUp(400, function()
				{
						location.reload();	
				});
		});
		
	});
};

LayoutSettings.prototype.buildContent = function(element, callback)
{
	var node = this.defaults;

	function checkAvail(data, element)
	{
		if(data)
		{
			$(element).attr('data-allow','true').find('span').removeClass('hidden');
		} else 
		{
			$(element).attr('data-allow','').find('span').addClass('hidden');
		}
	};

	$.each(layouts, function(index, value)
	{
		if($(element).attr('data-layoutid') == this.layoutID)
		{
			checkAvail(this.allowCommunity, node.allowCommunity);
			checkAvail(this.allowSchool, node.allowSchool);
			checkAvail(this.allowSports, node.allowSports);
			checkAvail(this.allowFamily, node.allowFamily);
			checkAvail(this.allowClient, node.allowClient);
			checkAvail(this.allowOther, node.allowOther);

			$(node.img).attr('src', 'https://www.advancedimage.com.au/CreateJS/Layouts/' + this.layoutID + '.jpg')
                                        .error(function()
                                        { 
                                            $(this).attr('src', 'https://www.advancedimage.com.au/CreateJS/Layouts/placeholder.jpg')
                                        });

            $(node.editedBy).html(this.lastEditedBy);    
            $(node.layoutId).html(this.layoutID);    
            $(node.keywordsDisplay).html((this.filter).replace(/_/g, ' '));    
            $(node.rank).html(this.rank);
            $(node.rankChange).val(this.rank);      
		}
	});

	$.each(productInfo, function(index, value)
	{
		if($(element).attr('data-productid') == this.id)
		{
            $(node.description).html(this.description);    
            $(node.itemName).html(this.itemName); 			
            $(node.groupName).html(this.groupName); 			
            $(node.productId).html(this.id); 	
            $(node.pages).html(this.pages);  
		};
	});

	callback();
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

		_this.buildContent(this, function()
		{
			$(node.wrapSettings).slideDown();
		});
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
							'keywordsDisplay': '#info-settings-keywords',
							'keywordsAdd': '#add-keywords',
							'keywordsClear': '#clear-keywords',
							'description': '#info-settings-description',
							'groupName': '#info-settings-groupName',
							'productId': '#info-settings-productId',
							'itemName': '#info-settings-itemName',
							'editedBy': '#info-settings-lastEdit',
							'layoutId': '#info-settings-layoutId',
							'rank': '#info-settings-rank',
							'rankChange': '#change-rank',
							'pages': '#info-settings-pages',
							'wrapAddWebsites': '#wrap-layout-insert',
							'allowCommunity': '#insert-community',
							'allowSchool': '#insert-school',
							'allowSports': '#insert-sports',
							'allowFamily': '#insert-family',
							'allowClient': '#insert-client',
							'allowOther': '#insert-other',
							'commit': '#commit-layout',
							'delete': '#delete-layout',
							'close': '#close-layout-bottom, #close-layout-top'
						}	
	};

	this.addListener();
};
