$(function() {
	$('#addBudget .btn.btn-success').click(function() {
		var row = $(this).parent()
		row.find('form').submit()
	})