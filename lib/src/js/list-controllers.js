/***********************************************
    Function:   Event Manager 
    Author:     Adam Lawrence
    Contact:    adam@adamlawrencedesign.com 
*************************************************/

// NEED TO AMEND GLOBAL VARIABLE SHOULD BE ADDED TO THIS FOR EASE OF USE
function ListControllers(type, wrap)
{
	this.type = type;
    this.wrap = wrap;
    this.imagesLoaded = true;
    this.productId = 'All/';
    this.keywords = '';
    this.filter = 'Last Edited/';
    this.editedBy = '';
    this.deleted = 'false/';
    this.init()
}
// THIS BUILD PORTION SHOULD BE SEPARATED FROM THE OTHER PARTS AS IT DOESNT NEED TO BE PART OF THIS OBJECT
ListControllers.prototype.build = function()
{
	var _this = this;
	_this.destroy(function(startBuild)
	{
		_this.serverCall('GET', function(value)
		{
			_this.buildInit(value);
			// console.log(value)
		});	
	});
};

ListControllers.prototype.destroy = function(callback)
{
	var startBuild = true;

	$('#layoutList').empty().css('opacity','0');
	$('.load-item').css('opacity','1');	
	$('#error-message').addClass('hidden');

	setTimeout(function()
	{
		callback(startBuild)
	},1000);	
};
// CUSTOMER SERVER CALL ADDED TO THE PATHWAY IS BUILT USING PARTS OF THE PARENT CLASS
// SHOULD BE MOVED TO A GLOABAL VARIABLE
ListControllers.prototype.serverCall = function(type, callback)
{
	var _this;
	_this = this;

	// POPULATE LIST FROM THE PART VARIABLES 

    $.ajax(
    {
        url: 'http://192.168.0.216/AdvAPI/api/WLValues/' + _this.productId + _this.catergoriesPath + _this.keywords + _this.filter + _this.deleted, 
        // PRODUCTION SERVER url: 'https://www.advancedimage.com.au/AdvAPI/api/WLValues/' + _this.productId + _this.catergoriesPath + _this.keywords + _this.filter + _this.deleted, 
        type: type,
        username: 'WebAPIPhotocreateUser',
        password: '@dvw3b@piu$3r',
        success: function(data)
        {
        	callback(data);
        	// console.log('This is the data from the web layout table: ', data)
        	// console.log('http://192.168.0.216/AdvAPI/api/WLValues/' + _this.productId + _this.catergoriesPath + _this.keywords + _this.filter + _this.deleted);		
        }
    })
        .fail(function(jqXHR, textStatus, err)
        {
            // console.log('Failed to find a match');
            $('.load-item').css('opacity','0');
            $('#error-message').removeClass('hidden');
            _this.keywords = '';
            $('#keywords').val('');
            console.log('error!')
        });;
};	

ListControllers.prototype.buildInit = function(value, callback)
{
	layouts = [];

	for(var i = 0; i < value.length; i++)
	{
		layouts.push({
					'layoutID':value[i].layoutID, 
					'productID': value[i].productID, 
					'lastEditedBy': value[i].lastEditedBy, 
					'allowCommunity': value[i].allowCommunity,
					'allowClient': value[i].allowClient,
					'allowFamily': value[i].allowFamily,
					'allowOther': value[i].allowOther,
					'allowSchool': value[i].allowSchool,
					'allowSports': value[i].allowSports,
					'filter': value[i].filter,
					'rank': value[i].rank
				});
	};

	var listProducts = new BuildList(null, layouts, function()
	{
		setTimeout(function(){
			$('.load-item').css('opacity','0');
			$('#layoutList').css('opacity','1');			
		},400)

	});
};

// CHANGES SORT ORDER
ListControllers.prototype.sortOrder = function()
{
	var _this, type;
	_this = this;

	$('#sort-date').on('click', 'a', function(event)
	{
		$('#sort-date a').removeClass('selected');
		$(this).addClass('selected');

		type = $(this).attr('href');

		switch(type)
		{
			case 'lastEdited':
				_this.filter = 'Last Edited/';
			break;

			case 'rank':
				_this.filter = 'Rank/';
			break;

			case 'oldestToLatest' :
				_this.filter = 'Oldest to Newest/';
			break;
		}

		_this.build();
		event.preventDefault();
	})
};

ListControllers.prototype.catergoriesInit = function()
{
	var _this = this;
	this.catergories = [];

	$('#tab-catergory ul li a').each(function()
	{
		var link, name;

		name = $(this).html().replace('<span class="icon-checkmark2 fl_rt txt_sec_m"></span>','').toLowerCase();

		if($(this).attr('class') == 'selected')
		{
			link = name + '_';
		} else {
			link = '';
		}

		_this.catergories.push({ 
			'name' : name, 
			'suffix' : '_',
			'link' : link,
			'selected' : false
		});
	});

	this.catergoriesUpdate();
};

ListControllers.prototype.catergoriesUpdate = function()
{
	var _this = this;
	this.catergoriesPath = '';
	
	for(var i = 0; i < this.catergories.length; i++)
	{
		this.catergoriesPath = this.catergoriesPath + this.catergories[i].link;
	}

	if(this.catergoriesPath.charAt(0) == '_')
	{
		this.catergoriesPath.substring(1);	
	} 

	if(this.catergoriesPath.charAt(this.catergoriesPath.length -1) == '_')
	{	
		this.catergoriesPath = this.catergoriesPath.substring(0, this.catergoriesPath.length-1)
	};

	this.catergoriesPath = this.catergoriesPath + '/';

	if(this.catergoriesPath == 'all/')
	{
		this.catergoriesPath = 'All/';
	}

	this.build();
};

ListControllers.prototype.catergoryEvent = function()
{
	var _this = this;

	$('#tab-catergory ul').on('click', 'a', function(event)
	{
		var $this, ref;

		$this = $(this);
		ref = $this.html().replace('<span class="icon-checkmark2 fl_rt txt_sec_m"></span>','');

		if($this.attr('id')  == 'allCatergories')
		{
			$('#tab-catergory ul li a').removeClass('selected');
			$(this).addClass('selected');
			_this.catergoriesInit();
			event.preventDefault();
			return;
		} 

		$('#allCatergories').removeClass('selected');
		
		if($this.attr('class') == 'selected')
		{
			$this.removeClass('selected');
			_this.catergoriesInit();
		}
		else 
		{ 
			$this.addClass('selected'); 
			_this.catergoriesInit();
		}
		
		event.preventDefault();
	});
};

ListControllers.prototype.productInit = function()
{
	var _this = this;
	this.products = [];

	$('#tab-products ul li a').each(function()
	{
		var link, id, name;

		id = $(this).attr('data-id');
		name = $(this).html().replace('<span class="icon-checkmark2 fl_rt txt_sec_m"></span>','');

		if($(this).attr('class') == 'selected')
		{
			link = id + '_';
		} else {
			link = '';
		}

		_this.products.push({ 
			'name' : name, 
			'id' : id,
			'suffix' : '_',
			'link' : link,
			'selected' : false
		});
	});
	this.productUpdate();
};

ListControllers.prototype.productUpdate = function(callback)
{
	var _this;

	_this = this;
	this.productId = '';
	
	for(var i = 0; i < this.products.length; i++)
	{
		this.productId = this.productId + this.products[i].link;
	}

	if(this.productId.charAt(0) == '_')
	{
		this.productId.substring(1);	
	} 

	if(this.productId.charAt(this.productId.length -1) == '_')
	{	
		this.productId = this.productId.substring(0, this.productId.length-1)
	};

	
	if(this.productId == 'undefined')
	{
		this.productId = 'All';
	}

	this.productId = this.productId + '/';
	this.build();
};

ListControllers.prototype.productEvent = function()
{
	var _this = this;

	$('#tab-products ul').on('click', 'a', function(event)
	{
		var $this, ref;

		$this = $(this);
		ref = $this.attr('data-id');

		if($this.attr('id')  == 'allProducts')
		{
			$('#tab-products ul li a').removeClass('selected');
			$(this).addClass('selected');
			_this.productInit();
			event.preventDefault();
			return;
		} 

		$('#allProducts').removeClass('selected');
		
		if($this.attr('class') == 'selected')
		{
			$this.removeClass('selected');
			_this.productInit();
		}
		else 
		{ 
			$this.addClass('selected'); 
			_this.productInit();
		}
		
		event.preventDefault();
	});
};

ListControllers.prototype.search = function()
{
	var _this, value;
	_this = this;

	document.onkeydown = function(event)
	{
		var key = window.event ? window.event.keyCode : event.keyCode;
		switch(key) 
		{	
			case 13:
				value = $('#keywords').val();
				_this.keywords = 'keywords/' + value + '/';
				_this.build();
			break;
		}
	}	
};

// SEPERATE THIS ALSO DOESN'T NEED TO BE ADDED TO THIS OBJECT 
// CREATE AN EXPORT PAGE 
ListControllers.prototype.export = function()
{
	var _this, user, addInfo, layoutId, productId; 

	_this = this;

	$('#layoutList').on('click','.load-canvas', function()
	{
		user = window.location.href.slice(window.location.href.search('user=') + 5, window.location.href.length);
		layoutId = $(this).parent().parent().parent().attr('data-layoutId');
		productId = $(this).attr('data-productId');
		addInfo = 'webpage=' + 'layoutBuilder' +  '?%user=' + user + '?%type=' + $(this).attr('data-type') + '?%productId=' + productId + '?%layoutId=' + layoutId;
		var redirectPageNow = new Redirect('canvas', 'index.html', addInfo); // (rootDir, pageRef, addInfo
	});
};

ListControllers.prototype.init = function()
{
	this.catergoriesInit();
    this.sortOrder();
    this.catergoryEvent();
    this.productEvent();
    this.search();
    this.export();
};