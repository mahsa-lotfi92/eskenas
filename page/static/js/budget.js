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
		if (k != s.length || s.length==0){
		ev.preventDefault()
		$('.budgWar').hide()
		$('.budgWar').eq(0).show()
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
		row.find('.limitEdit').focus()
	})
	
	$('.edtSubmit').click(function(ev) {
		var row = $(this).parent()
		var i= $(".edtSubmit").index(this);
		s= $('.limitEdit').eq(i).val()
		console.log(s);
		var k=0
		for (var x=0; x< s.length; x++){
			if (s[x] >= '0' && s[x] <= '9') {
					k++;
			}
		}
		if (k != s.length || s.length==0){
		ev.preventDefault()
		$('.budgWar').hide()
		$('.budgWar').eq(i+1).show();
		}
	})
	
	$('.cancelEdit').click(function(ev) {
		ev.preventDefault();
		$('form.forSub').addClass('edt')
	})
	

		$(".ctgr").click(function(ev) {
		ev.preventDefault();
		var cid = $(this);
		$("#ctgrID").val(cid.val());
		$("#one_level").text(cid.text());

	});
})