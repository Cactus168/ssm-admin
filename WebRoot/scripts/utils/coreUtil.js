/**
 * 系统辅助工具类
 * 
 * @author ZhaoBinHu
 */
(function(){
	
    //  获取指定对象的类型。
    this.type = $.type;

    //  测试对象是否是窗口（有可能是Frame）。
    this.isWindow = $.isWindow;

    //  测试对象是否是布尔（Boolean）类型值。
    this.isBoolean = function (obj) { return this.type(obj) == "boolean"; };

    //  测试对象是否是字符串（String）类型值。
    this.isString = function (obj) { return this.type(obj) == "string"; };

    //  测试对象是否是日期（Date）类型值。
    this.isDate = function (obj) { return this.type(obj) == "date"; };

    //  测试对象是否是正则表达式（RegExp）。
    this.isRegExp = function (obj) { return this.type(obj) == "regexp"; };

    //  测试传入的参数是否是一个 javscript 对象；
    this.isObject = function (obj) { return this.type(obj) == "object"; };

    //  测试对象是否是数组（Array）。
    this.isArray = $.isArray;

    //  测试对象是否是函数。
    //  注意：在IE浏览器里，浏览器提供的函数比如'alert'还有 DOM 元素的方法比如 'getAttribute' 将不认为是函数。
    this.isFunction = $.isFunction;

    //  测试对象是否是数值或数值格式的字符串。
    //  方法检查它的参数是否代表一个数值。如果是这样，它返回 true。否则，它返回false。该参数可以是任何类型的。
    this.isNumeric = this.likeNumber = this.likeNumeric = $.isNumeric;

    //  判断对象是否是数值类型；
    this.isNumber = function (obj) { return this.type(obj) == "number"; };

    //  测试对象是否是空对象（不包含任何属性）。
    //  这个方法既检测对象本身的属性，也检测从原型继承的属性（因此没有使用hasOwnProperty）。
    this.isEmptyObject = $.isEmptyObject;

    //  测试对象是否为空（不包含任何属性的空对象、null、undefined、空字符串、全空格）。
    //  这个方法既检测对象本身的属性，也检测从原型继承的属性（因此没有使用hasOwnProperty）。
    this.isEmptyObjectOrNull = function (obj) {
        switch (this.type(obj)) {
            case "string":
                return $.stringUtil.isNullOrWhiteSpace(obj);
            case "array":
                return obj.length == 0;
            case "date":
                return Date.parse(obj) == 0;
            case "object":
                return this.isEmptyObject(obj);
        }
        return obj == null || obj == undefined;
    };

    //  测试对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）。
    this.isPlainObject = $.isPlainObject;

    //  判断对象是否为 "未定义" 值(即 undefined)。
    this.isUndefined = function (obj) { return obj === undefined || typeof obj === "undefined"; };

    //  判断对象是否为空(Null)值。
    this.isNull = function (obj) { return obj === null; };

    //  判断对象是否为 "未定义" 值(即 undefined)或空(Null)值。
    this.isNullOrUndefined = function (obj) { return this.isUndefined(obj) || this.isNull(obj); };

    //  测试对象不为 "未定义" 值(即 undefined)、空(Null)值、Boolean-False值、空字符串值或数字0中的任何一种。
    this.isPositive = function (obj) { return obj ? true : false; };

    //  判断对象是否为 "未定义" 值(即 undefined)、空(Null)值、Boolean-False值、空字符串值或数字0中的一种。
    this.isNegative = function (obj) { return obj ? false : true; };

    //  测试对象是否是 jQuery 对象。
    this.isJqueryObject = function (obj) { return obj != null && obj != undefined && ((obj.jquery ? true : false) || obj.constructor === $$.constructor); };

    //  判断对象是否是一个空的 jQuery 对象(不包含任何 DOM 元素，即 length = 0)。
    this.isEmptyJquery = this.isEmptyJqueryObject = function (obj) { return this.isJqueryObject(obj) && !obj.length; };

    //  定义一个空函数
    this.noop = this.isFunction($.noop) ? $.noop : function () { };

    //  判断传入的字符串是否为Null或者为空字符串或者全是空格。
    this.trim = $.trim;

    //  将一个 DOM 对象或者表达式解析为 jQuery 对象；
    //  如果该对象本身就已经是一个 jQuery 对象，则直接将其返回。
    this.parseJqueryObject = this.parseJquery = function (obj) { return this.isJqueryObject(obj) ? obj : $(obj); };

    //  检测一个对象是否为一个数组对象或者类似于数组对（具有数组的访问方式：具有 length 属性、且具有属性名为数字的索引访问器）
    //  注意：此方法传入 字符串 时执行，也会返回 true，因为 字符串 是一个字符数组。
    this.likeArray = function (obj) {
        if (obj == null || obj == undefined || this.isWindow(obj)) {
            return false;
        }
        if (obj.nodeType === 1 && obj.length) {
            return true;
        }
        var type = this.type(obj);
        return type === "array" || type !== "function" && this.isNumeric(obj.length) && obj.length >= 0;
    };

    //  检测一个对象是否为一个数组对象或者类似于数组对（具有数组的访问方式：具有 length 属性、且具有属性名为数字的索引访问器）且不是字符串
    this.likeArrayNotString = function (obj) {
        return this.likeArray(obj) && !this.isString(obj);
    };

    //  获取当前页面 url 参数。
    //  返回值：该方法返回一个数组，数组中的每个元素都是一个 JSON 对象，该 JSON 对象包含如下属性：
    //      name:   表示 url 参数的名称；
    //      value:  表示 url 参数的值；
    //  也可以通过数组访问器快速访问某个特定名称的参数值，方法如：this.getRequest()["id"]。
    this.getRequest = function () {
        var search = location.search;
        if (search.substr(0, 1) == "?") { search = search.substr(1, search.length - 1); }
        var result = [];
        if (search.length > 0) {
            var params = search.split("&");
            for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var pos = param.indexOf("=");
                var name = param.substring(0, pos);
                var value = param.substr(pos + 1);
                result.push({ name: name, value: value });
                result[name] = value;
            }
        }
        return result;
    };

    //  生成一个 Guid(全球唯一标识符) 值；该函数定义如下参数：
    //      format: String 类型值，一个单格式说明符，它指示如何格式化此 Guid 的值。‎format 参数可以是：
    //          "N":    返回值的格式 32 位(xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)
    //          "D":    返回值的格式 由连字符分隔的 32 位数字(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
    //          "B":    返回值的格式 括在大括号中、由连字符分隔的 32 位数字({xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx})
    //          "P":    返回值的格式 括在圆括号中、由连字符分隔的 32 位数字((xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx))
    //          如果 format 为 null 或空字符串 ("")，则使用 "D"。
    //      length: Number 类型值，表示返回字符串的长度；如果不定义该参数，则全部返回。
    this.guid = function (format, length) {
        format = this.isString(format) ? format.toLowerCase() : "d";
        length = (length == null || length == undefined || !this.isNumeric(length)) ? 32 : length;
        if (length > 32 || length == 0) { length = 32; }
        if (length < -32) { length = -32; }
        var ret = "";
        for (var i = 1; i <= 32; i++) {
            ret += Math.floor(Math.random() * 16.0).toString(16);
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) { ret += "-"; }
        }
        switch (format) {
            case "n": ret = $.stringUtil.replaceAll(ret, "-", ""); break;
            case "b": ret = "{" + ret + "}"; break;
            case "p": ret = "(" + ret + ")"; break;
            case "d": default: break;
        }
        return length >= 0 ? $.stringUtil.left(ret, length) : $.stringUtil.right(ret, Math.abs(length));
    };

    //  获取当前应用程序的完整主机地址部分，返回的结果格式如( http://127.0.0.1 )
    this.getHostPath = function () {
        var href = location.href;
        var pathname = location.pathname;
        return href.substr(0, href.lastIndexOf(pathname));
    };

    //  返回当前页面不带参数的完整路径。
    this.currentUri = this.hostPath + location.pathname;

    //  返回当前页面所在目录的完整路径。
    this.currentPath = this.currentUri.substr(0, this.currentUri.lastIndexOf("/"));

    //  表示当前应用程序所嵌套的虚拟目录的层数。默认为 0，表示未嵌套虚拟目录。
    this.rootDegree = 0;

    //  返回当前应用程序（含站点名或者虚拟目录路径）的完整根路径。
    //  该方法依赖于全局参数 this.rootDegree 的值。
    //  this.rootDegree 该全局参数表示 虚拟目录 的层数。
    //  this.rootDegree 参数设置正确，该方法方能返回正确的结果。
    //  this.rootDegree 默认值为 0，即应用程序没有设置虚拟目录。
    this.getRootPath = function () {
        var result = this.hostPath;
        var pathname = location.pathname;
        if (pathname.indexOf("/") > -1) {
            var paths = pathname.split("/");
            var temps = new Array();
            for (var i = 0; i < paths.length; i++) { if (paths[i].length > 0) { temps.push(paths[i]); } }
            for (var i = 0; i < this.rootDegree && i < temps.length; i++) { result += "/" + temps[i]; }
        }
        return result;
    };

    //  根据传入的 uri 地址返回该 uri 相对于应用程序的完整客户端访问url地址。
    //  传入的 uri 地址应为相对于应用程序根路径的完整地址。
    //  该方法依赖于当前文件的 this.rootPath 属性。
    this.resolveClientUrl = this.resolveUrl = function (url) {
        url = String(url);
        if ($.stringUtil.isNullOrEmpty(url)) { return url; }
        if ($.stringUtil.isUrl(url)) { return url; }
        url = $.stringUtil.replaceAll(url, "\\", "/");
        while (url.substring(0, 2) == "./" || url.substring(0, 1) == "/") { url = url.substring(1, url.length); }
        var tmps1 = this.rootPath.split("/");
        var tmps2 = url.split("/");
        while (tmps1.length > 3 && tmps2.length > 1 && tmps2[0] == "..") { tmps1.pop(); tmps2.shift(); }
        while (tmps2.length > 1 && tmps2[0] == "..") { tmps2.shift(); }
        return tmps1.join("/") + "/" + tmps2.join("/");
    };

    //  在不弹出关闭提示确认的情况下直接关闭当前浏览器窗口。
    this.closeWindowNoConfirm = function () {
        this.top.opener = null;
        this.top.open('', '_self', '');
        this.top.close();
    };

    //  关闭当前浏览器窗口，同 window.close。
    this.closeWindow = window.close;

    //  屏蔽当前页面的 HTML 源代码。
    //  有 bug，不建议使用。
    this.shieldSourceCode = function () {
        var source = document.body.innerHTML;  //获取文档的原有内容
        document.open();                 //打开文档
        document.close();                //关闭文档
        document.body.innerHTML = source;  //重新写入旧内容
    };

    //  屏蔽当前页面的鼠标右键默认事件，而调用指定的回调函数。
    //  如果回调函数为空，则点击鼠标右键没有任何反应。
    this.shieldContxtMenuEvent = function (callback) {
        document.oncontextmenu = function (e) {
            e.preventDefault();
            if (callback && this.type(callback) == "function") { callback.apply(this, arguments); }
        };
    };


    function _loadJs(url, callback) {
        var heads = document.getElementsByTagName("head");
        var scripts = heads[0].getElementsByTagName("script");
        var isFunc = this.isFunction(callback);
        for (var i = 0; i < scripts.length; i++) {
            var s = scripts[i];
            if (s.src == url) { if (isFunc) { callback.call(s); } return; }
        }
        var done = false;
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.language = "javascript";
        script.src = url;
        script.onload = script.onreadystatechange = function () {
            if (!done && (!script.readyState || script.readyState == "loaded" || script.readyState == "complete")) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if (isFunc) { callback.call(script); }
            }
        };
        heads[0].appendChild(script);
    }
    function _loadCss(url, callback) {
        var link = document.createElement('link');
        link.rel = "stylesheet";
        link.type = "text/css";
        link.media = "screen";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
        var isFunc = this.isFunction(callback);
        if (isFunc) { callback.call(link); }
    }

    //  动态引入一个或多个 javascript 脚本文件至当前页面文档，并在引入成功后调用指定的回调函数。
    //  参数 url 表示需要载入的 javascript 脚本路径；如果需要一次性载入多个脚本，则 url 可以是一个数组，数组中每个元素表示 javascript 脚本路径。
    this.loadJs = function (url, callback) {
        if (this.likeArray(url) && !this.isString(url)) {
            for (var i = 0; i < url.length; i++) {
                var fn = (i == url.length - 1) ? callback : null;
                _loadJs(url[i], fn);
            }
        } else { _loadJs(url, callback); }
    };

    //  一次性执行某个 javascript 脚本文件，并在执行成功后调用指定的回调函数。
    this.runJs = function (url, callback) {
        var isFunc = this.isFunction(callback);
        var url = url+"?random="+Math.random();
        _loadJs(url, function () {
            document.getElementsByTagName("head")[0].removeChild(this);
            if (isFunc) { callback(); }
        });
    };

    //  动态引入一个或多个 css 样式表文件至当前页面文档，并在引入成功后调用指定的回调函数。
    this.loadCss = function (url, callback) {
        if (this.likeArray(url) && !this.isString(url)) {
            for (var i = 0; i < url.length; i++) {
                var fn = (i == url.length - 1) ? callback : null;
                _loadCss(url, fn);
            }
        } else {
            _loadCss(url, callback);
        }
    };

    //  对某个对象及其所有可见属性进行多次嵌套递归循环调用某个方法；该函数定义如下参数：
    //      obj:    目标对象
    //      call:   要被针对目标对象循环调用的方法
    //      times:  嵌套的层数
    this.eachCall = function (obj, call, times) {
        if (!this.isFunction(call)) { return; }
        if (obj == undefined) { obj = new Object(); }
        if (times == undefined || times < 0) { times = 1; }
        if (times == 0) { return obj; }
        call.call(this, obj);
        for (var i = 1; i <= times; i++) { for (var key in obj) { this.eachCall.call(this, obj[key], call, times - 1); } }
    };

    //  阻止向对象添加新属性。
    //  模拟 Object.preventExtensions 方法；
    this.preventExtensions = function (obj, times) {
        this.eachCall.call(this, obj, Object.preventExtensions, times);
    };
    //  阻止修改现有属性的特性，并阻止添加新属性。
    //  模拟 Object.seal 方法；
    this.seal = function (obj, times) {
        this.eachCall.call(this, obj, Object.seal, times);
    };
    //  阻止修改现有属性的特性和值，并阻止添加新属性。
    //  模拟 Object.freeze 方法；
    this.freeze = function (obj, times) {
        this.eachCall.call(this, obj, Object.freeze, times);
    };

    //  在指定的毫秒数后调用函数或计算表达式；该函数定义如下参数：
    //      code:       必需。要调用的函数后要执行的 JavaScript 代码串。
    //      millisec:   可选。在执行代码前需等待的毫秒数。
    //  模拟 setTimeout/setImmediate 方法。
    //  备注：如果不传入参数 millisec 或该参数值为 0，则自动调用 setImmediate(该方法相对于 setTimeout 可以有效降低浏览器资源开销) 方法；
    this.exec = function (code, millisec) {
        if (!code) { return; }
        return !millisec && window.setImmediate ? window.setImmediate(code) : window.setTimeout(code, millisec);
    };


    //  以 try...catch... 方式执行指定的函数代码块；该函数提供如下重载方式：
    //      function (options):该重载中，参数 options 表示一个 JSON-Object.
    //          格式如 { code: function|string , error: function|string , final: function|string , tryError: boolean , tryFinal: boolean }
    //          其中 code 表示将被 try 块执行的函数代码块.
    //               error 表示在 code 执行出错时将执行的代码块.
    //               final 表示在 code 和 error 执行完成后将执行的代码块.
    //               tryError 指定 error 是否同样以 try...catch... 方式执行.
    //               tryFinal 指定 final 是否同样以 try...catch... 方式执行.
    //      function (code, error, final): 该重载将会被自动转换成 function ({ code: code, error: error, final: finall, tryError: false, tryFinal: false }) 方式执行；
    //  返回值：如果 code 代码块执行成功，则返回该代码块的执行返回值；
    //      否则判断 error 和 final 代码块是否具有返回值；
    //          如果这两个代码块都有返回值，则取 final 的执行结果返回；
    //          如果 error 和 final 两个代码块只有其中一个具有返回值，则返回那个具有返回值的代码块的执行结果。
    this.tryExec = function (code, error, final) {
        var defaults = {
            code: null, error: null, final: null, tryError: false, tryFinal: false
        };
        var opts = $.extend(defaults, typeof code == "object" ? code : { code: code, error: error, final: final }), ret;
        if (typeof opts.code == "string") { opts.code = $.stringUtil.toFunction(opts.code); }
        if (typeof opts.error == "string") { opts.error = $.stringUtil.toFunction(opts.error); }
        if (typeof opts.final == "string") { opts.final = $.stringUtil.toFunction(opts.final); }
        try {
            if (this.isFunction(opts.code)) {
                ret = opts.code();
            }
        } catch (e) {
            if (this.isFunction(opts.error)) {
                var a = opts.tryError ? this.tryExec(opts.error) : opts.error(e);
                if (a != undefined) { ret = a; }
            }
        } finally {
            if (this.isFunction(opts.final)) {
                var b = opts.tryFinal ? this.tryExec(opts.final) : opts.final();
                if (b != undefined) { ret = b; }
            }
        }
        return ret;
    };
    
    var _matched, _browser;
    var _userAgentMatch = function (userAgent) {
        userAgent = userAgent.toLowerCase();
        var match = /(chrome)[ \/]([\w.]+)/.exec(userAgent) ||
		    /(webkit)[ \/]([\w.]+)/.exec(userAgent) ||
		    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(userAgent) ||
		    /(msie) ([\w.]+)/.exec(userAgent) ||
		    userAgent.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(userAgent) || [];
        return { browser: match[1] || "", version: match[2] || "0" };
    };
    _matched = _userAgentMatch(window.navigator.userAgent);
    _browser = {};
    if (_matched.browser) { _browser[_matched.browser] = true; _browser.version = _matched.version; }
    if (_browser.chrome) { _browser.webkit = true; } else if (_browser.webkit) { _browser.safari = true; }

    //  获取浏览器的名称以及版本号。
    //  判断浏览器版本示例：判断浏览器是否为IE：  this.browser.msie == true，判断浏览器是否为 Chrome：window.browser.chrome == true
    //  判断浏览器版本号：this.browser.version，IE下可能的值为 6.0/7.0/8.0/9.0/10.0 等等。
    this.browser = _browser;




    //  定义默认的对象比较函数，该函数返回一个 bool 值表示传入的两个对象是否等值。
    this.equalsCompare = function (item1, item2) { return item1 == item2; };

    //  定义默认的数值比较函数，该函数返回一个 int 值，该返回值的意义如下：
    //      如果大于 0，则表示 a > b；
    //      如果小于 0，则表示 a < b；
    //      如果等于 0，则表示 a == b。
    this.numericCompare = function (a, b) {
        if (!this.isNumeric(a) && $.stringUtil.isNumeric(a)) { a = parseFloat(a, 10); }
        if (!this.isNumeric(b) && $.stringUtil.isNumeric(b)) { b = parseFloat(b, 10); }
        if (a > b) { return 1; } else if (a < b) { return -1; } else { return 0; }
    };

    //  确认两个 javascript 对象是否等值，该函数定义如下参数:
    //      item1: 待比较的对象1；
    //      item2: 待比较的对象2，用于和对象1进行比较；
    //      compare: 用于比较运算的函数，该函数用于比较 item1 是否与 item2 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //  返回值：如果 item1 与 item2 等值，则返回 true，否则返回 false。
    this.equals = function (item1, item2, compare) {
        var isFunc = this.isFunction(compare);
        if (!isFunc) { compare = this.equalsCompare; }
        return compare.call(this, item1, item2) == true;
    };

    //  比较两个 javascript 对象的大小，该函数定义如下参数：
    //      item1: 待比较的对象1；
    //      item2: 待比较的对象2，用于和对象1进行比较；
    //      compare: 比较函数，该函数被循环调用，用于比较 array 中没两项的大小；这是一个可选参数；
    //          该函数的签名为 function (a, b) { }，参数 a、b 分别表示源数组中的待比较大小的项；该函数必须返回一个数值表示比较后的结果；
    //              如果 a > b ，则返回一个 大于 0 的值；
    //              如果 a < b ，则返回一个 小于 0 的值；
    //              如果 a == b，则返回 0；
    //          如果不定义该参数，则默认将 array 中的每一项当作数字来进行比较。
    //  返回值：如果 item1 > item2 ，则返回一个 大于 0 的值；
    //          如果 item1 < item2 ，则返回一个 小于 0 的值；
    //          如果 item1 == item2，则返回 0；
    this.compare = function (item1, item2, compare) {
        var isFunc = this.isFunction(compare);
        if (!isFunc) { compare = this.numericCompare; }
        return compare.call(this, item1, item2);
    };



    //  过滤 JSON 对象指定名称列表的属性，并返回该 JSON 对象的一个新副本；该函数定义如下参数：
    //      obj: 待操作的 JSON 对象；
    //      propertieNames:需要从 obj 中排除或提取的属性名称，为一个数组对象，数组中的每一项都是一个 String 类型值；
    //      excluding: Boolean 类型值；默认为 false；
    //          如果为 true 则表示从 obj 中提取列表所示的属性值；
    //          如果为 false 则表示从 obj 中排除列表所示的属性值；
    //  返回值：返回一个 JSON 对象，该对象为传入的 obj 提取或排除指定列表所示属性值后的一个新 JSON-Object 副本。
    this.filterProperties = function (obj, propertieNames, excluding) {
        propertieNames = this.likeArrayNotString(propertieNames) ? propertieNames : [];
        var ret = {};
        for (var k in obj) {
            if (excluding ? $.arrayUtil.contains(propertieNames, k) : !$.arrayUtil.contains(propertieNames, k)) { ret[k] = obj[k]; }
        }
        return ret;
    };

    //  排除 JSON 对象指定名称列表的属性，并返回该 JSON 对象的一个新副本；该函数定义如下参数：
    //      obj: 待操作的 JSON 对象；
    //      propertieNames:需要从 obj 中排除的属性名称，为一个数组对象，数组中的每一项都是一个 String 类型值；
    //  返回值：返回一个 JSON 对象，该对象包含 obj 中除 propertieNames 列表外的所有属性。
    this.excludeProperties = function (obj, propertieNames) {
        return this.filterProperties(obj, propertieNames, false);
    };

    //  提取 JSON 对象指定名称列表的属性，并返回该 JSON 对象的一个新副本；该函数定义如下参数：
    //      obj: 待操作的 JSON 对象；
    //      propertieNames:需要从 obj 中提取的属性名称，为一个数组对象，数组中的每一项都是一个 String 类型值；
    //  返回值：返回一个 JSON 对象，该对象包含 obj 中 propertieNames 列表制定的所有属性。
    this.extractProperties = function (obj, propertieNames) {
        return this.filterProperties(obj, propertieNames, true);
    };
	
	jQuery.coreUtil = this;
	
	return jQuery;
	
})(jQuery);