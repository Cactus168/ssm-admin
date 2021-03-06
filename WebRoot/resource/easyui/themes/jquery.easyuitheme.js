/**
* easyui换肤
*/
(function ($) {

    //  获取或设置当前页面的 jQuery EasyUI 主题皮肤包；该函数定义如下参数：
    //      isTop: 可选参数；表示是否从当前窗口的顶级页面逐级向下依次设置所有页面包括iframe在内的皮肤包名称；
    //      themeName: 可选参数；表示被设置的皮肤包名称；
    //      callback: 可选参数；表示在设置完皮肤包名称后要执行的回调函数；该回调函数执行时依次定义如下参数：
    //          newTheme: 表示更改后的主题皮肤；
    //          oldTheme: 表示更改前的主题皮肤；
    //          上面两个参数 oldTheme、newTheme 都是一个格式如 { id, name, path } 的 JSON-Object，其可能的值参考 $.easyui.theme.dataSource 。
    //      thisArg: 可选参数；表示 callback 回调函数执行中的 this 引用；
    //  备注：如果该方法未传入任何参数；则获取当前页面的 jQuery EasyUI 主题皮肤名称并返回；
    this.theme = function (isTop, themeName, callback, thisArg) {
        if (arguments.length == 0) { return getTheme($); }
        if (arguments.length == 1 && typeof isTop == "boolean") {
            return isTop ? getTheme($) : getTheme($);
        } else {
            if (isTop === true) {
                return setTopTheme($, themeName, callback, thisArg);
            } else {
                return isTop === false ? setTheme($, themeName, callback, thisArg) : setTheme($, isTop, themeName, callback);
            }
        }
    };

    function getTheme(jq) {
        jq = jq || $;
        var link = jq("link[href$='easyui.css'],link[href*='easyui.css']"), href = link.attr("href"), array = href ? href.split("/") : [];
        return array.length > 1 ? array[array.length - 2] : array[array.length - 1];
    };

    function setTheme(jq, theme, callback, thisArg) {
        var oldTheme = getTheme(jq);
        if (oldTheme == theme) {
            return;
        }
        var link = jq("link[href$='easyui.css'],link[href*='easyui.css']"),
            href = link.attr("href"), array = href ? href.split("/") : [];
        if (arguments.length > 1) {
            array[array.length - 2] = theme;
        } else {
            jq.array.insert(array, 0, theme);
        }
        link.attr("href", array.join("/"));
        callbackFunc(callback, oldTheme, theme, thisArg);
    };

    function setTopTheme(jq, theme, callback, thisArg) {
        var oldTheme = getTheme(jq);
        setTheme(jq, theme);
        jq("iframe,iframe").each(function () {
            try {
                if (jq.util && jq.util.isWindow(this.contentWindow) && jq.util.isObject(this.contentWindow.document)
                    && jq.isFunction(this.contentWindow.$) && this.contentWindow.$.easyui && this.contentWindow.$.easyuiTheme) {
                    setTopTheme(this.contentWindow.$, theme);
                }
            } catch (ex) { };
        });
        callbackFunc(callback, oldTheme, theme, thisArg);
    };

    function callbackFunc(callback, oldTheme, theme, thisArg) {
        if (!$.isFunction(callback)) { return; }
        var item1 = $.arrayUtil.first($.easyuiTheme.themeDataSource, function (val) { return val.path == oldTheme; }),
            item2 = $.arrayUtil.first($.easyuiTheme.themeDataSource, function (val) { return val.path == theme; });
        if (item1) { oldTheme = item1; }
        if (item2) { theme = item2; }
        $.coreUtil.exec(function () {
            callback.call(thisArg, theme, oldTheme);
        });
    };

    this.themeDataSource = [
        { id: 1, name: "默认(天空蓝,推荐)", path: "default" },
        { id: 2, name: "金属黑(推荐)", path: "black" },
        { id: 3, name: "银色(推荐)", path: "bootstrap" },
        { id: 4, name: "灰霾(推荐)", path: "gray" },

        { id: 5, name: "清泉", path: "ui-cupertino", disabled: false },
        { id: 6, name: "黑巢", path: "ui-dark-hive", disabled: false },
        { id: 7, name: "杏黄", path: "ui-pepper-grinder", disabled: false },
        { id: 8, name: "阳光", path: "ui-sunny", disabled: false },

        { id: 9, name: "磁贴（标准）", path: "metro-standard" },
        { id: 10, name: "磁贴（蓝）", path: "metro-blue" },
        { id: 11, name: "磁贴（灰）", path: "metro-gray" },
        { id: 12, name: "磁贴（绿）", path: "metro-green" },
        { id: 13, name: "磁贴（橙）", path: "metro-orange" },
        { id: 14, name: "磁贴（红）", path: "metro-red" }
    ];
    
    jQuery.easyuiTheme = this;
	
	return jQuery;
})(jQuery);





