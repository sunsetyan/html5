Type.registerNamespace('MattBerseth.WebControls.AJAX.NiftyCornersControl');

MattBerseth.WebControls.AJAX.NiftyCornersControl.NiftyCornersBehavior = function(element) {
    /// <summary>
    /// The NiftyCornersBehavior rounds the corners of its target element
    /// </summary>
    /// <param name="element" type="Sys.UI.DomElement" domElement="true">
    /// DOM element associated with the behavior
    /// </param>
    MattBerseth.WebControls.AJAX.NiftyCornersControl.NiftyCornersBehavior.initializeBase(this, [element]);
    
    this._radius = null;
    this._parentDiv = null;
    this._originalStyle = null;
    this._blendToColor = null;
    this._blendFromColor = null;
}

MattBerseth.WebControls.AJAX.NiftyCornersControl.NiftyCornersBehavior.prototype = {
    initialize : function() {
        /// <summary>
        /// Initialize the behavior
        /// </summary>
        MattBerseth.WebControls.AJAX.NiftyCornersControl.NiftyCornersBehavior.callBaseMethod(this, 'initialize');
        this._buildParentDiv();
    },
    
    dispose : function() {
        /// <summary>
        /// Dispose the behavior
        /// </summary>
        this._disposeParentDiv();
        MattBerseth.WebControls.AJAX.NiftyCornersControl.NiftyCornersBehavior.callBaseMethod(this, 'dispose');
    },

    _buildParentDiv : function() {
        /// <summary>
        /// Create the surrounding div that will have rounded corners
        /// </summary>
        var e = this.get_element();
        this._disposeParentDiv();
        
        var originalWidth = e.offsetWidth;
        var newParent = e.cloneNode(false);

        // move all children into the new div.
        this._moveChildren(e, newParent);

        // modify the target element to be transparent
        // and set up the new parent
        this._originalStyle = e.style.cssText;
        e.style.backgroundColor = "transparent";
        e.style.padding = "0";
        e.style.overflow = "";
        e.style.className = "";
        if (e.style.height) {
            // Increase the height to account for the rounded corners
            e.style.height = parseInt($common.getCurrentStyle(e, 'height')) + (this._radius * 2) + "px";
        } 
        else {
            // Note: Do NOT use $common.getCurrentStyle in the check below
            // because that breaks the work-around
            if (!e.style.width && (0 < originalWidth)) {
                // The following line works around a problem where IE renders the first
                // rounded DIV about 6 pixels too high if e doesn't have a width or height
                e.style.width = originalWidth + "px";
            }
        }

        // these are properties we don't want cloned down to the new parent
        newParent.style.position = "";
        newParent.style.border   = "";
        newParent.style.margin   = "";
        newParent.style.width    = "100%";
        newParent.id             = "";
        newParent.removeAttribute("control");

        newParent.style.borderTopStyle = "none";
        newParent.style.borderBottomStyle = "none";
        newParent.style.borderLeftStyle = "none";
        newParent.style.borderRightStyle = "none";
        
        //  add the top
        this._addTop(e, this.get_BlendToColor(), this.get_BlendFromColor(), this.get_Radius(), this.get_Radius());
        //  the new newParent
        e.appendChild(newParent);
        this._parentDiv = newParent;
        //  add the bottom
        this._addBottom(e, this.get_BlendToColor(), this.get_BlendFromColor(), this.get_Radius(), this.get_Radius());
    },

    _disposeParentDiv : function() {
        /// <summary>
        /// Dispose the surrounding div with rounded corners
        /// </summary>

        if (this._parentDiv) {
            // clean up the divs we added.
            var e = this.get_element();
            var children = e.childNodes;
            for (var i = children.length - 1; i >=0; i--) {
                var child = children[i];
                if (child) {
                    if (child == this._parentDiv) {
                        this._moveChildren(child, e);
                    }
                    try {
                        e.removeChild(child);
                    } catch(e) {
                        // Safari likes to throw NOT_FOUND_ERR (DOMException 8)
                        // but it seems to work fine anyway.
                    }
                }
            }

            // restore the original style
            if (this._originalStyle) {
                e.style.cssText = this._originalStyle;
                this._originalStyle = null;
            }
            this._parentDiv = null;
        }
    },
    
    _moveChildren : function(src, dest) {
        /// <summary>
        /// Move the child nodes from one element to another
        /// </summary>
        /// <param name="src" type="Sys.UI.DomElement" domElement="true">
        /// DOM Element
        /// </param>
        /// <param name="dest" type="Sys.UI.DomElement" domElement="true">
        /// DOM Element
        /// </param>

        var moveCount = 0;
        while (src.hasChildNodes()) {
            var child = src.childNodes[0];
            child = src.removeChild(child);
            dest.appendChild(child);
            moveCount++;
        }
        return moveCount;
    },
    
    _addTop : function(el, bk, color, sizex, sizey) {
        /// <summary>
        /// Builds the top corners
        /// </summary>
    
        var i, j;
        var d = document.createElement("div");
        d.style.backgroundColor = bk;
        d.className = "rounded";
        var lastarc = 0;
        for (i = 1; i <= sizey; i++) {
            var coverage, arc2, arc3;
            var arc = Math.sqrt(1 - this._sqr(1 - i / sizey)) * sizex;
            var n_bg = sizex - Math.ceil(arc);
            var n_fg = Math.floor(lastarc);
            var n_aa = sizex - n_bg - n_fg;
            var x = this._createDiv();
            var y = d;
            x.style.margin = "0px " + n_bg + "px";
            for (j = 1; j <= n_aa; j++) {
                if (j == 1) {
                    if (j == n_aa) {
                        coverage = (arc + lastarc) * 0.5 - n_fg;
                    } else {
                        arc2 = Math.sqrt(1 - this._sqr(1 - (n_bg + 1) / sizex)) * sizey;
                        coverage = (arc2 - (sizey - i)) * (arc - n_fg - n_aa + 1) * 0.5;
                    }
                } else if (j == n_aa) {
                    arc2 = Math.sqrt(1 - this._sqr((sizex - n_bg - j + 1) / sizex)) * sizey;
                    coverage = 1 - (1 - (arc2 - (sizey - i))) * (1 - (lastarc - n_fg)) * 0.5;
                } else {
                    arc3 = Math.sqrt(1 - this._sqr((sizex - n_bg - j) / sizex)) * sizey;
                    arc2 = Math.sqrt(1 - this._sqr((sizex - n_bg - j + 1) / sizex)) * sizey;
                    coverage = (arc2 + arc3) * 0.5 - (sizey - i);
                }
                x.style.backgroundColor = this._blend(bk, color, coverage);
                y.appendChild(x);
                y = x;
                var x = this._createDiv();
                x.style.margin = "0px 1px";
            }
            x.style.backgroundColor = color;
            y.appendChild(x);
            lastarc = arc;
        }
        el.insertBefore(d, el.firstChild);   
    },
    
    _addBottom : function(el, bk, color, sizex, sizey) {
        /// <summary>
        /// Builds the bottom corners
        /// </summary>
            
        var i, j;
        var d = document.createElement("div");
        d.className = "rounded";
        d.style.backgroundColor = bk;
        var lastarc = 0;
        for (i = 1; i <= sizey; i++) {
            var coverage, arc2, arc3;
            var arc = Math.sqrt(1 - this._sqr(1 - i / sizey)) * sizex;
            var n_bg = sizex - Math.ceil(arc);
            var n_fg = Math.floor(lastarc);
            var n_aa = sizex - n_bg - n_fg;
            var x = this._createDiv();
            var y = d;
            x.style.margin = "0px " + n_bg + "px";
            for (j = 1; j <= n_aa; j++) {
                if (j == 1) {
                    if (j == n_aa) {
                        coverage = (arc + lastarc) * 0.5 - n_fg;
                    } else {
                        arc2 = Math.sqrt(1 - this._sqr(1 - (n_bg + 1) / sizex)) * sizey;
                        coverage = (arc2 - (sizey - i)) * (arc - n_fg - n_aa + 1) * 0.5;
                    }
                } else if (j == n_aa) {
                    arc2 = Math.sqrt(1 - this._sqr((sizex - n_bg - j + 1) / sizex)) * sizey;
                    coverage = 1 - (1 - (arc2 - (sizey - i))) * (1 - (lastarc - n_fg)) * 0.5;
                } else {
                    arc3 = Math.sqrt(1 - this._sqr((sizex - n_bg - j) / sizex)) * sizey;
                    arc2 = Math.sqrt(1 - this._sqr((sizex - n_bg - j + 1) / sizex)) * sizey;
                    coverage = (arc2 + arc3) * 0.5 - (sizey - i);
                }
                x.style.backgroundColor = this._blend(bk, color, coverage);
                y.insertBefore(x, y.firstChild);
                y = x;
                var x = this._createDiv();
                x.style.margin = "0px 1px";
            }
            x.style.backgroundColor = color;
            y.insertBefore(x, y.firstChild);
            lastarc = arc;
        }
        el.appendChild(d);       
    },
    
    _blend : function(a, b, alpha) {
        /// <summary>
        /// Blends the provided colors with the alpha value
        /// </summary>
            
        var ca = Array(parseInt("0x" + a.substring(1, 3)), parseInt("0x" + a.substring(3, 5)), parseInt("0x" + a.substring(5, 7)));
        var cb = Array(parseInt("0x" + b.substring(1, 3)), parseInt("0x" + b.substring(3, 5)), parseInt("0x" + b.substring(5, 7)));
        r = "0" + Math.round(ca[0] + (cb[0] - ca[0]) * alpha).toString(16);
        g = "0" + Math.round(ca[1] + (cb[1] - ca[1]) * alpha).toString(16);
        b = "0" + Math.round(ca[2] + (cb[2] - ca[2]) * alpha).toString(16);
        return "#" + r.substring(r.length - 2) + g.substring(g.length - 2) + b.substring(b.length - 2);
    },    
    
    _sqr : function(x) {
        /// <summary>
        /// Squares the provided value
        /// </summary>    
        return x * x;
    },
    
    _createDiv : function() {
        /// <summary>
        /// Creates a div that is used for corners
        /// </summary>
            
        var div = document.createElement("div");
        
        div.style.height = "1px";
        div.style.fontSize = ".01em"; // workaround for IE wierdness with 1px divs.
        div.style.overflow = "hidden";   
        
        return div;     
    },
    
    get_BlendFromColor : function() {
        return this._blendFromColor;
    },
    set_BlendFromColor : function(value) {
        this._blendFromColor = value;
        
        if(this.get_isInitialized()) {
            this._buildParentDiv();
        }        
    },
    
    get_BlendToColor : function() {
        return this._blendToColor;
    },
    set_BlendToColor : function(value) {
        this._blendToColor = value;
        
        if(this.get_isInitialized()) {
            this._buildParentDiv();
        }        
    },    

    get_Radius : function() {
        return this._radius;
    },
    set_Radius : function(value) {
        this._radius = value;
        
        if(this.get_isInitialized()) {
            this._buildParentDiv();
        }
    }
}
MattBerseth.WebControls.AJAX.NiftyCornersControl.NiftyCornersBehavior.registerClass('MattBerseth.WebControls.AJAX.NiftyCornersControl.NiftyCornersBehavior', AjaxControlToolkit.BehaviorBase);
