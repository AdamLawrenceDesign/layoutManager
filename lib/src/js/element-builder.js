/***********************************************
    Function:   Element Builder
    Author:     Adam Lawrence
    Contact:    adam@adamlawrencedesign.com 
*************************************************/

function ElementBuilder(type, wrap, obj, mGrid, callback)
{
    this.type = type;
    this.wrap = wrap;
    this.obj = obj;
    this.masonaryGrid = mGrid;
    this.callback = callback;
    this.init()
}

ElementBuilder.prototype.addMasonary = function(el)
{
    // The El variable must have a width allocated
    
    var container = document.getElementById(this.wrap);

    $('#' + this.wrap + ' li div img').load(function()
    {
        var masonry = new Masonry(container, 
        {
            columnWidth: el,
            itemSelector: el
        });

    });
};

ElementBuilder.prototype.imageLinks = function()
{
    for(var i = 0; i < this.obj.length; i++)
    {
        var wrap, li, a, img;
        
        wrap = document.getElementById(this.wrap);
        li = document.createElement('li');
        a = document.createElement('a');
        img = document.createElement('img');
            
        $(li).append(a);
        $(a).append(img);
        $(wrap).append(li);

        $(img).attr({'src': this.obj[i].Path, 'alt': this.obj[i].Name });
        $(a).attr({'data-id': this.obj[i].ID, 'data-lookUp' : i});
        
        /*======================= */    // Masonary Needed for list controls 
        
        if(this.masonaryGrid) $(li).addClass('grid');       
    }
        
    /*======================= */    // Apply call back if specified and check to apply masonary
    
    if(this.callback)   this.callback();
    if(this.masonaryGrid) this.addMasonary('.list-grid-25');
};

ElementBuilder.prototype.tabLinks = function()
{
    for(var i = 0; i < this.obj.length; i++)
    {
        var wrap, li, a;
        
        wrap = document.getElementById(this.wrap);
        li = document.createElement('li');
        a = document.createElement('a');
        
        $(li).append(a);
        $(wrap).append(li);
        $(a).html(this.obj[i].name + '<span class="icon-checkmark2 fl_rt txt_sec_m"></span>').attr({'data-id': this.obj[i].id, 'data-lookUp' : i});
    }
};

ElementBuilder.prototype.custom = function()
{
    var builderClass, length;

    builderClass = this;
    length = this.obj.length;

    /*
    $.each(this.obj, function(index, value)
    {    
        var obj = this;

        $.ajax(
        {
            url: 'http://192.168.0.216/AdvAPI/api/WCAPValues/Photocreate/' + this.productID, 
            type: 'GET',
            username: 'WebAPIPhotocreateUser',
            password: '@dvw3b@piu$3r',
            success: function(data)
            {
                var wrap, template, li, a, img;
                wrap = document.getElementById(builderClass.wrap);
                template = $(document.getElementById(builderClass.wrap + 'Template')).clone();
                $(template).attr({'id':'layoutLink' + index, 'data-layoutId' : obj.layoutID });
                $(template).find('img').attr('src', 'https://www.advancedimage.com.au/CreateJS/Layouts/' + obj.layoutID + '.jpg')
                                        .error(function()
                                        { 
                                            $(this).attr('src', 'https://www.advancedimage.com.au/CreateJS/Layouts/placeholder.jpg')
                                        });
                $(template).find('.productName').html(data[0].description);
                $(template).find('a').attr('data-productId', obj.productID)
                $(template).find('.lastEdited').html(obj.lastEditedBy)
                $(wrap).append(template);

                console.log(obj)

                if(length-1 == index)
                {
                    builderClass.addMasonary();
                    builderClass.callback();
                }

            }
        });
    });
    */
};

ElementBuilder.prototype.init = function()
{
    switch(this.type)
    {
        case 'tabLinks':
            this.tabLinks();
            break;
        case 'imageLinks':
            this.imageLinks();
            break;
        case 'custom':
            this.custom();
            break;    
    }
};