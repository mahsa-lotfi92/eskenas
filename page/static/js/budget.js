$(function() {
	$('#addBudget .btn.btn-success').click(function(ev) {
		var row = $(this).parent()
		s = $('#budgetLimit').val()
		var k = 0
		for (var x = 0; x < s.length; x++) {
			if (s[x] >= '0' && s[x] <= '9') {
				k++;
			}
		}
		if ($("#budgetLimit").val() == "" || $("#budgetLimit").val() == 0) {
			ev.preventDefault()
			$('.budgWar').hide()
			$('.budgWar').text("مبلغ را وارد کنید.")
			$("#budgetLimit").addClass("shado")
			$('.budgWar').eq(0).show()
			return false

		}
		if (k != s.length || s.length == 0) {
			ev.preventDefault()
			$('.budgWar').hide()
			$('.budgWar').text("مبلغ را به عدد وارد کنید.")
			$("#budgetLimit").addClass("shado")
			$('.budgWar').eq(0).show()
			return false

		}
		if ($("#startDate").val() == "") {
			ev.preventDefault()
			$('.budgWar').hide()
			$('.budgWar').text("تاریخ شروع را مشخص کنید.")
			$("#budgetLimit").removeClass("shado")
			$("#startDate").addClass("shado")
			$('.budgWar').eq(0).show()
			return false

		}
		if ($("#endDate").val() == "") {
			ev.preventDefault()
			$('.budgWar').hide()
			$('.budgWar').text("تاریخ پایان را مشخص کنید.")
			$("#budgetLimit").removeClass("shado")
			$("#startDate").removeClass("shado")
			$("#endtDate").addClass("shado")
			$('.budgWar').eq(0).show()
			return false

		}

		var d1 = new Date($('#startDate').val());
		var d2 = new Date($('#endDate').val());

		if (d1 > d2) {
			ev.preventDefault()
			$('.budgWar').hide()
			$('.budgWar').text("تاریخ شروع از تاریخ پایان بزرگتر است.")
			$("#budgetLimit").removeClass("shado")
			$("#endDate").addClass("shado")
			$("#startDate").addClass("shado")
			$('.budgWar').eq(0).show()
			return false
		}

		if ($("#ctgrID").val() == "") {
			ev.preventDefault()
			$('.budgWar').hide()
			$("#startDate").removeClass("shado")
			$("#endDate").removeClass("shado")
			$('.budgWar').text("دسته را مشخص کنید.")
			$('.budgWar').eq(0).show()
			return false

		}

	})
	
	
	$('.edtSubmit').click(function(ev) {
		var row = $(this).parent()
		s = $('#pay').val()
		var k = 0
		for (var x = 0; x < s.length; x++) {
			if (s[x] >= '0' && s[x] <= '9') {
				k++;
			}
		}
		if ($("#pay").val() == "" || $("#pay").val() == 0) {
			ev.preventDefault()
			$('.budgWar-edit').hide()
			$('.budgWar-edit').text("مبلغ را وارد کنید.")
			$('.budgWar-edit').eq(0).show()
			return false

		}
		if (k != s.length || s.length == 0) {
			ev.preventDefault()
			$('.budgWar-edit').hide()
			$('.budgWar-edit').text("مبلغ را به عدد وارد کنید.")
			$('.budgWar-edit').eq(0).show()
			return false

		}

		var d1 = new Date($('.startMahya').val());
		var d2 = new Date($('.endMahya').val());

		if (d1 > d2) {
			ev.preventDefault()
			$('.budgWar-edit').hide()
			$('.budgWar-edit').text("تاریخ شروع از تاریخ پایان بزرگتر است.")
			$('.budgWar-edit').eq(0).show()
			return false
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
		row.find('#pay').focus()
	})

	$('.edtSubmit').click(function(ev) {
		var row = $(this).parent()
		var i = $(".edtSubmit").index(this);
		s = $('#pay').eq(i).val()
		console.log(s);
		var k = 0
		for (var x = 0; x < s.length; x++) {
			if (s[x] >= '0' && s[x] <= '9') {
				k++;
			}
		}
		if (k != s.length || s.length == 0) {
			ev.preventDefault()
			$('.budgWar').hide()
			$('.budgWar').eq(i + 1).show();
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
	$("#startDate").focus(function() {

		new JsDatePick({
			useMode : 2,
			target : "startDate",
			dateFormat : "%Y-%m-%d"
			/*selectedDate:{				This is an example of what the full configuration offers.
			 day:5,						For full documentation about these settings please see the full version of the code.
			 month:9,
			 year:2006
			 },
			 yearsRange:[1978,2020],
			 limitToToday:false,
			 cellColorScheme:"beige",
			 dateFormat:"%m-%d-%Y",
			 imgPath:"img/",
			 weekStartDay:5*/
		});
	});
	$("#endDate").focus(function() {

		new JsDatePick({
			useMode : 2,
			target : "endDate",
			dateFormat : "%Y-%m-%d"
			/*selectedDate:{				This is an example of what the full configuration offers.
			 day:5,						For full documentation about these settings please see the full version of the code.
			 month:9,
			 year:2006
			 },
			 yearsRange:[1978,2020],
			 limitToToday:false,
			 cellColorScheme:"beige",
			 dateFormat:"%m-%d-%Y",
			 imgPath:"img/",
			 weekStartDay:5*/
		});
	});
	$(".dateEdit").focus(function() {

		new JsDatePick({
			useMode : 2,
			target : this.id,
			dateFormat : "%Y-%m-%d"
			/*selectedDate:{				This is an example of what the full configuration offers.
			 day:5,						For full documentation about these settings please see the full version of the code.
			 month:9,
			 year:2006
			 },
			 yearsRange:[1978,2020],
			 limitToToday:false,
			 cellColorScheme:"beige",
			 dateFormat:"%m-%d-%Y",
			 imgPath:"img/",
			 weekStartDay:5*/
		});
	});
})