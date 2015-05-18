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

ElementBuilder.prototype.custom = function()
{
    var builderClass, length;

    builderClass = this;
    length = this.obj.length;

    $.each(this.obj, function(index, value)
    {
        var wrap, template, li, a, img, productName;
        
        for(var i = 0; i < productInfo.length; i++ )
        {
            if(productInfo[i].id == this.productID)
            {
                productName = productInfo[i].description;
                console.log('Show the product name: ', productName)
                wrap = document.getElementById(builderClass.wrap);
                template = $(document.getElementById(builderClass.wrap + 'Template')).clone();

                $(template).attr({'id':'layoutLink' + index, 'data-layoutId' : this.layoutID });
                $(template).find('img').attr('src', 'https://www.advancedimage.com.au/CreateJS/Layouts/' + this.layoutID + '.jpg')
                                        .error(function()
                                        { 
                                            $(this).attr('src', 'https://www.advancedimage.com.au/CreateJS/Layouts/placeholder.jpg')
                                        });
                $(template).find('.productName').html(productName);
                $(template).find('a').attr('data-productId', this.productID)
                $(template).find('.lastEdited').html(this.lastEditedBy)
                $(wrap).append(template);   
            }
        };
    });

    builderClass.addMasonary();
    builderClass.callback();
};

ElementBuilder.prototype.init = function()
{
    switch(this.type)
    {
        case 'imageLinks':
            this.imageLinks();
            break;
        case 'custom':
            this.custom();
            break;    
    }
};
