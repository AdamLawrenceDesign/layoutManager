/***********************************************
    Function:   Element Builder
    Author:     Adam Lawrence
    Contact:    adam@adamlawrencedesign.com 
*************************************************/

function BuildList(defaults, data, callback)
{
    this.defaults = defaults;
    this.data = data;
    this.callback = callback;
    this.init()
}

BuildList.prototype.addMasonry = function()
{
    // The El variable must have a width allocated
    var node = this.defaults;
    var container = document.getElementById(node.wrap);

    $('#' + node.wrap + ' li div img').load(function()
    {
        var masonry = new Masonry(container, 
        {
            columnWidth: node.masonryClass,
            itemSelector: node.masonryClass
        });
    });
};

BuildList.prototype.build = function()
{
    var _this, node;

    node = this.defaults;
    _this = this;

    $.each(this.data, function(index, value)
    {
        var wrap, template, li, a, img, productName;
        
        for(var i = 0; i < productInfo.length; i++ )
        {
            if(productInfo[i].id == this.productID)
            {
                productName = productInfo[i].description;
                wrap = document.getElementById(node.wrap);
                template = $(document.getElementById(node.wrap + 'Template')).clone();

                $(template).attr({'id':'layoutLink' + index, 'data-layoutId' : this.layoutID });
                $(template).find('img').attr('src', 'https://www.advancedimage.com.au/CreateJS/Layouts/' + this.layoutID + '.jpg')
                                        .error(function()
                                        { 
                                            $(this).attr('src', 'https://www.advancedimage.com.au/CreateJS/Layouts/placeholder.jpg')
                                        });
                $(template).find('.productName').html(productName);
                $(template).find('a').attr({'data-productId': this.productID, 'data-layoutId': this.layoutID })
                $(template).find('.lastEdited').html(this.lastEditedBy)
                $(wrap).append(template);   
            }
        };

        // layouts.push('layoutId': this.layoutId, '')

    });

    this.addMasonry();
    this.callback();
};

BuildList.prototype.init = function()
{
    if(!this.defaults)
    {
        this.defaults = {
                            'wrap' : 'layoutList', 
                            'masonryClass' : '.list-grid-25'
                        };
    }

    this.build();
};
