$(function() {
	function getRequestsParams() {
		var r = {}
		var s1 = location.search.substring(1).split('&')
		for (var i = 0; i < s1.length; i++) {
			var s2 = s1[i].split('=')
			r[decodeURIComponent(s2[0]).toLowerCase()] = decodeURIComponent(s2[1])
		}
		return r
	}

	function switchTab(idx, noAnim) {
		// Select the idx'th tab and add active class to the corresponding element

		if (noAnim)
			$('#inCon').addClass('noanim')

		var mr = -20 - $('#inCon > div').eq(0).outerWidth() * idx
		$('#inCon').css('margin-right', mr)
		$('.barItem').removeClass('active')
		$('.barItem').eq(idx).addClass('active')

		if (noAnim) {
			$('#inCon').height()
			$('#inCon').removeClass('noanim')
		}
	}

	function loadTab() {
		params = getRequestsParams()
		if ('tab' in params)
			switchTab(+params['tab'], true)
		else
			switchTab(0, true)
	}

	loadTab()

	$('#sidebar').on('click', '.barItem', function(ev) {
		ev.preventDefault()
		switchTab($(this).index())
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
		row.find(".nameEdit").focus()
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
		if (confirm('این تراکنش حذف شود؟')) {
			$(this).parent().parent().submit()
		}

	});
	$('.TranEdit').click(function(ev) {
		ev.preventDefault();
		$(this).parent().parent().parent().find('.TRedit').css('display', 'inherit');
	});
	$('.cancelEdit').click(function(ev) {
		ev.preventDefault();
		if ($(this).parent().hasClass("forSub")) {
			$(this).parent().addClass('edt')
		} else
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
		$(this).parent().find(".outcome").removeClass("selected")

	});
	$('.outcome').click(function(ev) {
		ev.preventDefault();
		$('.isIncome').val(0);
		$(this).addClass('selected')
		$(this).parent().find(".income").removeClass("selected")

	});
	$(".bnkacnt").click(function(ev) {
		ev.preventDefault();
		var baid = $(this);
		$("#bid_post").val(baid.val());
		$("#one_level").text(baid.text());

	});
	$(".BAEditItem").click(function(ev) {
		ev.preventDefault();
		$(this).parent().parent().find(".BAEdited").val($(this).val());
		$(this).parent().parent().parent().find("#one_level").text($(this).text());

	});

	$(".ctgr").click(function(ev) {
		ev.preventDefault();
		var cid = $(this);
		$("#ctgrID").val(cid.val());
		$("#two_level").text(cid.text());

	});
	$(".sbctgr").click(function(ev) {
		ev.preventDefault();
		var cid = $(this).parent().parent().parent().find(".ctgr");
		var sbcid = $(this);
		$("#sbctgrID").val(sbcid.val());
		$("#ctgrID").val(cid.val());
		$("#two_level").text(cid.text() + " - " + sbcid.text());

	});

	$(".ctgrE").click(function(ev) {
		ev.preventDefault();
		$(this).parent().parent().find(".catEdited").val($(this).val());
		$(this).parent().parent().parent().find("#two_level").text($(this).text());

	});
	$(".sbctgrE").click(function(ev) {
		ev.preventDefault();
		var cid = $(this).parent().parent().parent().find(".ctgrE");
		var sbcid = $(this);
		$(this).parent().parent().parent().parent().find(".catEdited").val(cid.val());
		$(this).parent().parent().parent().parent().find(".subCatEdited").val(sbcid.val());

		var tl = $(this).parent().parent().parent().parent().parent().find("#two_level");
		tl.text(cid.text() + " - " + sbcid.text());

	});

	$(".tozih").mouseover(function(ev) {

		ev.preventDefault();
		$(this).popover("show");

	});
	$(".tozih").mouseleave(function(ev) {

		ev.preventDefault();
		$(this).popover("toggle");

	});
	$('#addTran').submit(function(ev) {

		if ($(this).find("#ctgrID").val() == "") {
			$("#addTR-err").text("دسته را مشخص کنید.");
			$("#addTR-err").css("display", "block");
			return false;

		}
		if ($(this).find("#bid_post").val() == "") {
			$("#addTR-err").text("  حساب را مشخص کنید.");
			$("#addTR-err").css("display", "block");
			return false;

		}

	});
	$("#cal_date").focus(function() {

		new JsDatePick({
			useMode : 2,
			target : "cal_date",
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
	
		$("#auto_cal_date").focus(function() {

		new JsDatePick({
			useMode : 2,
			target : "auto_cal_date",
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
		$(".tranDateEdit").focus(function() {

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
			$(".auto_edit_cal").focus(function() {

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
});
