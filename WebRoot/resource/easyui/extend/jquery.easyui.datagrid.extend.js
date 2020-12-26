(function($){
    function _registRowEditingHandler(jq){
    	var options = $.extend(true, {}, $.fn.datagrid.defaults, jq.datagrid('options'));
        if(!options.customAttr.rowediting) return;
        var getEditorButtonsPanelId = function(target){
            return $(target).attr('id')+'_editor_buttons_panel';
        }
        var deltaX = 120;
        var buildEditorButtonsPanel = function(target){
            var panelId = getEditorButtonsPanelId(target);
            if($('#'+panelId).length > 0) return;
            var panel = $(target).datagrid('getPanel');
            var datagrid_body = $('>div.datagrid-view>div.datagrid-view2>div.datagrid-body', panel);
            datagrid_body.css('position', 'relative');
            var edtBtnPanel = $('<div>', {id: panelId})
                .addClass('dialog-button')
                .appendTo(datagrid_body)
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
                    var editIndex = $(target).datagrid('getRowIndex', $(target).datagrid('getEditingRow'));
                    if(!options.customAttr.onConfirmEdit.call(target, editIndex)) return;
                })
                .appendTo(edtBtnPanel);
            $('<a href="javascript:void(0)">取消</a>')
                .css('margin-left', '6px')
                .linkbutton({iconCls: 'icon-cancel'})
                .click(function(){
                    var editIndex = $(target).datagrid('getRowIndex', $(target).datagrid('getEditingRow'));
                    if(!options.customAttr.onRevokeEdit.call(target, editIndex)) return;
                })
                .appendTo(edtBtnPanel);
        }

        var showEditorButtonsPanel = function(target, index){
            var opts = $.data(target, "datagrid").options;
            var tr = opts.finder.getTr(target, index, "body", 2);
            var position = tr.position();

            var edtBtnPanelId = '#'+getEditorButtonsPanelId(target);
            var state = $.data(target, 'datagrid');
            var datagrid_body = state.dc.body2;

            var fixPosition = function(){
                var trHeight = tr.height(), trWidth = tr.width();
                var top = position.top + datagrid_body.scrollTop(), left = position.left;
                var delta = 11;

                if(trWidth > datagrid_body.width()){
                    left = datagrid_body.width()/2 - deltaX;
                }else{
                    left = trWidth/2 - deltaX;
                }

                if(position.top + (trHeight * 2 + delta) > datagrid_body.height()){
                    top = top - (trHeight  + delta)
                }else{
                    top = top + trHeight;
                };

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
            var opts = $.data(target, "datagrid").options;
            var onLoadSuccessCallBack = opts.onLoadSuccess;
            var onBeforeEditCallBack = opts.onBeforeEdit;
            var onAfterEditCallBack = opts.onAfterEdit;
            var onCancelEditCallBack = opts.onCancelEdit;
            $(this).datagrid({
                onLoadSuccess: function(data){
                    buildEditorButtonsPanel(this);
                },
                onBeforeEdit: function(index, data){
                	buildEditorButtonsPanel(target);
                    showEditorButtonsPanel(target, index);
                },
                onAfterEdit: function(index, data){
                    hideEditorButtonsPanel(target);
                },
                onCancelEdit: function(index, data){
                    hideEditorButtonsPanel(target);
                }
            });

        });
    }

    $.fn.datagrid.defaults.customAttr={
        rowediting: false,
        onConfirmEdit: function(rowIndex){return true;},
    	onRevokeEdit: function(rowIndex){return true;}
    }

    $.extend($.fn.datagrid.methods, {
        followCustomHandle: function(jq){
            return jq.each(function(){
                var opts = $.extend(true, {}, $.fn.datagrid.defaults, $.data(this, 'datagrid').options);
                if(opts.customAttr.rowediting){
                    _registRowEditingHandler(jq);
                }
            });
        },
        getEditingRow: function(jq){
            var datagrid = $.data(jq[0], "datagrid");
            var opts = datagrid.options;
            var data = datagrid.data;
            var editingRow = [];
            opts.finder.getTr(jq[0], "", "allbody").each(function(){
                if($(this).hasClass('datagrid-row-editing')){
                    var index = parseInt($(this).attr('datagrid-row-index'));
                    editingRow.push(data.rows[index]);
                }
            });

            return editingRow.length>0?editingRow[0]:null;
        }  
    });

})(jQuery)