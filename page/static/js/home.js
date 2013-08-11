$(function() {
	$('#login_link').click(function(ev) {
		ev.preventDefault();
		$('#login').css('display', 'inline');
		$('#reg').css('display', 'none');

		$('#main').addClass('setOpacity');
	});

	$('#reg_link').click(function(ev) {
		ev.preventDefault();
		$('#reg').css('display', 'inline');
		$('#login').css('display', 'none');

		$('#main').addClass('setOpacity');
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

