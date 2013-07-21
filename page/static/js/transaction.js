$(function () {
	$('#sidebar .barItem').eq(0).click(function(ev) {
		ev.preventDefault()

		$ ('#inCon').css('margin-right', -20 )
		$ ('.barItem').removeClass('active')
		$(this).addClass('active')
	})

	$('#sidebar .barItem').eq(1).click(function(ev) {
		ev.preventDefault()

		$ ('#inCon').css('margin-right', -785 )
		$ ('.barItem').removeClass('active')
		$(this).addClass('active')
	})

	$('#sidebar .barItem').eq(2).click(function(ev) {
		ev.preventDefault()

		$ ('#inCon').css('margin-right', -1550 )
		$ ('.barItem').removeClass('active')
		$(this).addClass('active')
	})
	
	$('#sidebar .barItem').eq(3).click(function(ev) {
		ev.preventDefault()

		$ ('#inCon').css('margin-right', -2315 )
		$ ('.barItem').removeClass('active')
		$(this).addClass('active')
	})
})

$(function (){
	$('#addCat .btn.btn-success').click(function() {
		var row = $(this).parent()
		row.find('form').submit()
	})

	// plus button under each category
	$('.cat-table').on('click', '.add .icon-plus', function() {
		var row = $(this).parent()

		if (row.data('pressed')) {
			row.find('form').submit()
		} else {
			row.addClass('out')
			row.data('pressed', true)
		}
	})

	// edit each (sub)category
	$('.cat-table').on('click', '.xrow .edit', function() {
		var row = $(this).parent()

		var inp = prompt('New value:')
		if (inp) {
			row.find('.name').html(inp)
		}
	})

	// remove each (sub)category
	$('.cat-table').on('click', '.xrow .remove', function() {
		var row = $(this).parent()
		if (confirm('زیر دسته‌ی ' + row.find('.name').text() + ' حذف شود؟ ')) {
		row.find('form').submit()
		}
	})

	// sync now!
	$('#btnSyncNow').click(function() {
		$('#sync .loading').show()
		setTimeout(function(){
			$('#sync .loading').hide()
			$('#sync .tranTable').fadeIn()
		}, 1000)
	})

	$('#btnSyncConfig').click(function() {
		$('#syncConfig').slideDown()
	})
})
		$(function() {

			$('#addTranSubmit').click(function(ev) {
				ev.preventDefault();
				$(this).parent().parent().submit()

			});

			$('.TranRemove').click(function(ev) {
				ev.preventDefault();
				$(this).parent().parent().submit()

			});
			$('.TranEdit').click(function(ev) {
				ev.preventDefault();
				$(this).parent().parent().parent().find('.TRedit').css('display', 'inherit');
			});
			$('.cancelEdit').click(function(ev) {
				ev.preventDefault();
				$(this).parent().css('display', 'none');
			});
			$('.catItem').click(function(ev) {
				ev.preventDefault();
				$('.Category').val($(this).text());

			});
			$('.income').click(function(ev) {
				ev.preventDefault();
				$('.isIncome').val(1);

			});
			$('.outcome').click(function(ev) {
				ev.preventDefault();

				$('.isIncome').val(0);

			});

		})
