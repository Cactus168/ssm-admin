/**
 * 数组工具类
 */
(function(){
	
	this.core_array = [];
	
	this.core_push = core_array.push;
	
	this.core_slice = core_array.slice;
	
	this.core_splice = core_array.splice;
	
	//  判断对象是否是一个数组
    this.isArray = $.coreUtil.isArray;

    //  检测一个对象是否为一个数组对象或者类似于数组对象，同 $.coreUtil.likeArray
    this.likeArray = $.coreUtil.likeArray;

    //  同 $.coreUtil.likeArrayNotString
    this.likeArrayNotString = $.coreUtil.likeArrayNotString;

    //  判断传入的 数组 是否为 Null 或者为空数组。
    this.isNullOrEmpty = function (array) { return !this.likeArray(array) || !array.length; };


    //  将另一数组中的所有项复制到当前指定数组中，该函数定义如下参数：
    //      target: 目标数组，源数组 source 中的所有项将被赋值到该数组中；
    //      source: 源数据数组，该数组内的所有项将被赋值到目标数组 target 中；
    //  注意：该方法会改变目标数组 target 中的元素数量。
    //  返回值：源数组数据复制过来后的目标数组 target。
    this.copy = this.copyFrom = function (target, source) {
        target = this.likeArray(target) ? target : [];
        source = this.likeArray(source) ? source : [];
        var l = source.length, i = 0;
        if ($.coreUtil.isNumeric(l)) {
            while (i < l) { core_push.call(target, source[i++]); };
        } else {
            while (source[i] !== undefined) { core_push.call(target, source[i++]); }
        }
        return target;
    };

    //  将当前指定数组中的所有项复制到另一数组中；该函数定义如下参数：
    //      source: 源数据数组，该数组内的所有项将被赋值到目标数组 target 中；
    //      target: 目标数组，源数组 source 中的所有项将被赋值到该数组中；
    //  注意：该方法会改变目标数组 target 中的元素数量。
    //  返回值：源数组数据复制过来后的目标数组 target。
    this.copyTo = function (source, target) {
        return this.copy(target, source);
    };

    //  创建一个和当前数组对象相同的数组并返回
    this.clone = function (source) { return this.copy([], source); };
    //  确认数组中是否包含指定的元素。该函数定义如下参数：
    //      array: 被检测的数组；
    //      item: 被检测的元素，判断该元素是否存在于数组 array 中；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    this.contains = function (array, item, compare) {
        return this.some(array, function (val) { return $.coreUtil.equals(val, item, compare); });
    };
    //  颠倒数组中元素的顺序。
    //  返回值：返回传入的参数 array 本身；如果传入的参数 array 不是一个数组，则返回一个新创建的空数组对象。
    //  注意：该方法会改变原来的数组，而不会创建新的数组。
    this.reverse = function (array) {
        array = this.likeArray(array) ? array : [];
        if (this.isArray(array)) { array.reverse(); return array; }
        var len = array.length, l = len / 2, j;
        for (var i = 0; i < l; i++) {
            j = len - i - 1;
            var a = array[i];
            var b = array[j];
            array[i] = b;
            array[j] = a;
        }
        return array;
    };

    //  在数组中搜索指定的项，并返回整个数组中第一个匹配项的从零开始的索引，该函数定义如下参数：
    //      array: 源数据数组；
    //      item:  要搜索的项；
    //      startIndex: 从零开始的搜索的起始索引，空列表中 0（零）为有效值；该参数可选；如果该参数未定义则从 0 开始；
    //      count: 要搜索的部分中的元素数；该参数可选，如果该参数未定义则搜索至数组的末尾；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //  返回值：如果在数组中从 startIndex 开始并包含 count 个元素的元素范围内找到 item 的第一个匹配项，则为该项的从零开始的索引；否则为 -1。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679977(v=vs.94).aspx
    this.indexOf =
        //this.indexOf ? this.indexOf :
        function (array, item, startIndex, count, compare) {
            array = this.likeArray(array) ? array : [];
            var result = -1;
            if (!array.length) { return result; }
            if (arguments.length > 2) {
                var c = arguments[arguments.length - 1];
                compare = $.coreUtil.isFunction(c) ? c : null;
                var s = arguments[2];
                startIndex = $.coreUtil.isNumeric(s) ? s : 0;
                if (startIndex < 0 || array.length < startIndex) { return result; }
                if (arguments.length > 3) {
                    c = arguments[3];
                    count = $.coreUtil.isNumeric(c) ? c : array.length - startIndex;
                } else {
                    count = array.length - startIndex;
                }
                if (count < 0 || startIndex + count > array.length) { return result; }
            } else {
                startIndex = 0;
                count = array.length - startIndex;
                compare = null;
            }
            var stopIndex = startIndex + count;
            for (var i = startIndex; i < stopIndex; i++) {
                if ($.coreUtil.equals(array[i], item, compare)) { result = i; break; }
            }
            return result;
        };
    //  在数组中搜索指定的项，并返回整个数组中最后一个匹配项的从零开始的索引。
    //      array: 源数据数组；
    //      item:  要搜索的项；
    //      startIndex: 向后搜索的从零开始的起始索引；该参数可选；如果该参数未定义则从数组末尾开始；
    //      count: 要搜索的部分中的元素数；该参数可选，如果该参数未定义则搜索至数组的起始位置；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //  返回值：如果在数组中包含 count 个元素、在 startIndex 处结尾的元素范围内找到 item 的最后一个匹配项，则为该项的从零开始的索引；否则为 -1。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679972(v=vs.94).aspx
    this.lastIndexOf =
        //this.lastIndexOf ? this.lastIndexOf :
        function (array, item, startIndex, count, compare) {
            array = this.likeArray(array) ? array : [];
            var result = -1;
            if (!array.length) { return result; }
            if (arguments.length > 2) {
                var c = arguments[arguments.length - 1];
                compare = $.coreUtil.isFunction(c) ? c : null;
                var s = arguments[2];
                startIndex = $.coreUtil.isNumeric(s) ? s : 0;
                if (startIndex < 0 || array.length < startIndex) {
                    return result;
                }
                if (arguments.length > 3) {
                    c = arguments[3];
                    count = $.coreUtil.isNumeric(c) ? c : array.length - startIndex;
                } else {
                    count = array.length - startIndex;
                }
                if (count < 0 || startIndex + count > array.length) {
                    return result;
                }
            } else {
                startIndex = 0;
                count = array.length - startIndex;
                compare = null;
            }
            var begin = array.length - startIndex - 1,
                end = begin - count;
            for (var i = begin; i > end; i--) {
                if ($.coreUtil.equals(array[i], item, compare)) {
                    result = i; break;
                }
            }
            return result;
        };
    //  提取指定数组中介于两个指定索引号之间的元素构成的一个新的数组；该函数定义如下参数：
    //      array: 源数据数组；
    //      startIndex: 必需。一个大于或等于 0 的整数，规定从何处开始选取，从 0 开始计数。
    //      stopIndex: 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 startIndex 到数组结束的所有元素。
    //  返回值：返回一个新的数组，包含从 startIndex 到 stopIndex （不包括该元素）的 arrayObject 中的元素。
    this.range = function (array, startIndex, stopIndex) {
        array = this.likeArray(array) ? array : [];
        startIndex = $.coreUtil.isNumeric(startIndex) ? startIndex : 0;
        stopIndex = $.coreUtil.isNumeric(stopIndex) ? stopIndex : array.length;
        return core_slice.call(array, startIndex, stopIndex);
    };
    //  提取指定数组中从 startIndex 位置开始后指定数量的元素构成的一个新的数组；该函数定义如下参数：
    //      array: 源数据数组；
    //      startIndex: 一个非负的整数，规定要提取的起始位置的索引号；
    //      length: 一个非负的整数，规定要提取的元素的数量；该参数可选，如果不定义该参数，则一直提取到数组的末尾；
    //  返回值：返回一个新的数组，包含从 startIndex 处开始后长度为 length 的所有元素。
    this.rangeLen = function (array, startIndex, length) {
        startIndex = $.coreUtil.isNumeric(startIndex) ? startIndex : 0;
        length = $.coreUtil.isNumeric(length) ? length : array.length;
        var stopIndex = startIndex + length;
        return this.range(array, startIndex, stopIndex);
    };
    //  对指定的数组进行分页处理，并返回分页后的结果；该函数定义如下参数：
    //      array: 源数据数组；
    //      pageIndex: 一个非负整数，表示要返回的数据所在页面的索引号，从 0 开始计算；该参数可选，如果未定义该参数或不合法，则默认为 0；
    //      pageSize: 一个非负整数，表示每一个分页页面的尺寸，即每页有多少行记录；该参数可选，如果未定义该参数或不合法，则默认为 10；
    //          sortby: 用于排序的比较函数，该函数被循环调用，用于比较 array 中没两项的大小；这是一个可选参数；
    //              该函数的签名为 function (a, b) { }，参数 a、b 分别表示源数组中的待比较大小的项；该函数必须返回一个数值表示比较后的结果；
    //              如果 a > b ，则返回一个 大于 0 的值；
    //              如果 a < b ，则返回一个 小于 0 的值；
    //              如果 a == b，则返回 0；
    //          如果不定义该参数，则默认将 array 中的每一项当作数字来进行比较。
    //  该函数返回一个具有如下属性的 JSON 对象：
    //      pageSize:   一个非负整数，表示每一个分页页面的尺寸，即每页有多少行记录；
    //      pageIndex:  一个非负整数，表示返回的数据所在页面的索引号，从 0 开始计算；
    //      rowCount:   一个非负整数，表示返回的数据的未分页前的总行数；
    //      data:       一个数组，为传入的参数 array 的子集，表示分页后的页面数据；
    //      pageCount:  一个非负整数，表示源数据数组分页后的总页面数量；
    //      pageNumber: 一个非负整数，表示返回的数据所在的页面的序号，从 1 开始计算；同 pageIndex + 1；
    //      total:      一个非负整数，同 rowCount。
    this.splitPage = function (array, pageIndex, pageSize, sortby) {
        array = this.likeArray(array) ? array : [];
        if (!pageIndex || !$.coreUtil.isNumeric(pageIndex) || pageIndex < 0) { pageIndex = 0; }
        if (!pageSize || !$.coreUtil.isNumeric(pageSize) || pageSize < 1) { pageSize = 10; }
        var isFunc = $.coreUtil.isFunction(sortby);
        array = isFunc ? this.clone(array).sort(sortby) : array;
        var startIndex = pageIndex * pageSize;
        var stopIndex = (pageIndex + 1) * pageSize;
        var data = this.range(array, startIndex, stopIndex);
        var rowCount = array.length;
        var pageCount = Math.ceil(parseFloat(rowCount) / pageSize);
        var pageNumber = pageIndex + 1;
        var total = rowCount;
        return { pageSize: pageSize, pageIndex: pageIndex, rowCount: rowCount, data: data, pageCount: pageCount, pageNumber: pageNumber, total: total };
    };
    //  从数组中移除一定范围的元素，该函数定义如下参数：
    //      array: 源数据数组；
    //      index: 要移除的元素的范围从零开始的起始索引；该参数可选，如果不定义该参数则默认为 0；
    //      count: 要移除的元素数；该参数可选，如果不定义该参数则默认为从 index 起始位置一直到数组的末尾，可以为 0。
    //  注意：该方法会改变现有的数组。
    this.removeRange = function (array, index, count) {
        if (!this.likeArray(array)) { throw "传入的参数 array 必须是一个数组"; }
        index = $.coreUtil.isNumeric(index) ? index : 0;
        count = $.coreUtil.isNumeric(count) && count >= 0 ? count : array.length;
        core_splice.call(array, index, count);
        return array;
    };

    //  移除数组中的指定索引位置的项；该函数定义如下参数：
    //      array: 源数据数组，被移除的项包含在该数组中；
    //      index: 指定的索引位置，当检测到源数据数组中存在该索引项时，则移除源数据中的该索引项。
    //  注意：该方法会改变现有的数组。
    this.removeAt = function (array, index) { return this.removeRange(array, index, 1); };

    //  移除数组中的指定项；该函数定义如下参数：
    //      array: 源数据数组，被移除的项包含在该数组中；
    //      item: 被移除的项，当检测到源数据数组中存在该项时，则移除源数据中的该项；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //  注意：该方法会改变现有的数组。
    this.remove = function (array, item, compare) {
        var index = this.indexOf(array, item, compare);
        if (index < 0) { return array; }
        return this.removeAt(array, index);
    };
    //  将另一个数组插入到当前数组的指定索引处；该方法定义如下参数：
    //      array: 源数据数组；
    //      index: 应插入 item 的位置的零始索引；
    //      collect:  包含要插入的元素的数组；该值可以为 null。
    //  返回值：返回插入元素后的数组对象本身；如果传入的参数 array 不是一个数组，则返回一个新创建的空数组对象。
    //  注意：该方法会改变现有的数组。
    this.insertRange = function (array, index, collect) {
        if (!this.likeArray(array)) { throw "传入的参数 array 必须是一个数组"; }
        collect = this.likeArray(collect) ? collect : [collect];
        if (!$.coreUtil.isNumeric(index) || index < 0 || index > array.length) {
            throw "ArgumentOutOfRangeException: 传入的索引号 index 超出数组 array 的范围。";
        }
        var part = this.range(array, index);
        this.removeRange(array, index);
        this.copy(array, collect);
        this.copy(array, part);
        return array;
    };
    //  将元素插入数组的指定索引处；该方法定义如下参数：
    //      array: 源数据数组；
    //      index: 应插入 item 的位置的零始索引；
    //      item:  要插入的元素；该值可以为 null。
    //  返回值：返回插入元素后的数组对象本身；如果传入的参数 array 不是一个数组，则返回一个新创建的空数组对象。
    //  注意：该方法会改变现有的数组。
    this.insert = function (array, index, item) {
        var collect = [item];
        return this.insertRange(array, index, collect);
    };
    //  将另一数组中的元素复制到当前数组中一定范围的元素上；该函数定义如下参数：
    //      array: 源数据数组；
    //      index: 从 0 开始的数组索引，从该位置开始赋值 collect 元素；该参数可选，如果不定义该参数，则默认为数组的末尾；
    //      collect: 要将其元素赋值到 array 中，该数组本身不能为 null，但它可以包含为null 的元素。
    //  返回值：返回设置元素后的数组对象本身；如果传入的参数 array 不是一个数组，则返回一个新创建的空数组对象。
    //  注意：该方法会改变现有数组中的项。
    this.setRange = function (array, index, collect) {
        if (!this.likeArray(array)) { throw "传入的参数 array 必须是一个数组"; }
        index = $.coreUtil.isNumeric(index) ? index : 0;
        if (index < 0 || array.length < index) { throw "ArgumentOutOfRangeException: 传入的索引号 index 超出数组 array 的范围。"; }
        collect = this.likeArray(collect) ? collect : [];
        this.removeRange(array, collect.length);
        return this.insertRange(array, index, collect);
    };
    //  如果源数组中不存在指定的项，则将该项添加到源数组中；该方法提供如下参数：
    //      array: 源数据数组；
    //      item: 将要被合并到源数组中的项，如果源数组中不存在该项，则将其添加至源数组；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //  返回值：返回添加元素后的数组对象本身。
    //  注意：该方法会改变现有的数组。
    this.attach = function (array, item, compare) {
        if (!this.contains(array, item, compare)) {
            array.push(item);
        }
        return array;
    };
    //  去除数组中重复项；该方法提供如下参数:
    //      array: 源数据数组；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //  返回值：返回去除重复元素后的数组对象本身。
    //  注意：该方法会改变现有的数组。
    this.distinct = function (array, compare) {
        if (!this.likeArray(array)) {
            throw "传入的参数 array 必须是一个数组对象。";
        }
        var temps = [];
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            if (i == 0) {
                temps.push(item);
            } else {
                this.attach(temps, item, compare);
            }
        }
        this.removeRange(array, 0);
        this.copy(array, temps);
        return array;
    };
    //  合并两个或多个数组；该方法提供如下参数:
    //      array: 初始源数组，之后所有的项都将被合并入该数组；
    //      item1: 第 1 个待合并项；
    //      item2: 第 2 个待合并项；
    //      item3: 第 3 个待合并项；
    //      itemn... 第 n 个待合并项；
    //  如果要进行 merge 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
    //  返回值：返回合并多个数组(元素)后的数组对象本身。
    //  注意：该方法会改变现有的数组，item1、item2、item3、itemn...等所有的参数项将被合并入 array 数组。
    this.merge = this.merge = function (array, item1, item2, itemn) {
        if (!this.likeArray(array)) {
            throw "传入的参数 array 必须是一个数组对象。";
        }
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                var arg = arguments[i];
                arg = this.likeArrayNotString(arg) ? arg : [arg];
                this.copy(array, arg);
            }
        }
        return array;
    };
    //  合并两个或多个数组，重复项将不会被合并；该方法提供如下参数:
    //      array: 初始源数组；
    //      compare: 用于比较运算的函数，该函数被循环调用，用于比较 array 中的每一项是否与 item 等值；该函数返回一个 bool 值；这是一个可选参数。
    //          该函数的签名应该是 function (item1, item2) { }，参数 item1 表示源数组中的项、item2 表示要进行比较的项；
    //          如果不定义参数 compare，则使用默认的比较运算符 "==" 进行值的匹配；
    //      item1: 第 1 个待合并项；
    //      item2: 第 2 个待合并项；
    //      item3: 第 3 个待合并项；
    //      itemn... 第 n 个待合并项；
    //  如果要进行 unique 操作的参数是数组，那么添加的是数组中的元素，而不是数组。
    //  返回值：返回合并多个数组(元素)后的数组对象本身。
    //  注意：该方法会改变现有的数组，item1、item2、item3、itemn...等所有的参数项将被合并入 array 数组。
    //  该方法与 this.merge 方法的区别在于：
    //      merge 方法会将源数组与所有的 item 进行合并；
    //      unique 方法会判断源数组中是否存在相应的 item，如果存在则不合并；并且如果源数组中本身的元素如果存在重复，也会进行 distinct 处理。
    this.unique = function (array, compare, item1, item2, itemn) {
        var args = this.clone(arguments);
        args.callee = arguments.callee;
        if ($.coreUtil.isFunction(compare)) { this.removeAt(args, 1); }
        this.merge.apply(this, args);
        this.distinct(array, compare);
        return array;
    };

    //  过滤查找当前数组中的元素，并返回查找的结果；返回的查找结果是一个新的数组；该函数定义如下参数：
    //      array: 必需。 一个数组对象。
    //      compare: 必需。 一个接受最多三个参数的函数。 对于数组中的每个元素， filter 方法都会调用 callbackfn 函数一次。
    //          该回调函数的语法如：function callbackfn(value, index, array)；
    //          如果该回调函数返回 true，则该元素将被包含在返回的集合当中。
    //  返回值：一个包含回调函数为其返回 true 的所有值的新数组。 如果回调函数为 array 的所有元素返回 false，则新数组的长度为 0。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679973(v=vs.94).aspx
    this.filter = this.filter ? this.filter : function (array, compare, thisArg) {
        array = this.likeArray(array) ? array : [];
        if (!$.coreUtil.isFunction(compare)) { return array; }
        var temps = [];
        for (var i = 0; i < array.length; i++) {
            if (compare.call(thisArg, array[i], i, array) == true) { temps.push(array[i]); }
        }
        return temps;
    };
    //  对数组的每个元素调用定义的回调函数并返回包含结果的数组；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   必需。 一个接受最多三个参数的函数。 对于数组中的每个元素， map 方法都会调用 callbackfn 函数一次。
    //          该回调函数语法如：function callbackfn(value, index, array1)；
    //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    //  返回值：其中的每个元素均为关联的原始数组元素的回调函数返回值的新数组。
    //  备注：对于数组中的每个元素， map 方法都会调用 callbackfn 函数一次（采用升序索引顺序）。 不为数组中缺少的元素调用该回调函数。
    //      除了数组对象之外， map 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679976(v=vs.94).aspx
    this.map = this.map ? this.map : function (array, callback, thisArg) {
        array = this.likeArray(array) ? array : [];
        if (!$.coreUtil.isFunction(callback)) {
            throw "传入的参数 callback 不是一个函数。";
        }
        var temps = [];
        for (var i = 0; i < array.length; i++) {
            var item = callback.call(thisArg, array[i], i, array);
            temps.push(item);
        }
        return temps;
    };
    //  对数组进行格式转换，将数组中的每一项转换成新的格式，然后合并成一个新的数组并返回；该函数定义如下参数：
    //  该方法同 this.map
    this.cast = this.map;
    //  获取数组中最大值的项；该函数定义如下参数:
    //      array: 待查找的源数组；
    //      compare: 比较函数，该函数被循环调用，用于比较 array 中没两项的大小；这是一个可选参数；
    //          该函数的签名为 function (a, b) { }，参数 a、b 分别表示源数组中的待比较大小的项；该函数必须返回一个数值表示比较后的结果；
    //              如果 a > b ，则返回一个 大于 0 的值；
    //              如果 a < b ，则返回一个 小于 0 的值；
    //              如果 a == b，则返回 0；
    //      如果不定义该参数，则默认将 array 中的每一项当作数字来进行比较。
    this.max = function (array, compare) {
        array = this.likeArray(array) ? array : [];
        if (array.length == 0) { return undefined; }
        if (array.length == 1) { return array[0]; }
        return this.reduce(this.range(array, 1), function (prev, current, index, array) {
            return $.coreUtil.compare(prev, current, compare) >= 0 ? prev : current;
        }, array[0]);
    };
    //  获取数组中值等于最大值的集合数组；该函数的参数定义和 this.max 相同；
    //  该函数返回的是一个新的数组，即使查找到的结果只有一项；
    this.maxs = function (array, compare) {
        array = this.likeArray(array) ? array : [];
        var max = this.max(array, compare);
        return this.filter(array, function (item) {
            return $.coreUtil.compare(item, max, compare) == 0;
        });
    };
    //  获取数组中最小值的项；该函数的参数定义和 this.max 相同；
    this.min = function (array, compare) {
        array = this.likeArray(array) ? array : [];
        if (array.length == 0) { return undefined; }
        if (array.length == 1) { return array[0]; }
        return this.reduce(this.range(array, 1), function (prev, current, index, array) {
            return $.coreUtil.compare(current, prev, compare) >= 0 ? prev : current;
        }, array[0]);
    };
    //  获取数组中值等于最小值的集合；该函数的参数定义和 this.max 相同；
    //  该函数返回的是一个新的数组，即使查找到的结果只有一项；
    this.mins = function (array, compare) {
        array = this.likeArray(array) ? array : [];
        var min = this.min(array, compare);
        return this.filter(array, function (item) {
            return $.coreUtil.compare(item, min, compare) == 0;
        });
    };
    //  计算数组中各项累加后的合计值；该函数定义如下参数:
    //      array:  源数据数组
    //      callback: 转换函数，该函数被循环调用，用于将 array 中的每一项转换成一个新的数值并输出；如果定义该函数，则其必须返回一个数值；该参数可选；
    //          该函数的签名应该是 function (item) { }，参数 item 表示源数组中的项；
    //          如果不定义该参数，则默认将 array 中的每一项直接相加。
    //      thisArg:    可选。 可在 callback 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    this.sum = function (array, callback, thisArg) {
        var isFunc = $.coreUtil.isFunction(callback),
            fn = function (previous, current) {
                return previous + (isFunc ? callback.call(thisArg, current) : current);
            };
        return this.reduce(array, fn, 0);
    };
    //  计算数组中各项累积后的平均值；该函数参数的定义和 this.sum 一样；
    this.avg = function (array, callback, thisArg) {
        array = this.likeArray(array) ? array : [];
        var sum = this.sum(array, callback, thisArg),
            avg = parseFloat(sum) / array.length;
        return avg;
    };
    //  从数组的开头返回指定数量的连续元素构成的新数组；该函数定义如下参数:
    //      array: 源数据数组；
    //      count: 要提取的元素项的数量，必须是一个正整数；该参数可选；如果不传入该参数或传入的值超出范围，则默认为 1。
    this.take = function (array, count) {
        array = this.likeArray(array) ? array : [];
        if (!$.coreUtil.isNumeric(count) || count < 1) { count = 1; }
        var temps = [];
        for (var i = 0; i < array.length; i++) { if (i < count) { temps.push(array[i]); } }
        return temps;
    };
    //  跳过数组中指定数量的元素，然后返回剩余元素构成的新数组；该函数定义如下参数：
    //      array: 源数据数组；
    //      count: 返回剩余元素前要跳过的元素数量，必须是一个非负整数；该参数可选；如果不传入该参数或传入的值为负数，则默认为 0。
    this.skip = function (array, count) {
        array = this.likeArray(array) ? array : [];
        if (!$.coreUtil.isNumeric(count) || count < 0) { count = 0; }
        var temps = [];
        for (var i = count; i < array.length; i++) { temps.push(array[i]); }
        return temps;
    };
    // 为数组中的每个元素执行指定操作；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   必需。 一个接受最多三个参数的函数。 对于数组中的每个元素， forEach 都会调用 callbackfn 函数一次。
    //          该函数语法如：function callbackfn(value, index, array)；
    //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    //  返回值：返回传入的参数 array 本身。
    //  备注：对于数组中的每个元素， forEach 方法都会调用 callbackfn 函数一次（采用升序索引顺序）。
    //      如果需要退出 each 循环可使回调函数返回 false，其它返回值将被忽略。
    //      除了数组对象之外， forEach 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679980(v=vs.94).aspx
    this.forEach = this.forEach ? this.forEach : function (array, callback, thisArg) {
        var isArray = this.likeArray(array), temps = isArray ? array : [], i = 0, length = temps.length;
        if (temps.length == 0) { return; }
        if (!$.coreUtil.isFunction(callback)) { throw "传入的参数 callback 不是一个函数。"; }
        if (isArray) {
            for (; i < length; i++) { if (callback.call(thisArg, temps[i], i, temps) == false) { break; } }
        } else {
            for (i in temps) { if (callback.call(thisArg, temps[i], i, temps) == false) { break; } }
        }
        return array;
    };
    //  对数组中的所有元素调用指定的回调函数。 该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   必需。 一个接受最多四个参数的函数。 对于数组中的每个元素， reduce 方法都会调用 callbackfn 函数一次。
    //          该回调函数语法如：function callbackfn(previousValue, currentValue, currentIndex, array)
    //      initialValue:可选。 如果指定 initialValue，则它将用作初始值来启动累积。 第一次调用 callbackfn 函数会将此值作为参数而非数组值提供。
    //  返回值：通过最后一次调用回调函数获得的累积结果。
    //  异常：当满足下列任一条件时，将引发 TypeError 异常：
    //      1、callbackfn 参数不是函数对象。
    //      2、数组不包含元素，且未提供 initialValue。
    //  备注：如果提供了 initialValue，则 reduce 方法会对数组中的每个元素调用一次 callbackfn 函数（按升序索引顺序）。
    //      如果未提供 initialValue，则 reduce 方法会对从第二个元素开始的每个元素调用 callbackfn 函数。
    //      回调函数的返回值在下一次调用回调函数时作为 previousValue 参数提供。 最后一次调用回调函数获得的返回值为 reduce 方法的返回值。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679975(v=vs.94).aspx
    this.reduce = this.reduce ? this.reduce : function (array, callback, initialValue) {
        if (!$.coreUtil.isFunction(callback)) { throw "传入的参数 callback 不是一个函数。"; }
        array = this.likeArray(array) ? array : [];
        if (array.length == 0 && (initialValue === undefined)) { throw "数组不包含元素，且未提供 initialValue。"; }
        var index = 0;
        if (initialValue === undefined) { initialValue = array[0]; index = 1; }
        for (var i = index; i < array.length; i++) {
            initialValue = callback.call(this, initialValue, array[i], i, array);
        }
        return initialValue;
    };
    //  按降序顺序对数组中的所有元素调用指定的回调函数。 该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   必需。 一个接受最多四个参数的函数。 对于数组中的每个元素， reduce 方法都会调用 callbackfn 函数一次。
    //          该回调函数语法如：function callbackfn(previousValue, currentValue, currentIndex, array)
    //      initialValue:可选。 如果指定 initialValue，则它将用作初始值来启动累积。 第一次调用 callbackfn 函数会将此值作为参数而非数组值提供。
    //  返回值：通过最后一次调用回调函数获得的累积结果。
    //  异常：当满足下列任一条件时，将引发 TypeError 异常：
    //      1、callbackfn 参数不是函数对象。
    //      2、数组不包含元素，且未提供 initialValue。
    //  备注：如果提供了 initialValue，则 reduceRight 方法会按降序索引顺序对数组中的每个元素调用一次 callbackfn 函数。
    //      如果未提供 initialValue，则 reduceRight 方法会按降序索引顺序对每个元素（从倒数第二个元素开始）调用 callbackfn 函数。
    //      回调函数的返回值在下一次调用回调函数时作为 previousValue 参数提供。 最后一次调用回调函数获得的返回值为 reduceRight 方法的返回值。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679979(v=vs.94).aspx
    this.reduceRight = this.reduceRight ? this.reduceRight : function (array, callback, initialValue) {
        if (!$.coreUtil.isFunction(callback)) { throw "传入的参数 callback 不是一个函数。"; }
        array = this.likeArray(array) ? array : [];
        if (array.length == 0 && (initialValue === undefined)) { throw "数组不包含元素，且未提供 initialValue。"; }
        var index = array.length - 1;
        if (initialValue === undefined) { initialValue = array[array.length - 1]; index = array.length - 2; }
        for (var i = index; i > -1; i--) {
            initialValue = callback.call(this, initialValue, array[i], i, array);
        }
        return initialValue;
    };
    //  确定数组的所有成员是否满足指定的测试；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   必需。 一个接受最多三个参数的函数。 every 方法会为 array1 中的每个元素调用 callbackfn 函数，直到 callbackfn 返回 false，或直到到达数组的结尾。
    //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    //  返回值：如果 callbackfn 函数为所有数组元素返回 true，则为 true；否则为 false。 如果数组没有元素，则 every 方法将返回 true。
    //  备注：除了数组对象之外， every 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679981(v=vs.94).aspx
    this.every = this.every ? this.every : function (array, callback, thisArg) {
        array = this.likeArray(array) ? array : [];
        if (array.length == 0) { return true; }
        if (!$.coreUtil.isFunction(callback)) { throw "传入的参数 callback 不是一个函数。"; }
        for (var i = 0; i < array.length; i++) {
            if (callback.call(thisArg, array[i], i, array) == false) { return false; }
        }
        return true;
    };

    //  确定指定的回调函数是否为数组中的任何元素均返回 true；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   必需。 一个接受最多三个参数的函数。 some 方法会为 array1 中的每个元素调用 callbackfn 函数，直到 callbackfn 返回 true，或直到到达数组的结尾。
    //          该函数语法如：function callbackfn(value, index, array1)
    //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    //  返回值：如果 callbackfn 函数为任何数组元素均返回 true，则为 true；否则为 false。
    //  异常：如果 callbackfn 参数不是函数对象，则将引发 TypeError 异常。
    //  备注：some 方法会按升序索引顺序对每个数组元素调用 callbackfn 函数，直到 callbackfn 函数返回 true。 如果找到导致 callbackfn 返回 true 的元素，则 some 方法会立即返回 true。 如果回调不对任何元素返回 true，则 some 方法会返回 false。
    //      除了数组对象之外， some 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
    //  参考：http://msdn.microsoft.com/ZH-CN/library/ie/ff679978(v=vs.94).aspx
    this.some = this.some ? this.some : function (array, callback, thisArg) {
        array = this.likeArray(array) ? array : [];
        if (!$.coreUtil.isFunction(callback)) { throw "传入的参数 callback 不是一个函数。"; }
        for (var i = 0; i < array.length; i++) {
            if (callback.call(thisArg, array[i], i, array) == true) { return true; }
        }
        return false;
    };

    //  查找指定数组中第一个符合条件判定的项会将其返回；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   可选。 一个接受最多三个参数的函数。 first 方法会为 array 中的每个元素调用 callbackfn 函数，直到 callbackfn 返回 true，或直到到达数组的结尾。
    //          该函数语法如：function callbackfn(value, index, array1)
    //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    //  返回值：如果定义了参数 callbackfn ，返回 array 中第一个导致回调函数 callback 返回 true 的项目；
    //      如果未定义参数 callback，则返回 array 中的第一个元素；
    //      如果数组 array 不包含任何元素，或者 callback 回调函数遍历完 array 中所有元素后始终未返回 true 值，则 first 方法返回 null。
    //  备注：first 方法会按升序索引顺序对每个数组元素调用 callbackfn 函数，直到 callbackfn 函数返回 true。 如果找到导致 callbackfn 返回 true 的元素，则 first 方法会立即返回该元素。 如果回调不对任何元素返回 true，则 first 方法会返回 null。
    //      除了数组对象之外， first 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
    this.first = function (array, callback, thisArg) {
        array = this.likeArray(array) ? array : [];
        if (!$.coreUtil.isFunction(callback)) { return array.length ? array[0] : null; }
        for (var i = 0; i < array.length; i++) {
            if (callback.call(thisArg, array[i], i, array) == true) { return array[i]; }
        }
        return null;
    };

    //  查找指定数组中最后一个符合条件判定的项会将其返回；该函数定义如下参数：
    //      array:      必需。 一个数组对象。
    //      callback:   可选。 一个接受最多三个参数的函数。 last 方法会从 array 的结束位置其为它的每个元素调用 callbackfn 函数，直到 callbackfn 返回 true，或直到到达数组的起始位置。
    //          该函数语法如：function callbackfn(value, index, array1)
    //      thisArg:    可选。 可在 callbackfn 函数中为其引用 this 关键字的对象。 如果省略 thisArg，则 undefined 将用作 this 值。
    //  返回值：如果定义了参数 callbackfn ，返回 array 中最后一个导致回调函数 callback 返回 true 的项目；
    //      如果未定义参数 callback，则返回 array 中的最后一个元素；
    //      如果数组 array 不包含任何元素，或者 callback 回调函数遍历完 array 中所有元素后始终未返回 true 值，则 last 方法返回 null。
    //  备注：last 方法会按降序索引顺序对每个数组元素调用 callbackfn 函数，直到 callbackfn 函数返回 true。 如果找到导致 callbackfn 返回 true 的元素，则 last 方法会立即返回该元素。 如果回调不对任何元素返回 true，则 last 方法会返回 null。
    //      除了数组对象之外， last 方法可由具有 length 属性且具有已按数字编制索引的属性名的任何对象使用。
    this.last = function (array, callback, thisArg) {
        array = this.likeArray(array) ? array : [];
        if (!$.coreUtil.isFunction(callback)) { return array.length ? array[array.length - 1] : null; }
        for (var i = array.length - 1; i >= 0; i--) {
            if (callback.call(thisArg, array[i], i, array) == true) { return array[i]; }
        }
        return null;
    };

    //  获取指定数组的前 N 项元素所构成的一个新数组；该函数定义如下参数：
    //      array:  必需。 一个数组对象。
    //      length: 必须。 一个 Number 类型值，表示要获取的项的数量；
    //  返回值：返回指定的数组对象 array 的前面长度为 length 的元素所构成的一个新的数组。
    //      如果 length 的值为 0，则返回一个空数组；
    //      如果 length 的值大于 array.length，则返回 array 的一个副本；
    this.left = function (array, length) {
        array = this.likeArray(array) ? array : [];
        if (!length || !$.coreUtil.isNumeric(length) || length < 0) { return []; }
        if (length > array.length) { return this.clone(array); }
        return this.range(array, 0, length);
    };

    //  获取指定数组的后 N 项元素所构成的一个新数组；该函数定义如下参数：
    //      array:  必需。 一个数组对象。
    //      length: 必须。 一个 Number 类型值，表示要获取的项的数量；
    //  返回值：返回指定的数组对象 array 的后面长度为 length 的元素所构成的一个新的数组。
    //      如果 length 的值为 0，则返回一个空数组；
    //      如果 length 的值大于 array.length，则返回 array 的一个副本；
    this.right = function (array, length) {
        array = this.likeArray(array) ? array : [];
        if (!length || !$.coreUtil.isNumeric(length) || length < 0) { return []; }
        if (length > array.length) { return this.clone(array); }
        return this.range(array, array.length + 1 - length);
    };
    

    /**
     * 数组转成树型结构
     * parentField : "pid",
     * textField : "name",
     * idField : "key"
     * textName: 可不设置，设置后会为每个对象增加一个对应设置的属性，并存textField设置的值
     */
    this.toTree = function(array,opt) {
    	array = this.likeArray(array) ? array : [];
    	opt = $.extend({
    		parentField : "pid",
    		textField : "name",
    		idField : "key",
    		childrenField:"children"
    	}, opt || {});
    	var data = [];
    	var i, l, treeData = [], tmpMap = [];
    	for (i = 0, l = array.length; i < l; i++) {
    		data[i] = $.extend(true, {},  array[i]);
    		if (opt.textName) {
    			data[i][opt.textName] = data[i][opt.textField];
    		}
    		tmpMap[data[i][opt.idField]] = data[i];
    	}
    	for (i = 0, l = data.length; i < l; i++) {
    		if (tmpMap[data[i][opt.parentField]] && data[i][opt.idField] != data[i][opt.parentField]) {
    			if (!tmpMap[data[i][opt.parentField]][opt.childrenField])
    				tmpMap[data[i][opt.parentField]][opt.childrenField] = [];
    			tmpMap[data[i][opt.parentField]][opt.childrenField].push(data[i]);
    		} else {
    			treeData.push(data[i]);
    		}
    	}
    	return treeData;
    };
	
	jQuery.arrayUtil = this;
	
	return jQuery;
	
})(jQuery);