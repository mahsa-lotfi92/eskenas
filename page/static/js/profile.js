$(function() {
	//save edit
	$('.save').click(function() {

		var input = $(this).parent()
		var row = input.parent();
		var value = input.find('.inp').val();
		if (confirm('Are you sure to save ' + value + '? ')) {
			input.submit()
		}
		input.fadeOut()

	})
	//start edit
	$('.edit').click(function() {

		var row = $(this).parent();
		var input = row.find('.newInp');
		input.find('.inp').val("");
		input.fadeIn("fast");
		input.find('.inp').focus();
	})
	$('.cancelEdit').click(function(ev){
		ev.preventDefault();
		var row = $(this).parent().parent();
		row.fadeOut("fast");
	})

	$('.passTable').submit(function(ev) {
		$(this).parent().find('.message-box').hide();
		$(this).parent().find('.message-box').find('.warning').hide();
		$(this).parent().find('.message-box').find('.message').text("");
		var fst = $(this).find('.passRow').eq(1).find('.passIn').val();
		var scnd = $(this).find('.passRow').eq(2).find('.passIn').val();
		if (fst != scnd) {
			$(this).parent().find('.message-box').fadeIn();
			$(this).parent().find('.message-box').find('.warning').fadeIn();
			$(this).parent().find('.message-box').find('.message').text("تکرار رمز جدید نادرست است.");
			return false;

		} else {
			$(this).submit();
		}
		$('.barItem').removeClass('active');
		$('#sidebar .barItem').eq(2).addClass('active');
	})
	$('#forReg').delay(5000).fadeOut(400)
})
