$(function() {
	$('#login_link').click(function(ev) {
		ev.preventDefault();
		$('#login').css('display', 'inline');
		$('#main').css('opacity', '0.5');
	});
	$('#reg_link').click(function(ev) {
		ev.preventDefault();
		$('#reg').css('display', 'inline');
		$('#main').css('opacity', '0.5');		
	});
	$('.closePic').click(function(ev) {
		ev.preventDefault();
		$(this).parent().parent().css('display', 'none');
		$('#main').css('opacity', '1');
	});
	$('.menuItem').click(function(ev) {
		ev.preventDefault();
		$('.menuItem').removeClass('active')
		$(this).addClass('active')
	})
});

