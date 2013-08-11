$(function() {
	$('#login_link').click(function(ev) {
		ev.preventDefault();
		$('#login').css('display', 'inline');
	});
	$('#reg_link').click(function(ev) {
		ev.preventDefault();
		$('#reg').css('display', 'inline');
	});
	$('.closePic').click(function(ev) {
		ev.preventDefault();
		$(this).parent().parent().css('display', 'none');
	});
	$('.menuItem').click(function(ev) {
		ev.preventDefault();
		$('.menuItem').removeClass('active')
		$(this).addClass('active')
	})
});

