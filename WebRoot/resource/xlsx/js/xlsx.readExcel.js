(function(){
	this.xmlhttp = null;
	
	this.fixdata = function(data) { 
        var o = "",
            l = 0,
            w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    };
	
	this.readExcel = function(url){
		if(window.XMLHttpRequest){// code for all new browsers
		  this.xmlhttp=new XMLHttpRequest();
		}else if(window.ActiveXObject){// code for IE5 and IE6
		  this.xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		if(url != null && this.xmlhttp != null){
			//this.xmlhttp.responseType = 'arraybuffer';
			
			this.xmlhttp.onreadystatechange=function(){
			  alert(">>>>>"+this.readyState);
			  if(this.readyState==4){// 4 = "loaded"
				  if (this.status==200){// 200 = OK
				    alert("ok");
				    alert(JSON.stringify(this.responseText));
				    var wb = XLSX.read(this.responseText,{type: 'base64'});
				    /*var wb = XLSX.read(btoa(fixdata(this.responseText)), {//手动转化
							type: 'base64'
					});*/
				    alert(JSON.stringify(wb));
				  }else{
				    alert("Problem retrieving XML data");
				  }
				}
			 };
		   this.xmlhttp.open("GET",url,true);
		   this.xmlhttp.overrideMimeType('text\/plain; charset=x-user-defined');
		   this.xmlhttp.send(null);
		}
	};
	
	jQuery.xlsx_readExcel = this;
	
	return jQuery;
})(jQuery);