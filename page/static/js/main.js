$(function(){
	$(".menuItem").removeClass("active");
	$("a[href='" + document.location.pathname + "']").parent().addClass("active");
})
