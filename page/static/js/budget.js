$(function() {
	$('#addBudget .btn.btn-success').click(function() {
		var row = $(this).parent()
		row.find('form').submit()
	})
	$('.remainBug').on('click', '.remove', function() {
		var row = $(this).parent()
		if (confirm('بودجه بندی دسته' + row.find('.bugName').text() + ' حذف شود؟ ')) {
			row.find('form#delete').submit()
		}
	})
	$('.remainBug').on('click', '.edit', function() {
		var row = $(this).parent()
		if (row.data('pressed')) {
			row.find('form.forSub').addClass('edt')
			row.data('pressed', false)
		} else {
			row.find('form.edt').removeClass('edt')
			row.data('pressed', true)
		}
	})
})