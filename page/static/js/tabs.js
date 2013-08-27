(function() {
    var self = {}

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
        self.switched = true
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
        if (self.switched)
            return
		params = getRequestsParams()
		if ('tab' in params)
			switchTab(+params['tab'], true)
		else
			switchTab(0, true)
	}

    self.switchTab = switchTab
    self.loadTab = loadTab
    window.tabs = self
})()

$(function() {
    tabs.loadTab()

    $('#sidebar').on('click', '.barItem', function(ev) {
		ev.preventDefault()
		tabs.switchTab($(this).index())
	})
})