$(function(){
	$(".menuItem").removeClass("active");
	$("a[href='" + document.location.pathname + "']").parent().addClass("active");
})

window.helper = window.helper || {}
window.helper.format_with_tousand_seperator = function(x) {
	var l = [];

    if (!isNumber(x))
        return ''

	while (x != 0) {
        console.log(x)
		l.push(x % 1000);
		x = Math.floor(x / 1000);
	}
	l.reverse();

	if (!l.length)
		return "0";

	l = $.map(l, function(val, idx) {
		if (idx)
			return helper.sprintf("%03d", val);
		return "" + val;
	});

	return l.join(",");
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


window.helper.sprintf=function(){function j(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}var c=function(){c.cache.hasOwnProperty(arguments[0])||(c.cache[arguments[0]]=c.parse(arguments[0]));return c.format.call(null,c.cache[arguments[0]],arguments)};c.format=function(e,f){var c=1,i=e.length,a="",h=[],d,g,b,k;for(d=0;d<i;d++)if(a=j(e[d]),"string"===a)h.push(e[d]);else if("array"===a){b=e[d];if(b[2]){a=f[c];for(g=0;g<b[2].length;g++){if(!a.hasOwnProperty(b[2][g]))throw'[sprintf] property "'+b[2][g]+
'" does not exist';a=a[b[2][g]]}}else a=b[1]?f[b[1]]:f[c++];if(/[^s]/.test(b[8])&&"number"!=j(a))throw"[sprintf] expecting number but found "+j(a);switch(b[8]){case "b":a=a.toString(2);break;case "c":a=String.fromCharCode(a);break;case "d":a=parseInt(a,10);break;case "e":a=b[7]?a.toExponential(b[7]):a.toExponential();break;case "f":a=b[7]?parseFloat(a).toFixed(b[7]):parseFloat(a);break;case "o":a=a.toString(8);break;case "s":a=(a=String(a))&&b[7]?a.substring(0,b[7]):a;break;case "u":a=Math.abs(a);
break;case "x":a=a.toString(16);break;case "X":a=a.toString(16).toUpperCase()}a=/[def]/.test(b[8])&&b[3]&&0<=a?"+"+a:a;g=b[4]?"0"==b[4]?"0":b[4].charAt(1):" ";k=b[6]-String(a).length;if(b[6]){for(var l=[];0<k;l[--k]=g);g=l.join("")}else g="";h.push(b[5]?a+g:g+a)}return h.join("")};c.cache={};c.parse=function(e){for(var f=[],c=[],i=0;e;){if(null!==(f=/^[^\x25]+/.exec(e)))c.push(f[0]);else if(null!==(f=/^\x25{2}/.exec(e)))c.push("%");else if(null!==(f=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(e))){if(f[2]){var i=
i|1,a=[],h=f[2],d=[];if(null!==(d=/^([a-z_][a-z_\d]*)/i.exec(h)))for(a.push(d[1]);""!==(h=h.substring(d[0].length));)if(null!==(d=/^\.([a-z_][a-z_\d]*)/i.exec(h)))a.push(d[1]);else if(null!==(d=/^\[(\d+)\]/.exec(h)))a.push(d[1]);else throw"[sprintf] huh?";else throw"[sprintf] huh?";f[2]=a}else i|=2;if(3===i)throw"[sprintf] mixing positional and named placeholders is not (yet) supported";c.push(f)}else throw"[sprintf] huh?";e=e.substring(f[0].length)}return c};return c}();