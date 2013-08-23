$(function() {
	$('#addBudget .btn.btn-success').click(function(ev) {
		var row = $(this).parent()
		s= $('#budgetLimit').val()
		var k=0
		for (var x=0; x< s.length; x++){
			if (s[x] >= '0' && s[x] <= '9') {
					k++;
			}
		}
		if (k != s.length){
		ev.preventDefault()
		$('.budgWar').show()
		}
	})
	$('.remainBug').on('click', '.remove', function() {
		var row = $(this).parent()
		if (confirm('بودجه بندی دسته' + row.find('.bugName').text() + ' حذف شود؟ ')) {
			row.find('form#delete').submit()
		}
	})
	$('.remainBug').on('click', '.edit', function() {
		var row = $(this).parent()
			row.find('form.edt').removeClass('edt')
			row.data('pressed', true)
	})
	
	$('#edtSubmit').click(function(ev) {
		var row = $(this).parent()
		s= $('.limitEdit').val()
		var k=0
		for (var x=0; x< s.length; x++){
			if (s[x] >= '0' && s[x] <= '9') {
					k++;
			}
		}
		if (k != s.length){
		ev.preventDefault()
		$('.budgWar').hide();
		$('.budgWar').eq($(this).index()-1).show();
		}
	})
	
	$('.cancelEdit').click(function(ev) {
		ev.preventDefault();
		var row = $(this).parent()
		$('form.forSub').addClass('edt')
	});
})