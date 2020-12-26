(function($){
	 function _registRowEditingHandlerx(jq){
		 var options = $.extend(true, {}, $.fn.treegrid.defaults, jq.treegrid('options'));
	        if(!options.customAttr.rowediting) return;
	        var getEditorButtonsPanelId = function(target){
	            return $(target).attr('id')+'_editor_buttons_panel';
	        };
	        var deltaX = 120;
	        var buildEditorButtonsPanel = function(target){
	            var panelId = getEditorButtonsPanelId(target);
	            if($('#'+panelId).length > 0) return;
	            var panel = $(target).treegrid('getPanel');
	            var treegrid_body = $('>div.datagrid-view>div.datagrid-view2>div.datagrid-body', panel);
	            treegrid_body.css('position', 'relative');
	            var edtBtnPanel = $('<div>', {id: panelId})
                .addClass('dialog-button')
                .appendTo(treegrid_body)
                .css({
                    'position': 'absolute',
                    'display': 'block',
                    'border-bottom': '1px solid #ddd',
                    'border-left': '1px solid #ddd',
                    'border-right': '1px solid #ddd',
                    'left': parseInt(panel.width()/2)-deltaX,
                    'z-index': 2013,
                    'display': 'none',
                    'padding': '4px 5px'
                });
            $('<a href="javascript:void(0)">保存</a>')
                .css('margin-left','0px')
                .linkbutton({iconCls: 'icon-save'})
                .click(function(){
                    var editingRow = $(target).treegrid('getEditingRow');
                    if(!options.customAttr.onConfirmEdit.call(target, editingRow)) return;
                })
                .appendTo(edtBtnPanel);

            $('<a href="javascript:void(0)">取消</a>')
                .css('margin-left', '6px')
                .linkbutton({iconCls: 'icon-cancel'})
                .click(function(){
                    var editingRow = $(target).treegrid('getEditingRow');
                    if(!options.customAttr.onRevokeEdit.call(target, editingRow)) return;
                })
                .appendTo(edtBtnPanel);
        };
        var showEditorButtonsPanel = function(target, index){
            var opts = $.data(target, "treegrid").options;
            var tr = opts.finder.getTr(target, index, "body", 2);
            var position = tr.position();
            var edtBtnPanelId = '#'+getEditorButtonsPanelId(target);
            var state = $.data(target, 'treegrid');
            var treegrid_body = state.dc.body2;
            var fixPosition = function(){
                var trHeight = tr.height(), trWidth = tr.width();
                var top = position.top + treegrid_body.scrollTop(), left = position.left;
                var delta = 11;

                if(trWidth > treegrid_body.width()){
                    left = treegrid_body.width()/2 - deltaX;
                }else{
                    left = trWidth/2 - deltaX;
                }

                if(position.top + (trHeight * 2 + delta) > treegrid_body.height()){
                    top = top - (trHeight + delta);
                }else{
                    top = top + trHeight;
                }

                return {top: top, left: left};
            };
            $(edtBtnPanelId).css(fixPosition()).show();
        };
        var hideEditorButtonsPanel = function(target){
            var edtBtnPanelId = '#'+getEditorButtonsPanelId(target);
            $(edtBtnPanelId).hide();
        };
        jq.each(function(){
            var target = this;
            var opts = $.data(target, "treegrid").options;
            var onLoadSuccessCallBack = opts.onLoadSuccess;
            var onBeforeEditCallBack = opts.onBeforeEdit;
            var onAfterEditCallBack = opts.onAfterEdit;
            var onCancelEditCallBack = opts.onCancelEdit;
            $(this).treegrid({
                onLoadSuccess: function(row, data){
                    buildEditorButtonsPanel(this);
                },
                onBeforeEdit: function(row){
                	buildEditorButtonsPanel(target);
                    showEditorButtonsPanel(target, row[opts.idField]);
                },
                onAfterEdit: function(row,changes){
                    hideEditorButtonsPanel(target);
                },
                onCancelEdit: function(row){
                    hideEditorButtonsPanel(target);
                }
            });

        });
    }
	 $.fn.treegrid.defaults.customAttr={
		 rowediting: false,
		 onConfirmEdit: function(node){return true;},
		 onRevokeEdit: function(node){return true;}
	 }
	 $.extend($.fn.treegrid.methods, {
        followCustomHandle: function(jq){
        	return jq.each(function(){
                var opts = $.extend(true, {}, $.fn.treegrid.defaults, $.data(this, 'treegrid').options);
                if(opts.customAttr.rowediting){
                	_registRowEditingHandlerx(jq);
                }
            });
        },
        getEditingRow: function(jq){
            var treegrid = $.data(jq[0], "treegrid");
            var opts = treegrid.options;
            var data = treegrid.data;
            var editingRow = [];
            opts.finder.getTr(jq[0], "", "allbody").each(function(){
                if($(this).hasClass('datagrid-row-editing')){
                    var nodeid = $(this).attr('node-id');
                    editingRow.push(jq.treegrid('find', nodeid));
                }
            });
            return editingRow.length>0?editingRow[0]:null;
        }  
    });
})(jQuery)