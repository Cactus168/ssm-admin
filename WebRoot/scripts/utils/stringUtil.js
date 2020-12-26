/**
 * 字符串工具类
 */
(function(){
	
	//  判断传入的对象是否是一个字符串。
    this.isString = $.coreUtil.isString;

    //  判断传入的字符串是否为Null或者为空字符串。
    this.isNullOrEmpty = function (str) { return str === undefined || str === null || str === ""; };

    //  判断传入的字符串是否为Null或者为空字符串或者全是空格。
    this.isNullOrWhiteSpace = function (str) { return this.isNullOrEmpty(str) || this.trim(String(str)) === ""; };

    //  判断传入的字符串是否为 HTML 代码段。
    this.isHtmlText = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return str.length >= 3 && str.charAt(0) === "<" && str.charAt(str.length - 1) === ">";
    };

    //  用新字符串替换与给定字符串匹配的所有子串；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
    this.replaceAll = function (str, substr, replacement, ignoreCase) {
        if (!substr || substr == replacement) { return str; }
        str = this.isNullOrEmpty(str) ? "" : String(str);
        var length = str.length, i = 0;
        while (str.indexOf(substr) > -1 && i++ < length) { str = str.replace(substr, replacement); }
        return str;
    };

    //  格式化字符串，类似于 .NET 中的 string.format 函数功能
    //  使用方法：this.format('字符串{0}字符串{1}字符串','第一个变量','第二个变量','第三个变量', ...'第 N 个变量');
    //  该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
    this.format = function (str, arg1, arg2, arg3, argn) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        var isArray = $.coreUtil.likeArray(arg1),
            data = (isArray && !$.coreUtil.isString(arg1)) || $.coreUtil.isObject(arg1) ? arg1 : $.arrayUtil.range(arguments, 1);
        if (isArray) {
            for (var i = 0; i < data.length; i++) {
                value = data[i] ? data[i] : "";
                str = str.replace(new RegExp("\\{" + i + "}", "gm"), value);
            }
        } else {
            for (var key in data) {
                var value = proxy.call(data, key);
                value = (value == null || value == undefined) ? "" : value;
                str = str.replace(new RegExp("\\{" + key + "}", "gm"), value);
            }
        }
        function proxy(key) { try { return eval("this[\"" + key + "\"]"); } catch (ex) { return ""; } }
        return str;
    };

    //  获取字符串包含非 ASCII 码字符(例如中文、日文、俄文等)的 byte 字节长度。
    this.getByteLen = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        var bytelen = 0, i = 0, length = str.length, cc = document.charset;
        if (!cc) { cc = "utf-8"; }
        cc = cc.toLowerCase();
        var s = cc == "iso-8859-1" ? 5 : 2;
        for (; i < length; i++) {
            bytelen += str.charCodeAt(i) > 255 ? s : 1;
        }
        return bytelen;
    };

    //  判断当前字符串对象是否包含指定的字符串内容。
    this.contains = function (str, val) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return String(str).indexOf(val) > -1;
    };

    //  字符串反转；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
    this.reverse = function (str) {
        var charArray = [];
        str = this.isNullOrEmpty(str) ? "" : String(str);
        for (var i = str.length - 1; i > -1; i--) { charArray.push(str[i]); }
        return charArray.join("");
    };

    //  去除字符串左边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
    this.ltrim = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return str.replace(/(^\s*)/g, "");
    };

    //  去除字符串右边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
    this.rtrim = function () {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return str.replace(/(\s*$)/g, "");
    };

    //  去除字符串左右两边的空格；该方法将返回源字符串处理后的一个副本，而不会改变源字符串的值。
    this.trim = this.trim ? this.trim : $.coreUtil.trim;

    //  返回一个新字符串，该字符串通过在此实例中的字符左侧填充空格或指定字符来来达到指定的总长度，从而使这些字符右对齐。
    this.padLeft = function (str, len, paddingChar) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        paddingChar = this.isNullOrEmpty(paddingChar) || !paddingChar.length ? " " : paddingChar;
        len = $.coreUtil.isNumeric(len) ? len : str.length;
        if (str.length < len) { for (; str.length < len; str = paddingChar + str) { } }
        return str;
    };

    //  返回一个新字符串，该字符串通过在此字符串中的字符右侧填充空格或指定字符来达到指定的总长度，从而使这些字符左对齐
    this.padRight = function (str, len, paddingChar) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        paddingChar = this.isNullOrEmpty(paddingChar) || !paddingChar.length ? " " : paddingChar;
        len = $.coreUtil.isNumeric(len) ? len : str.length;
        if (str.length < len) { for (; str.length < len; str += paddingChar) { } }
        return str;
    };

    //  返回字符串中的的字符，注意从 0 开始。
    this.mid = function (str, start, len) {
        if (!start) { start = 0; }
        if (!len) { len = 0; }
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return str.substr(start, len);
    };

    //  计算字符串的打印长度。
    this.lengthOfPrint = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return str.replace(/[^\x00-\xff]/g, "**").length;
    };

    //  判断当前 String 对象是否以指定的字符串开头。
    this.startsWith = function (str, val) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return str.substr(0, val.length) == val;
    };

    //  判断当前 String 对象是否以指定的字符串结尾。
    this.endsWith = function (str, val) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return str.substr(str.length - val.length) == val;
    };

    //  截取当前字符串左边的指定长度内容。
    this.left = function (str, len) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        if (!$.coreUtil.isNumeric(len)) { len = parseInt(len, 10); }
        if (len < 0 || len > str.length) { len = str.length; }
        return str.substr(0, len);
    };

    //  截取当前字符串右边的指定长度内容。
    this.right = function (str, len) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        if (!$.coreUtil.isNumeric(len)) { len = parseInt(len, 10); }
        if (len < 0 || len > str.length) { len = str.length; }
        return str.substring(str.length - len, str.length);
    };

    //  截取当前字符串左边的指定字节长度内容。
    this.leftBytes = function (str, len) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        if (!$.coreUtil.isNumeric(len)) { len = parseInt(len, 10); }
        var length = this.getByteLen(str), i = 0, bytelen = 0, cc = document.charset;
        if (!cc) { cc = "utf-8"; }
        cc = cc.toLowerCase();
        var s = cc == "iso-8859-1" ? 5 : 2;
        if (len < 0 || len > length) { len = length; }
        for (; i < str.length; i++) {
            bytelen += str.charCodeAt(i) > 255 ? s : 1;
            if (bytelen == len) { break; }
            if (bytelen > len) { i--; break; }
        }
        return this.left(str, i + 1);
    };

    //  截取当前字符串右边的指定字节长度内容。
    this.rightBytes = function (str, len) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        if (!$.coreUtil.isNumeric(len)) { len = parseInt(len, 10); }
        var length = this.getByteLen(str), i = 0, bytelen = 0, cc = document.charset;
        if (!cc) { cc = "utf-8"; }
        cc = cc.toLowerCase();
        var s = cc == "iso-8859-1" ? 5 : 2;
        if (len < 0 || len > length) { len = length; }
        for (; i < str.length; i++) {
            bytelen += str.charCodeAt(str.length - 1 - i) > 255 ? s : 1;
            if (bytelen == len) { break; }
            if (bytelen > len) { i--; break; }
        }
        return this.right(str, i + 1);
    };

    //  判断当前 String 对象是否是正确的长日期格式。
    this.isLongDate = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        var r = str.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        if (r == null) { return false; }
        var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
    };

    //  判断当前 String 对象是否是正确的段日期格式。
    this.isShortDate = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        var r = str.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null) { return false; }
        var d = new Date(r[1], r[3] - 1, r[4]);
        return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
    };

    //  判断当前 String 对象是否是正确的日期格式。
    this.isDate = function (str) {
        return this.isLongDate(str) || this.isShortDate(str);
    };

    //  判断当前 String 对象是否是正确的电话号码格式(中国)。
    this.isTel = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(str);
    };

    //  判断当前 String 对象是否是正确的手机号码格式(中国)。
    this.isMobile = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^(13|14|15|17|18)\d{9}$/i.test(str);
    };

    //  判断当前 String 对象是否是正确的电话号码或者手机号码格式(中国)
    this.isTelOrMobile = function (str) {
        return this.isTel(str) || this.isMobile(str);
    };

    //  判断当前 String 对象是否是正确的传真号码格式
    this.isFax = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(str);
    };

    //  判断当前 String 对象是否是正确的 电子邮箱地址(Email) 格式。
    this.isEmail = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(str);
    };

    //  判断当前 String 对象是否是正确的 邮政编码(中国) 格式。
    this.isZipCode = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^[\d]{6}$/.test(str);
    };

    //  判断当前 String 对象是否是否存在汉字字符。
    this.existChinese = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        //[\u4E00-\u9FA5]為漢字﹐[\uFE30-\uFFA0]為全角符號
        return !/^[\x00-\xff]*$/.test(str);
    };

    //  验证中文
    this.isChinese = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^[\u0391-\uFFE5]+$/i.test(str);
    };

    //  验证英文
    this.isEnglish = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^[A-Za-z]+$/i.test(str);
    };

    //  判断当前 String 对象是否是正确的 文件名称(路径) 格式。
    this.isFileName = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        //return !/[\\\/\*\?\|:"<>]/g.test(str);
        return !/[\\\/\*\?\|:<>]/g.test(str);
    };

    //  判断当前 String 对象是否是正确的 IPv4 地址格式。
    this.isIPv4 = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
        if (reSpaceCheck.test(str)) {
            str.match(reSpaceCheck);
            if (RegExp.$1 <= 255 && RegExp.$1 >= 0
                    && RegExp.$2 <= 255 && RegExp.$2 >= 0
                    && RegExp.$3 <= 255 && RegExp.$3 >= 0
                    && RegExp.$4 <= 255 && RegExp.$4 >= 0) {
                return true;
            } else { return false; }
        } else { return false; }
    };

    //  判断当前 String 对象是否是正确的 url 格式。
    this.isUrl = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        var strRegex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
        var re = new RegExp(strRegex);
        return re.test(str);
    };

    //  判断是否为合法的 ipv4 或者 url 格式
    this.isUrlOrIPv4 = function (str) {
        return this.isUrl(str) || this.isIP(str);
    };

    //  判断是否为合法的货币格式
    this.isCurrency = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^\d{0,}(\.\d+)?$/i.test(str);
    };

    //  判断是否为合法的 QQ 号码格式
    this.isQQ = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^[1-9]\d{4,11}$/i.test(str);
    };

    //  判断是否为合法的 MSN 帐号格式
    this.isMSN = function (str) {
        return this.isEmail(str);
    };

    //  验证是否包含空格和非法字符Z
    this.isUnNormal = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /.+/i.test(str);
    };

    //  验证是否为合法的车牌号码
    this.isCarNo = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(str);
    };

    //  验证是否为合法的汽车发动机序列号
    this.isCarEngineNo = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^[a-zA-Z0-9]{16}$/.test(str);
    };

    //  验证是否可以作为合法的用户名字符(字母开头，允许6-16字节，允许字母数字下划线)
    this.isUserName = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(str);
    };

    //  判断当前 String 对象是否是正确的 身份证号码(中国) 格式。
    this.isIDCard = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        var iSum = 0,
            sId = str,
            aCity = {
                11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
                21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
                33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
                41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西",
                46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南",
                54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
                65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
            };
        if (!/^\d{17}(\d|x)$/i.test(sId)) {
            return false;
        }
        sId = sId.replace(/x$/i, "a");
        //非法地区
        if (aCity[parseInt(sId.substr(0, 2), 10)] == null) {
            return false;
        }
        var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2)),
            d = new Date(sBirthday.replace(/-/g, "/"));
        //非法生日
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
            return false;
        }
        for (var i = 17; i >= 0; i--) {
            iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
        }
        if (iSum % 11 != 1) {
            return false;
        }
        return true;
    };

    //  验证是否为整数格式
    this.isInteger = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return /^[+]?[1-9]+\d*$/i.test(str);
    };

    //  判断当前 String 对象是否是正确的 数字 格式。
    this.isNumeric = function (str, flag) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        //验证是否是数字
        if (isNaN(str)) { return false; }
        if (arguments.length == 0) { return false; }
        switch (flag) {
            case "":
                return true;
            case "+":        //正数
                return /(^\+?|^\d?)\d*\.?\d+$/.test(str);
            case "-":        //负数
                return /^-\d*\.?\d+$/.test(str);
            case "i":        //整数
                return /(^-?|^\+?|\d)\d+$/.test(str);
            case "+i":        //正整数
                return /(^\d+$)|(^\+?\d+$)/.test(str);
            case "-i":        //负整数
                return /^[-]\d+$/.test(str);
            case "f":        //浮点数
                return /(^-?|^\+?|^\d?)\d*\.\d+$/.test(str);
            case "+f":        //正浮点数
                return /(^\+?|^\d?)\d*\.\d+$/.test(str);
            case "-f":        //负浮点数
                return /^[-]\d*\.\d$/.test(str);
            default:        //缺省
                return true;
        }
    };

    //  判断当前 String 对象是否是正确的 颜色(#FFFFFF形式) 格式。
    this.isColor = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        if (str == "") { return true; };
        if (str.length != 7) { return false; };
        return (str.search(/\#[a-fA-F0-9]{6}/) != -1);
    };

    //  判断当前 String 对象是否可以作为安全密码字符(由字符和数字组成，至少 6 位).
    this.isSafePassword = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(str));
    };

    //  转换成全角
    this.toCase = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        var tmp = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255) { tmp += String.fromCharCode(str.charCodeAt(i) + 65248); }
            else { tmp += String.fromCharCode(str.charCodeAt(i)); }
        }
        return tmp;
    };

    //  对字符串进行Html编码。
    this.toHtmlEncode = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        var temp = str;
        temp = temp.replace(/&/g, "&amp;");
        temp = temp.replace(/</g, "&lt;");
        temp = temp.replace(/>/g, "&gt;");
        temp = temp.replace(/\'/g, "&apos;");
        temp = temp.replace(/\"/g, "&quot;");
        temp = temp.replace(/\n/g, "<br />");
        temp = temp.replace(/\ /g, "&nbsp;");
        temp = temp.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
        return temp;
    };

    //  转换成日期。
    this.toDate = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        try { return new Date(str.replace(/-/g, "\/")); }
        catch (e) { return null; }
    };

    //  将字符串对象转换成 布尔(boolean) 值
    this.toBoolean = function (str) {
        if (typeof str == "boolean") { return str; }
        str = this.isNullOrEmpty(str) ? "" : String(str).toLowerCase();
        str = this.trim(str);
        return str == "true" || str == "yes" || str == "y" || str == "t" || str == "1";
    };

    //  将字符串对象转换成 整数(int) 值
    this.toInteger = function (str) { return parseInt(str); };

    //  将字符串对象转换成 数值(Number)。
    this.toNumber = function (str) { return this.toFloat(str); };

    //  将字符串对象转换成 浮点数(float) 值
    this.toFloat = function (str) { return parseFloat(str); };

    //  将字符串对象转换成 数值
    this.toNumeric = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        str = this.trim(str);
        return str.indexOf(".") > -1 ? this.toFloat(str) : this.toInteger(str);
    };

    //  将字符串对象转换成 对象(Object) 值
    this.toObject = function (data) {
        return eval("(" + $.trim(data + "") + ")");
    };

    this.toJSONString = function (str) {
        str = this.isNullOrEmpty(str) ? "" : String(str);
        str = this.trim(str);
        return str.charAt(0) === "<" && str.charAt(str.length - 1) === ">" && str.length >= 3 ? $(str).text() : str;
    };

    //  将字符串对象转换成 函数(function) 值
    this.toFunction = function (str) {
        if ($.coreUtil.isFunction(str)) { return str; }
        str = this.isNullOrEmpty(str) ? "" : String(str);
        str = this.trim(str);
        if (!str.startsWith("function")) { str = "function(){" + str + "}"; }
        str = "{ \"func\": " + str + " }";
        return this.toObject(str).func;
    };
    
	jQuery.stringUtil = this;
	
	return jQuery;
	
})(jQuery);