$(function() {
	$('#sidebar').on('click', '.barItem', function(ev) {
		ev.preventDefault()

		var mr = -20 - $('#inCon > div').eq(0).outerWidth() * $(this).index()
		$('#inCon').css('margin-right', mr)
		$('.barItem').removeClass('active')
		$(this).addClass('active')
	})
})
$(function() {
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
	
	$('.cat-table').on('click', '.add .icon-chevron-right', function() {
		var row = $(this).parent()
			row.removeClass('out')
			row.data('pressed', false)
	})
	
	// edit each (sub)category
		$('.cat-table').on('click', '.xrow .edit', function() {
			var row = $(this).parent()
			row.find('form.edt').removeClass('edt')
		})
	// remove each (sub)category
	$('.cat-table').on('click', '.xrow .remove', function() {
		var row = $(this).parent()
		if (confirm('حتما ' + row.find('.name').text() + ' حذف شود؟ ')) {
			row.find('form#delete').submit()
		}
	})
	// sync now!
	$('#btnSyncNow').click(function() {
		$('#sync .loading').show()
		setTimeout(function() {
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
		if ($(this).parent().hasClass("forSub")){		
		$(this).parent().addClass('edt')
		}
		else
		$(this).parent().css('display', 'none');
	});

		$('.catEditItem').click(function(ev) {
		ev.preventDefault();
		$(this).parent().parent().find('.tranCatEdit').val($(this).text());

	});
	$('.income').click(function(ev) {
		ev.preventDefault();
		$('.isIncome').val(1);
		$(this).addClass('selected')
		$('.outcome').removeClass("selected")

	});
	$('.outcome').click(function(ev) {
		ev.preventDefault();
		$('.isIncome').val(0);
		$(this).addClass('selected')
		$('.income').removeClass("selected")
		

	});

})
