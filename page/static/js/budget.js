$(function() {
	$('#addBudget .btn.btn-success').click(function() {
		var row = $(this).parent()
		row.find('form').submit()
	})
	$('.remainBug').on('click', '.remove', function() {
		var row = $(this).parent()
		if (confirm('حتما ' + row.find('.bugName').text() + ' حذف شود؟ ')) {
			row.find('form#delete').submit()
		}
		alert(123)
	})
)