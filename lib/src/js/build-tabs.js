/***********************************************
    Function:   Element Builder
    Author:     Adam Lawrence
    Contact:    adam@adamlawrencedesign.com 
*************************************************/

function BuildTabs(defaults, data, callback)
{
    this.defaults = defaults;
    this.data = data;
    this.callback = callback;
    this.init()
}

BuildTabs.prototype.tabLinks = function()
{
    var node = this.defaults;

    for(var i = 0; i < this.data.length; i++)
    {
        var wrap, li, a;
        
        wrap = document.getElementById(node.wrap);
        li = document.createElement('li');
        a = document.createElement('a');
        
        $(li).append(a);
        $(wrap).append(li);
        $(a).html(this.data[i].description + '<span class="icon-checkmark2 fl_rt txt_sec_m"></span>')
                    .attr({'data-id': this.data[i].id, 'data-lookUp' : i});
    }
};

BuildTabs.prototype.init = function()
{
    if(!this.defaults)
    {
        this.defaults = {
                            'wrap': 'productList'
                        };
    }
    this.tabLinks();
};
