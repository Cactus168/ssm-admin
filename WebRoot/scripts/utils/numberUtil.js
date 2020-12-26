/**
 * 数值工具类
 */
(function(){
	
	//  判断对象是否是一个数值或数值格式字符串
    this.isNumeric = this.likeNumber = this.likeNumeric = $.coreUtil.isNumeric;

    //  判断对象是否是一个数值
    this.isNumber = $.coreUtil.isNumber;

    //  把一个数字/浮点数舍入为指定精度的数值；该函数定义如下参数：
    //      num:    需要进行舍入计算的数值;
    //      precision:  舍入操作保留的精度(意即保留多少为小数)，默认为 0;
    this.round = function (num, precision) {
        if (!$.coreUtil.isNumeric(num)) { throw "传入的参数 num 必须是一个数值"; }
        precision = $.coreUtil.isNumeric(precision) ? precision : 0;
        var str = new Number(num).toFixed(precision);
        return precision ? parseFloat(str) : parseInt(str);
    };

    //  获取或设置数值对象的精度；该函数定义如下重载：
    //      重载一：function(num)，该重载用于获取数值的精度，该重载定义如下参数：
    //              num:    需要获取精度的数值。
    //          返回值：返回数值 num 的精度(小数位数)。
    //      重载二：function(num, precision)，该重载用于设置数值的精度(即进行数值舍入操作)，该重载定义如下参数：
    //              num:    需要设置精度的数值。
    //              precision: 需要设置的精度。
    //          返回值：返回数值 num 按照指定的精度进行舍入操作后的值；
    //          备注：该重载会调用函数 this.round 进行数值舍入操作。
    this.precision = function (num, precision) {
        if (!$.coreUtil.isNumeric(num)) { throw "传入的参数 num 必须是一个数值"; }
        if ($.coreUtil.isNumeric(precision)) { return this.round(num, precision); } else {
            var str = String(num), i = str.indexOf(".");
            return i == -1 ? 0 : str.length - str.indexOf(".") - 1;
        }
    };

    //  判断传入的数值是否是一个奇数；该函数定义如下参数：
    //      num:    需要判断的数值；
    //  返回值：如果传入的参数 num 是一个奇数，则返回 true，否则返回 false。
    this.isOdd = function (num) {
        return (num % 2) == 1;
    };

    //  判断传入的数值是否是一个偶数；该函数定义如下参数：
    //      num:    需要判断的数值；
    //  返回值：如果传入的参数 num 是一个偶数，则返回 true，否则返回 false。
    this.isEven = function (num) {
        return (num % 2) == 0;
    };


    //  将传入的数值转换成一个描述文件大小的字符串；该函数定义如下参数：
    //      num:    待转换格式的数值，表示文件大小字节数(B)；
    //      str:  待转换的格式，String 类型值，可选的值包括 "auto"、"b"、"kb"、"mb"、"gb"
    this.toFileSize = function (num, str) {
        num = $.coreUtil.isNumeric(num) ? window.parseFloat(num) : 0;
        str = $.stringUtil.trim(String(str)).toLowerCase();
        if (str == "b") { return String(num); }
        if (!$.arrayUtil.contains(["b", "kb", "mb", "gb", "auto"], str)) { str = "auto"; }
        var ret = null, kb = 1024, mb = 1048576, gb = 1073741824;
        if (str == "auto") {
            str = (num >= gb) ? "gb" : (num >= mb ? "mb" : (num >= kb ? "kb" : "b"));
        }
        switch (str) {
            case "b": ret = toB(num); break;
            case "kb": ret = toKB(num); break;
            case "mb": ret = toMB(num); break;
            case "gb": ret = toGB(num); break;
            default: ret = toMB(num); break;
        }
        function toB(size) { return String(this.round(size, 2)) + "B"; };
        function toKB(size) { return String(this.round(size / kb, 2)) + "KB"; };
        function toMB(size) { return String(this.round(size / mb, 2)) + "MB"; };
        function toGB(size) { return String(this.round(size / gb, 2)) + "GB"; };
        return ret;
    };
	
	jQuery.numberUtil = this;
	
	return jQuery;
	
})(jQuery);