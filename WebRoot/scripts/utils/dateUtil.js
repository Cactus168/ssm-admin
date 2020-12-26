/**
 * 日期工具类
 */
(function(){
	
	//  判断指定的对象是否为合法的日期(Date)格式对象；
    this.isDate = function (date) { return $.coreUtil.isDate(date); };

    //  判断指定的对象是否为一个日期(Date)对象或者是一个日期格式的字符串。
    this.likeDate = function (date) { return this.isDate(date) || $.stringUtil.isDate(date); };

    //  将 String 或 Number 类型值转换成 Date 类型值；
    //  返回值：该方法返回一个新创建的 Date 类型值；
    this.toDate = function (obj) {
        return $.coreUtil.isDate(obj) ? obj : ($.coreUtil.isString(obj) ? $.stringUtil.toDate(obj) : new Date(obj));
    };

    //  判断指定的日期字符串是否是合法的长日期格式；
    //  该函数依赖于 $.stringUtil.isLongDate 函数。
    this.isLongDate = function (date) { return $.stringUtil.isLongDate(date); };

    //  判断指定的日期字符串是否是合法的短日期格式；
    //  该函数依赖于 $.stringUtil.isShortDate 函数。
    this.isShortDate = function (date) { return $.stringUtil.isShortDate(date); };

    //  判断指定的日期是否为闰年；该函数定义如下参数：
    //      date: 可以是一个 日期(Date) 对象，也可以是表示日期的字符串，或者是一个表示年份的数字。
    //  返回值：如果指定的日期是闰年，则返回 true，否则返回 false。
    this.isLeapYear = function (date) {
        var y = 0;
        if (this.isDate(date)) {
            y = new Date(date).getYear();
        } else if ($.coreUtil.isNumeric(date)) {
            y = date;
        } else {
            throw "传入的参数 date 的数据类型必须为 Date、String 或者 Number。";
        }
        var b = false;
        if (y >= 0) {
            b = (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0);
        } else {
            b = (y % 4 == 1 && y % 100 != 0) || (y % 400 == 1);
        }
        return b;
    };

    //  创建一个新的 日期(Date) 对象，返回的值与当前 日期对象 的值相同；
    this.clone = function (date) {
        var d = this.toDate(date).getTime();
        return new Date(d);
    };

    //  比较两个日期对象的大小；该函数定义如下参数：
    //      date1: 第 1 个待比较的日期对象；
    //      date2: 第 2 个待比较的日期对象；
    //  返回值：如果 date1 > date2，则返回一个大于 0 的值；
    //      如果 date1 < date2，则返回一个小于 0 的值；
    //      如果 date1 == date2，则返回 0。
    this.compare = function (date1, date2) {
        date1 = this.toDate(date1);
        date2 = this.toDate(date2);
        var d1 = date1.getTime(), d2 = date2.getTime();
        return $.coreUtil.compare(d1, d2);
    };
    this.compareTo = function (date) { return this.compare(this, date); };
    this.equals = function (date) { return this.compare(this, date) == 0; };

    //  获取指定日期对象当前表示的季度（0 - 3）
    this.getQuarter = function (date) {
        date = this.toDate(date);
        var m = date.getMonth();
        var q = 0;
        if (m >= 0 && m < 3) {
            q = 0;
        } else if (m >= 3 && m < 6) {
            q = 1;
        } else if (m >= 6 && m < 9) {
            q = 2;
        } else if (m >= 9 && m < 12) {
            q = 3;
        }
        return q;
    };

    //  获取当前日期对象表示所在周的星期几（0 - 6）
    this.getDayOfWeek = function (date) {
        date = this.toDate(date);
        return date.getDay();
    };

    //  获取当前日期对象所在年的第几周计数。
    this.getWeek = function (date, weekStart) {
        date = this.toDate(date);
        weekStart = (weekStart || 0) - 0;
        if (!$.coreUtil.isNumeric(weekStart) || weekStart > 6) { weekStart = 0; }
        var year = date.getFullYear(),
            firstDay = new Date(year, 0, 1),
            firstWeekDays = 7 - firstDay.getDay() + weekStart,
            dayOfYear = (((new Date(year, date.getMonth(), date.getDate())) - firstDay) / (24 * 3600 * 1000)) + 1;
        return Math.ceil((dayOfYear - firstWeekDays) / 7) + 1;
    };

    //  获取当前日期对象所在月的第几周计数。
    this.getWeekOfMonth = function (date, weekStart) {
        date = this.toDate(date);
        weekStart = (weekStart || 0) - 0;
        if (!$.coreUtil.isNumeric(weekStart) || weekStart > 6) { weekStart = 0; }
        var dayOfWeek = date.getDay(),
            day = date.getDate();
        return Math.ceil((day - dayOfWeek - 1) / 7) + ((dayOfWeek >= weekStart) ? 1 : 0);
    };

    //  给指定日期对象添加指定的毫秒数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      millisec: 要添加的毫秒数，可以是一个负数。
    //  返回值：date 添加指定毫秒数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    this.addTime = function (date, millisec) {
        date = this.toDate(date);
        var d = Date.parse(date);
        if (!$.coreUtil.isNumeric(millisec)) { millisec = Date.parse(millisec); }
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的天数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      days: 要添加的天数，可以是一个负数。
    //  返回值：date 添加指定天数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    this.addDays = function (date, days) {
        date = this.toDate(date);
        var d = Date.parse(date);
        if (!$.coreUtil.isNumeric(days)) { return new Date(d); }
        var millisec = 86400000 * days;
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的小时数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      hours: 要添加的小时数，可以是一个负数。
    //  返回值：date 添加指定小时数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    this.addHours = function (date, hours) {
        date = this.toDate(date);
        var d = Date.parse(date);
        if (!$.coreUtil.isNumeric(hours)) { return new Date(d); }
        var millisec = 3600000 * hours;
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的毫秒数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      millisec: 要添加的毫秒数，可以是一个负数。
    //  返回值：date 添加指定毫秒数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    this.addMilliseconds = function (date, millisec) {
        date = this.toDate(date);
        var d = Date.parse(date);
        if (!$.coreUtil.isNumeric(millisec)) { return new Date(d); }
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的分钟数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      minutes: 要添加的分钟数，可以是一个负数。
    //  返回值：date 添加指定分钟数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    this.addMinutes = function (date, minutes) {
        date = this.toDate(date);
        var d = Date.parse(date);
        if (!$.coreUtil.isNumeric(minutes)) { return new Date(d); }
        var millisec = 60000 * minutes;
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的星期周数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      weeks: 要添加的星期周数，可以是一个负数。
    //  返回值：date 添加指定星期周数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    this.addWeeks = function (date, weeks) {
        date = this.toDate(date);
        var d = Date.parse(date);
        if (!$.coreUtil.isNumeric(weeks)) { return new Date(d); }
        var millisec = 86400000 * 7 * weeks;
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的月数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      months: 要添加的月数，可以是一个负数。
    //  返回值：date 添加指定月数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    this.addMonths = function (date, months) {
        date = this.toDate(date);
        if (!$.coreUtil.isNumeric(months)) { months = 0; }
        return new Date(date.getFullYear(), date.getMonth() + months, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };

    //  给指定日期对象添加指定的秒数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      seconds: 要添加的秒数，可以是一个负数。
    //  返回值：date 添加指定秒数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    this.addSeconds = function (date, seconds) {
        date = this.toDate(date);
        var d = Date.parse(date);
        if (!$.coreUtil.isNumeric(seconds)) { return new Date(d); }
        var millisec = 1000 * seconds;
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的百纳秒数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      ticks: 要添加的百纳秒数，可以是一个负数。
    //  返回值：date 添加指定百纳秒数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    this.addTicks = function (date, ticks) {
        date = this.toDate(date);
        var d = Date.parse(date);
        if (!$.coreUtil.isNumeric(ticks)) { return new Date(d); }
        var millisec = 0.000001 * ticks;
        return new Date(d + millisec);
    };

    //  给指定日期对象添加指定的年数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      years: 要添加的年数，可以是一个负数。
    //  返回值：date 添加指定年数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    this.addYears = function (date, years) {
        date = this.toDate(date);
        if (!$.coreUtil.isNumeric(years)) { years = 0; }
        return new Date(date.getFullYear() + years, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };

    //  给指定日期对象添加指定的季度数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      quarters: 要添加的季度数，可以是一个负数。
    //  返回值：date 添加指定季度数后的新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    this.addQuarters = function (date, quarters) {
        date = this.toDate(date);
        if (!$.coreUtil.isNumeric(quarters)) { quarters = 0; }
        return new Date(date.getFullYear(), date.getMonth() + quarters * 3, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    };

    //  给指定日期对象添加指定日期部分的指定数，并返回一个新的日期对象；该函数定义如下参数：
    //      date: 源日期对象；
    //      datepart: 指定的日期部分，字符串格式，可选的值限定为：
    //          yy 或 yyyy:  表示年；
    //          qq 或 q:     表示季度；
    //          mm 或 m:     表示月；
    //          dd 或 d:     表示日(天)；
    //          wk 或 ww:    表示周；
    //          hh:          表示小时；
    //          mi 或 n:     表示分钟；
    //          ss 或 s:     表示秒；
    //          ms:          表示毫秒；
    //      number: 要添加的指定日期部分的指定数量，可以是一个负数；
    //  返回值：date 添加指定日期部分的指定数后的一个新值；注意，该方法不会修改源日期对象 date，而是返回一个新创建的日期对象。
    this.add = function (date, datepart, number) {
        if (!$.coreUtil.isString(datepart)) { return date; }
        if (!$.coreUtil.isNumeric(number)) { return date; }
        datepart = datepart.toLowerCase();
        var d = null;
        switch (datepart) {
            case "yy":
            case "yyyy":
                d = this.addYears(date, number);
                break;
            case "qq":
            case "q":
                d = this.addQuarters(date, number);
                break;
            case "mm":
            case "m":
                d = this.addMonths(date, number);
                break;
            case "dd":
            case "d":
                d = this.addDays(date, number);
                break;
            case "wk":
            case "ww":
                d = this.addWeeks(date, number);
                break;
            case "hh":
                d = this.addHours(date, number);
                break;
            case "mi":
            case "n":
                d = this.addMinutes(date, number);
                break;
            case "ss":
            case "s":
                d = this.addSeconds(date, number);
                break;
            case "ms":
                d = this.addMilliseconds(date, number);
                break;
            default:
                throw "传入的参数 datepart 为不可识别的值。";
                break;
        }
        return d;
    };

    //  比较两个日期对象指定部分的差，并返回比较结果；该函数定义如下参数：
    //      date: 源日期对象；
    //      datepart: 指定的日期部分，字符串格式，可选的值限定为：
    //          yy 或 yyyy:  表示年；
    //          qq 或 q:     表示季度；
    //          mm 或 m:     表示月；
    //          dd 或 d:     表示日(天)；
    //          wk 或 ww:    表示周；
    //          hh:          表示小时；
    //          mi 或 n:     表示分钟；
    //          ss 或 s:     表示秒；
    //          ms:          表示毫秒；
    //      value: 要比较的日期对象；
    //  返回值：返回 date 日期对象 和 value 日期对象 指定部分的数值的差。
    this.diff = function (date, datepart, value) {
        if (!$.coreUtil.isString(datepart)) { return null; }
        date = this.toDate(date);
        value = this.toDate(value);
        datepart = datepart.toLowerCase();
        var d = null;
        switch (datepart) {
            case "yy":
            case "yyyy":
                d = value.getFullYear() - date.getFullYear();
                break;
            case "qq":
            case "q":
                var quarter = this.getQuarter(value);
                d = quarter + ((value.getFullYear() - date.getFullYear()) * 3) - quarter;
                break;
            case "mm":
            case "m":
                d = (value.getMonth() + 1) + ((value.getFullYear() - date.getFullYear()) * 12) - (date.getMonth() + 1);
                break;
            case "dd":
            case "d":
                d = parseInt((value.getTime() - date.getTime()) / 86400000);
                break;
            case "wk":
            case "ww":
                d = parseInt((value.getTime() - date.getTime()) / (86400000 * 7));
                break;
            case "hh":
                d = parseInt((value.getTime() - date.getTime()) / 3600000);
                break;
            case "mi":
            case "n":
                d = parseInt((value.getTime() - date.getTime()) / 60000);
                break;
            case "ss":
            case "s":
                d = parseInt((value.getTime() - date.getTime()) / 1000);
                break;
            case "ms":
                d = value.getTime() - date.getTime();
                break;
            default:
                throw "传入的参数 datepart 为不可识别的值。";
                break;
        }
        return d;
    };

    //  返回指定日期对象的指定部分的值；该函数定义如下参数：
    //      date: 源日期对象；
    //      datepart: 指定的日期部分，字符串格式，可选的值限定为：
    //          yy 或 yyyy:  表示年；
    //          qq 或 q:     表示季度；
    //          mm 或 m:     表示月；
    //          dd 或 d:     表示日(天)；
    //          wk 或 ww:    表示周；
    //          hh:          表示小时；
    //          mi 或 n:     表示分钟；
    //          ss 或 s:     表示秒；
    //          ms:          表示毫秒；
    //  返回值：返回指定日期对象的指定部分的值；
    this.part = function (date, datepart) {
        if (!$.coreUtil.isString(datepart)) { return null; }
        date = this.toDate(date);
        datepart = datepart.toLowerCase();
        var d = null;
        switch (datepart) {
            case "yy":
            case "yyyy":
                d = date.getFullYear();
                break;
            case "qq":
            case "q":
                d = this.getQuarter(date);
                break;
            case "mm":
            case "m":
                d = date.getMonth();
                break;
            case "dd":
            case "d":
                d = date.getDate();
                break;
            case "wk":
            case "ww":
                d = date.getWeek();
                break;
            case "hh":
                d = date.getHours();
                break;
            case "mi":
            case "n":
                d = date.getMinutes();
                break;
            case "ss":
            case "s":
                d = date.getSeconds();
                break;
            case "ms":
                d = date.getMilliseconds();
                break;
            default:
                throw "传入的参数 datepart 为不可识别的值。";
                break;
        }
        return d;
    };

    //  返回当前日期对象的格式化字符值；该函数定义如下参数：
    //      date:   要进行格式化的日期对象
    //      format: 返回字符串格式定义；如果该参数不传入，则默认值为 "yyyy-MM-dd"
    this.format = function (date, format) {
        date = this.toDate(date);
        format = $.coreUtil.isEmptyObjectOrNull(format) ? "yyyy-MM-dd" : format;
        switch (typeof date) {
            case "string":
                date = new Date(date.replace(/-/, "/"));
                break;
            case "number":
                date = new Date(date);
                break;
        }
        var dict = {
            "yyyy": date.getFullYear(),
            "M": date.getMonth() + 1,
            "d": date.getDate(),
            "H": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds(),
            "MM": ("" + (date.getMonth() + 101)).substr(1),
            "dd": ("" + (date.getDate() + 100)).substr(1),
            "HH": ("" + (date.getHours() + 100)).substr(1),
            "mm": ("" + (date.getMinutes() + 100)).substr(1),
            "ss": ("" + (date.getSeconds() + 100)).substr(1)
        };
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
            return dict[arguments[0]];
        });
    };

    //  获取当前日期时间的长字符串格式，返回的日期时间字符串格式如 “2013年05月16日 星期四 夏季, 下午 15:38:11”
    this.toLongDateTimeString = function (date) {
        date = this.toDate(date);
        var year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            week = date.getDay(),
            quarter = this.getQuarter(date),
            hoursArray = ["午夜", "凌晨", "早上", "上午", "中午", "下午", "傍晚", "晚上"],
            weekArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            //monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            quarterArray = ["春", "夏", "秋", "冬"],
            hourSpan = hoursArray[Math.floor(parseFloat(hours) / 3)],
            weekSpan = weekArray[week],
            //monthSpan = monthArray[month],
            quarterSpan = quarterArray[quarter];
        return $.stringUtil.format(
            "{0}年{1}月{2}日 {3} {4}季, {5} {6}:{7}:{8}",
            year,
            ("" + (month + 101)).substr(1),
            ("" + (day + 100)).substr(1),
            weekSpan,
            quarterSpan,
            hourSpan,
            ("" + (hours + 100)).substr(1),
            ("" + (minutes + 100)).substr(1),
            ("" + (seconds + 100)).substr(1));
    };

    jQuery.dateUtil = this;
    
	return jQuery;
	
})(jQuery);