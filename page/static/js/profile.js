			$(function() {
				$('#sidebar .barItem').eq(0).click(function(ev) {
					ev.preventDefault()

					$('#inCon').css('margin-right', -20)
					$('.barItem').removeClass('active')
					$(this).addClass('active')
				})

				$('#sidebar .barItem').eq(1).click(function(ev) {
					ev.preventDefault()

					$('#inCon').css('margin-right', -785)
					$('.barItem').removeClass('active')
					$(this).addClass('active')
				})

				$('#sidebar .barItem').eq(2).click(function(ev) {
					ev.preventDefault()

					$('#inCon').css('margin-right', -1550)
					$('.barItem').removeClass('active')
					$(this).addClass('active')
				})
				$('#sidebar .barItem').eq(3).click(function(ev) {
					ev.preventDefault()

					$('#inCon').css('margin-right', -2316)
					$('.barItem').removeClass('active')
					$(this).addClass('active')
				})
			})

			//save edit
			$('.save').click(function() {

				var input = $(this).parent()
				var row = input.parent();
				var value = input.find('.inp').val();
				if (confirm('Are you sure to save ' + value + '? ')) {
					row.find('.inf').text(value);
				}
				input.fadeOut();

			});
			//start edit
			$('.edit').click(function() {

				var row = $(this).parent();
				var input = row.find('.newInp');
				input.find('.inp').val("");
				input.fadeIn("slow");
			});

			$('.passTable').submit(function(ev) {
				ev.preventDefault()
				$(this).parent().find('.message-box').fadeIn();
				$(this).parent().find('.message-box').find('.warning').hide();
				var fst = $(this).find('.passRow').eq(1).find('.passIn').val();
				var scnd = $(this).find('.passRow').eq(2).find('.passIn').val();
				if (fst != scnd) {
					$(this).parent().find('.message-box').find('.warning').fadeIn();
					$(this).parent().find('.message-box').find('.message').text("تکرار رمز جدید نادرست است.");
				} else {
					$(this).parent().find('.message-box').find('.message').text("با موفقیت ثبت شد");
				}
				$('.barItem').removeClass('active');
				$('#sidebar .barItem').eq(2).addClass('active');
			});
