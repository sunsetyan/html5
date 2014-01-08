Type.registerNamespace('MattBerseth.WebControls.AJAX.GridViewControl');

MattBerseth.WebControls.AJAX.GridViewControl.GridViewControlBehavior = function(element) {
    MattBerseth.WebControls.AJAX.GridViewControl.GridViewControlBehavior.initializeBase(this, [element]);

    //  Properties
    this._rowHoverCssClass = null;
    this._rowSelectCssClass = null;
    this._columnHoverCssClass = null;
    this._columnSelectCssClass = null;    
    this._cellHoverCssClass = null;    
    this._cellSelectCssClass = null;       
    this._headerCellHoverCssClass = null;    
    this._headerCellSelectCssClass = null;
    
    //  Class names for the datarows
    this._dataRowCssClass = null;
    this._alternateDataRowCssClass = null;
    this._headerRowCssClass = null;

    //  Variables
    this._rows = null;
}

MattBerseth.WebControls.AJAX.GridViewControl.GridViewControlBehavior.prototype = {

    initialize : function() {
        MattBerseth.WebControls.AJAX.GridViewControl.GridViewControlBehavior.callBaseMethod(this, 'initialize');
        // get the elements
        this._rows = this.get_element().getElementsByTagName("tr");
        
        if(this._rows) {
            for(var i = 0; i < this._rows.length; i++) {
                //  get the row
                var row = this._rows[i];
                
                for(var j = 0; j < row.cells.length; j++) {
                    var args = {rowIndex: i, cellIndex: j, behavior: this};
                    var cell = row.cells[j]
                    //  attach to the data cell events
                    if(this._isDataRow(row)) {
                        $addHandler(cell, 'mouseover', Function.createCallback(this._onDataCellOver, args));
                        $addHandler(cell, 'mouseout', Function.createCallback(this._onDataCellOut, args));                    
                        $addHandler(cell, 'click', Function.createCallback(this._onDataCellClick, args));                                        
                    }
                    else if(this._isHeaderRow(row)) {
                        $addHandler(cell, 'mouseover', Function.createCallback(this._onHeaderCellOver, args));
                        $addHandler(cell, 'mouseout', Function.createCallback(this._onHeaderCellOut, args));                   
                    }
                }            
            }
        }
    },

    dispose : function() {
        if(this._rows) {
            // remove our event handlers from all data rows
            for(var i = 0; i < this._rows.length; i++) {
                //  get the row
                var row = this._rows[i];
                for(var j = 0; j < row.cells.length; j++) {
                    //  remove our handler
                    $clearHandlers(row.cells[j]);                
                }            
            }
        }
        
        MattBerseth.WebControls.AJAX.GridViewControl.GridViewControlBehavior.callBaseMethod(this, 'dispose');
    },

    _isHeaderRow : function(tr) {
        var headerRowClass = this.get_HeaderRowCssClass();
        return (headerRowClass && Sys.UI.DomElement.containsCssClass(tr, headerRowClass));
    },

    _isDataRow : function(tr) {
        var dataRowClass = this.get_DataRowCssClass();
        var altDataRowClass = this.get_AlternateDataRowCssClass();
        return (dataRowClass && Sys.UI.DomElement.containsCssClass(tr, dataRowClass)) || (altDataRowClass && Sys.UI.DomElement.containsCssClass(tr, altDataRowClass));
    },
    
    _onDataCellOver : function(e, args) {
        //  add the css class to the row
        var headerCellHoverCssClass = args.behavior.get_HeaderCellHoverCssClass();        
        var rowHoverCssClass = args.behavior.get_RowHoverCssClass();
        var columnHoverCssClass = args.behavior.get_ColumnHoverCssClass();
        var cellHoverCssClass = args.behavior.get_CellHoverCssClass();
        var rows = args.behavior._rows;
        
        //  apply the class to all cells in this row
        if(rowHoverCssClass) {
            for(var i = 0; i < rows[args.rowIndex].cells.length; i++) {
                Sys.UI.DomElement.addCssClass(rows[args.rowIndex].cells[i], rowHoverCssClass);
            }
        }

        //  apply the class to all cells in this column (including the header rows cell)
        if(columnHoverCssClass || headerCellHoverCssClass) {
            for(var i = 0; i < rows.length; i++) {
                if(columnHoverCssClass && args.behavior._isDataRow(rows[i])) {
                    Sys.UI.DomElement.addCssClass(rows[i].cells[args.cellIndex], columnHoverCssClass); 
                }
                else if(headerCellHoverCssClass && args.behavior._isHeaderRow(rows[i])) {
                    Sys.UI.DomElement.addCssClass(rows[i].cells[args.cellIndex], headerCellHoverCssClass); 
                }
            }
        }

        //  apply the class to the cell that raised this event
        if(cellHoverCssClass) {
            Sys.UI.DomElement.addCssClass(rows[args.rowIndex].cells[args.cellIndex], cellHoverCssClass);
        }
    },
    
    _onDataCellOut : function(e, args) {
        //  remove the css class to the row
        var headerCellHoverCssClass = args.behavior.get_HeaderCellHoverCssClass();                
        var rowHoverCssClass = args.behavior.get_RowHoverCssClass();
        var columnHoverCssClass = args.behavior.get_ColumnHoverCssClass();
        var cellHoverCssClass = args.behavior.get_CellHoverCssClass();
        var rows = args.behavior._rows;
        
        //  remove the class to all cells in this row
        if(rowHoverCssClass) {
            for(var i = 0; i < rows[args.rowIndex].cells.length; i++) {
                Sys.UI.DomElement.removeCssClass(rows[args.rowIndex].cells[i], rowHoverCssClass);
            }
        }

        //  remove the class to all cells in this column (including the header rows cell)
        if(columnHoverCssClass || headerCellHoverCssClass) {
            for(var i = 0; i < rows.length; i++) {
                if(columnHoverCssClass && args.behavior._isDataRow(rows[i])) {
                    Sys.UI.DomElement.removeCssClass(rows[i].cells[args.cellIndex], columnHoverCssClass); 
                }
                else if(headerCellHoverCssClass && args.behavior._isHeaderRow(rows[i])) {
                    Sys.UI.DomElement.removeCssClass(rows[i].cells[args.cellIndex], headerCellHoverCssClass); 
                }
            }
        }

        //  remove the class to the cell that raised this event
        if(cellHoverCssClass) {
            Sys.UI.DomElement.removeCssClass(rows[args.rowIndex].cells[args.cellIndex], cellHoverCssClass);
        }
    }, 
    
    _onDataCellClick : function(e, args) {
        //  remove the classes
        var rowSelectCssClass = args.behavior.get_RowSelectCssClass();
        var columnSelectCssClass = args.behavior.get_ColumnSelectCssClass();
        var cellSelectCssClass = args.behavior.get_CellSelectCssClass();
        var headerCellSelectCssClass = args.behavior.get_HeaderCellSelectCssClass();
        var rows = args.behavior._rows;
        
        for(var i = 0; i < args.behavior._rows.length; i++) {
            var row = args.behavior._rows[i];        
            if(args.behavior._isDataRow(row) || args.behavior._isHeaderRow(row)) {
                for(var j = 0; j < row.cells.length; j++) {
                    if(headerCellSelectCssClass) {
                        Sys.UI.DomElement.removeCssClass(row.cells[j], headerCellSelectCssClass);
                    }
                    if(rowSelectCssClass) {
                        Sys.UI.DomElement.removeCssClass(row.cells[j], rowSelectCssClass);
                    }
                    if(cellSelectCssClass) {
                        Sys.UI.DomElement.removeCssClass(row.cells[j], cellSelectCssClass);
                    }
                    if(columnSelectCssClass) {                    
                        Sys.UI.DomElement.removeCssClass(row.cells[j], columnSelectCssClass);                    
                    }
                }
            }
        }            
        
        if(rowSelectCssClass) {
            for(var i = 0; i < rows[args.rowIndex].cells.length; i++) {
                Sys.UI.DomElement.addCssClass(rows[args.rowIndex].cells[i], rowSelectCssClass);
            }
        }

        if(columnSelectCssClass || headerCellSelectCssClass) {
            for(var i = 0; i < rows.length; i++) {
                if(columnSelectCssClass && args.behavior._isDataRow(rows[i])) {
                    Sys.UI.DomElement.addCssClass(rows[i].cells[args.cellIndex], columnSelectCssClass);
                }
                if(headerCellSelectCssClass && args.behavior._isHeaderRow(rows[i])) {
                    Sys.UI.DomElement.addCssClass(rows[i].cells[args.cellIndex], headerCellSelectCssClass);
                }                
            }
        }
        
        if(cellSelectCssClass) {
            Sys.UI.DomElement.addCssClass(rows[args.rowIndex].cells[args.cellIndex], cellSelectCssClass);
        }        
    }, 
    
    _onHeaderCellOver : function(e, args) {
        //  add the css class to the row
        var headerCellHoverCssClass = args.behavior.get_HeaderCellHoverCssClass();        
        var columnHoverCssClass = args.behavior.get_ColumnHoverCssClass();
        var rows = args.behavior._rows;
        
        //  apply the class to all cells in this column (including the header rows cell)
        if(columnHoverCssClass || headerCellHoverCssClass) {
            for(var i = 0; i < rows.length; i++) {
                if(columnHoverCssClass && args.behavior._isDataRow(rows[i])) {
                    Sys.UI.DomElement.addCssClass(rows[i].cells[args.cellIndex], columnHoverCssClass); 
                }
                else if(headerCellHoverCssClass && args.behavior._isHeaderRow(rows[i])) {
                    Sys.UI.DomElement.addCssClass(rows[i].cells[args.cellIndex], headerCellHoverCssClass); 
                }
            }
        }
    },
    
    _onHeaderCellOut : function(e, args) {
        //  remove the css class to the row
        var headerCellHoverCssClass = args.behavior.get_HeaderCellHoverCssClass();        
        var columnHoverCssClass = args.behavior.get_ColumnHoverCssClass();
        var rows = args.behavior._rows;
        
        //  apply the class to all cells in this column (including the header rows cell)
        if(columnHoverCssClass || headerCellHoverCssClass) {
            for(var i = 0; i < rows.length; i++) {
                if(columnHoverCssClass && args.behavior._isDataRow(rows[i])) {
                    Sys.UI.DomElement.removeCssClass(rows[i].cells[args.cellIndex], columnHoverCssClass); 
                }
                else if(headerCellHoverCssClass && args.behavior._isHeaderRow(rows[i])) {
                    Sys.UI.DomElement.removeCssClass(rows[i].cells[args.cellIndex], headerCellHoverCssClass); 
                }
            }
        }
    },                

    get_HeaderCellHoverCssClass : function() {
        return this._headerCellHoverCssClass;
    },

    set_HeaderCellHoverCssClass : function(value) {
        this._headerCellHoverCssClass = value;
    },
    
    get_CellHoverCssClass : function() {
        return this._cellHoverCssClass;
    },

    set_CellHoverCssClass : function(value) {
        this._cellHoverCssClass = value;
    },

    get_ColumnHoverCssClass : function() {
        return this._columnHoverCssClass;
    },

    set_ColumnHoverCssClass : function(value) {
        this._columnHoverCssClass = value;
    },

    get_RowHoverCssClass : function() {
        return this._rowHoverCssClass;
    },

    set_RowHoverCssClass : function(value) {
        this._rowHoverCssClass = value;
    },

    get_HeaderCellSelectCssClass : function() {
        return this._headerCellSelectCssClass;
    },

    set_HeaderCellSelectCssClass : function(value) {
        this._headerCellSelectCssClass = value;
    },
    
    get_RowSelectCssClass : function() {
        return this._rowSelectCssClass;
    },

    set_RowSelectCssClass : function(value) {
        this._rowSelectCssClass = value;
    },    

    get_ColumnSelectCssClass : function() {
        return this._columnSelectCssClass;
    },

    set_ColumnSelectCssClass : function(value) {
        this._columnSelectCssClass = value;
    },    
    
    get_CellSelectCssClass : function() {
        return this._cellSelectCssClass;
    },

    set_CellSelectCssClass : function(value) {
        this._cellSelectCssClass = value;
    },    

    get_HeaderRowCssClass : function() {
        return this._headerRowCssClass;
    },

    set_HeaderRowCssClass : function(value) {
        this._headerRowCssClass = value;
    },
    
    get_DataRowCssClass : function() {
        return this._dataRowCssClass;
    },

    set_DataRowCssClass : function(value) {
        this._dataRowCssClass = value;
    },
    
    get_AlternateDataRowCssClass : function() {
        return this._alternateDataRowCssClass;
    },

    set_AlternateDataRowCssClass : function(value) {
        this._alternateDataRowCssClass = value;
    }
}

MattBerseth.WebControls.AJAX.GridViewControl.GridViewControlBehavior.registerClass('MattBerseth.WebControls.AJAX.GridViewControl.GridViewControlBehavior', AjaxControlToolkit.BehaviorBase);