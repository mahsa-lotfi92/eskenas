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
		$('.home').hide();
		$('.home').eq($(this).index()).show();
	})
	
		$('#reg').submit(function(ev) {
		var fst = $(this).find('.passRow').eq(4).find('.passIn').val();
		var scnd = $(this).find('.passRow').eq(5).find('.passIn').val();
		if (fst != scnd) {
			$(this).find('.passRow').eq(6).find('.error').css('display','block');
			$(this).find('.passRow').eq(6).find('.error').text("تکرار رمز عبور نادرست است");
			
			return false;
		} else {
			$(this).submit();

		}
		return false;

	});
	
});

