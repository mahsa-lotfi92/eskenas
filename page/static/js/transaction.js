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
})


$(function() {
	// plus button under each category
	$('.cat-table').on('click', '.add .icon-plus', function() {
		var row = $(this).parent()

		if (row.data('pressed')) {
			var text = row.find('input').val()
			alert(text)

			row.find('input').val('')
			row.toggleClass('out')
			row.data('pressed', false)
		} else {
			row.toggleClass('out')
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

		if (confirm('Are you sure to remove ' + row.find('.name').text() + '?')) {
			row.remove()			
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
