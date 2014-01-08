Type.registerNamespace('MattBerseth.WebControls.AJAX.TabAnimationControl');

MattBerseth.WebControls.AJAX.TabAnimationControl.TabAnimationBehavior = function(element) {
    
    MattBerseth.WebControls.AJAX.TabAnimationControl.TabAnimationBehavior.initializeBase(this, [element]);
    
    for(var i = 0; i < element.childNodes.length; i++) {
        var node = element.childNodes[i];
        if(node.tagName && node.tagName == 'DIV' && Sys.UI.DomElement.containsCssClass(node, 'ajax__tab_body')) {
            // Generic animation behaviors that automatically build animations from JSON descriptions
            this._activeTabChanged = new AjaxControlToolkit.Animation.GenericAnimationBehavior(element.childNodes[i]);
            break;
        }
    }
    
    this._activeTabChangedHandler = null;            
}

MattBerseth.WebControls.AJAX.TabAnimationControl.TabAnimationBehavior.prototype = {    
    initialize : function() {
        MattBerseth.WebControls.AJAX.TabAnimationControl.TabAnimationBehavior.callBaseMethod(this, 'initialize');
        
        if(this._activeTabChanged) {
            // Initialize the generic animation behaviors
            this._activeTabChanged.initialize();

            //  create and attach the onShown handler
            this._activeTabChangedHandler = Function.createDelegate(this, this._onActiveTabChanged);
            $find(this.get_element().id).add_activeTabChanged(this._activeTabChangedHandler);
        }
    },
    
    dispose : function() {
    
        if(this._activeTabChanged) {
            //  detach events
            var tabBehavior = $find(this.get_element().id);
            if(tabBehavior) {
                tabBehavior.remove_activeTabChanged(this._activeTabChangedHandler);
                this._activeTabChangedHandler = null;
            }
        }
        
        MattBerseth.WebControls.AJAX.TabAnimationControl.TabAnimationBehavior.callBaseMethod(this, 'dispose');
    },
    
    _onActiveTabChanged : function(sender, args) {
        //  just in case the old one is still playing
        this._activeTabChanged.quit();
        //  now run it ...
        this._activeTabChanged.play();
    },
    
    get_OnActiveTabChanged : function() {
        return this._activeTabChanged.get_json();
    },
    
    set_OnActiveTabChanged : function(value) {
        this._activeTabChanged.set_json(value);
        this.raisePropertyChanged('OnActiveTabChanged');
    }
}
MattBerseth.WebControls.AJAX.TabAnimationControl.TabAnimationBehavior.registerClass('MattBerseth.WebControls.AJAX.TabAnimationControl.TabAnimationBehavior', AjaxControlToolkit.BehaviorBase);
