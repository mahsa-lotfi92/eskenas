
window.report = {} ;



$(function () {
	
    	// Radialize the colors
		Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function(color) {
		    return {
		        radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
		        stops: [
		            [0, color],
		            [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
		        ]
		    };
		});
	
		// Build the chart
        $('#income .chart-container').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                percentageDecimals: 1,
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 2); +' %';
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 2) +' %';
                        },
                        style:
                        {
                            direction: "rtl",
                            fontSize: "16px"
                        }
                    }
                }
            }
        });



   	 	$('#spending .chart-container').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                percentageDecimals: 1,
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 2); +' %';
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 2) +' %';
                        },
                        style:
                        {
                            direction: "rtl",
                            fontSize: "16px"
                        }
                    }
                }
            }
        });




        $('#monthly .chart-container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: [
                    'فروردین',
                    'اردیبهشت',
                    'خرداد',
                    'تیر',
                    'مرداد',
                    'شهریور',
                    'مهر',
                    'آبان',
                    'آذر',
                    'دی',
                    'بهمن',
                    'اسفند'
                ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                },
				style:
                {
                    direction: "rtl",
                    fontSize: "16px"
                }
            },
            series: [{
                name: 'درآمد',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

            }, {
                name: 'هزینه',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

            }]
        });



    });


$(function () {
//	$ ('#inCon').css('margin-right', -790 )
//	$ ('.barItem').removeClass('active')
//	$('#sidebar .barItem').eq(1).addClass('active')
//	window.report.core.refresh();

	$('#sidebar .barItem').eq(0).click(function(ev) {
		ev.preventDefault()

		$ ('#inCon').css('margin-right', -20 )
		$ ('.barItem').removeClass('active')
		$(this).addClass('active')
	})

	$('#sidebar .barItem').eq(1).click(function(ev) {
		ev.preventDefault()
        window.report.core.initialize(1);
		$ ('#inCon').css('margin-right', -790 )
		$ ('.barItem').removeClass('active')
		$(this).addClass('active')
	})

	$('#sidebar .barItem').eq(2).click(function(ev) {
		ev.preventDefault()
		window.report.core.initialize(2);
		$ ('#inCon').css('margin-right', -1545 )
		$ ('.barItem').removeClass('active')
		$(this).addClass('active')
	})
	
	$('#sidebar .barItem').eq(3).click(function(ev) {
		ev.preventDefault()

		$ ('#inCon').css('margin-right', -2305 )
		$ ('.barItem').removeClass('active')
		$(this).addClass('active')
	})
	
	$('.refresh').click(function(ev){
		ev.preventDefault();
		//------------------
		window.report.core.refresh();
	})
	

})

window.report.filter = (function () {
	//Private
	var sDate, eDate, account, base, type;
	
	return {
		//Public 
		initialize: function(baseDiv){
            base = baseDiv ;
            //-------------------
			sDate = new Date()
            sDate.setDate(sDate.getDate() - 7)
			eDate = new Date()
            account = -1
            type = 'bar'
		},
		getStartDate: function(){
			return sDate.getTime() / 1000 ;
		},
		getEndDate: function(){
			return eDate.getTime() / 1000 ;
		},
        getAccount: function(){
            return account ;
        },
        setAccount: function(acc){
            account = acc ;
        },
        setTime: function(s, e){
            sDate = s ;
            eDate = e ;
        },
        setType: function(t){
            type = t ;
        },
        getType: function(){
            return type
        }
	};
})();

window.report.core = (function () {
	//Private
	var filter
	var chartData, sortable, total, isIncome;

	
	function refresh(){
		window.report.ui.beginLoading() ;
		//---------------
		var additionalData = {'startDate': filter.getStartDate(), 'endDate': filter.getEndDate(), 'account': filter.getAccount(), 'isIncome': isIncome, 'type': 'category'} ;
        console.log(additionalData);
		//---------------
		$.post('/ajax/monthly_report/', additionalData, load);
	}
	
	function load(data){
		window.report.ui.stopLoading();
		//---------------
		if (data.result == "OK"){
			//---------------
			chartData = data.data ;
			total = 0 ;
			sortable = [];
			
			console.log(chartData)
			
			for (var key in chartData) {
				sortable.push([key, chartData[key]])
				total += chartData[key]
			}
			sortable.sort(function(a, b) {return b[1] - a[1]})
			
			//---------------
			window.report.ui.loadChart(chartData, window.report.filter.getType(), (isIncome? 'درآمد' : 'هزینه') ) ;
			window.report.ui.loadDetail(sortable, total) ;
		}else{
			//TODO show error
			console.log(data);
		}
	}
	
	return {
		//Public 
		initialize: function(tabIndex){
            var base = null ;
            if (tabIndex == 1)
                base = $("#income")
            else
                base = $("#spending")
            //------------------
            window.report.ui.initialize(base, window.data.accounts);
			window.report.filter.initialize(base);
            filter = window.report.filter ;
            //------------------
            isIncome = (tabIndex == 1) ;
            refresh() ;
		},
		set: function(input){
		},
		refresh: refresh,
        addAccount: function addAccount(id, name){
            console.log(id + " " + name);
        }
	};
})();

window.report.ui = (function () {
    var base ;
	//Private
	function loadDetail(data, total){
		for(var i = 0 ; i < 4 ; i++){
			if (i < data.length){
				base.find('.detail .tranRow').eq(i+1).find(' .tranCat').html(data[i][0]);
				base.find('.detail .tranRow').eq(i+1).find(' .tranPay').html(data[i][1]);
			}else{
				base.find('.detail .tranRow').eq(i+1).find(' .tranCat').html('');
				base.find('.detail .tranRow').eq(i+1).find(' .tranPay').html('');
			}
		}
		base.find('.detail .total').eq(0).html(total)
		base.find('.detail .total').eq(1).html(data[0][0])
	}
	
	function loadChart(data, type, name){
        console.log('type is : ' + type)
		var chart =  base.find('.chart-container').highcharts();
		//------------------------------------------------
	    while(chart.series.length > 0)
			chart.series[0].remove();
			
		var arr = [], category = [] 
		for(var cat in data){
			arr.push([cat, data[cat]])
			category.push(cat)
		}
		//------------------------------------------------	
		var  variable =   [{
		    type: type,
		    name: name,
		    data: arr
		}]; 
		for(var i in variable) {
            console.log(variable[i])
		    chart.addSeries(variable[i], false);
		}

//		chart.xAxis[0].setCategories(category, false);

		chart.redraw(); 
	}

    function setAccount(accounts){
        var list = base.find('.filter .account .dropdown-menu')
        list.html('')

        var tmp = $("<li><a href=\"#\"><span class=\"name\"> </span> <span class=\"bank\"> </span></a></li>")

        var item = tmp.clone() ;
        item.find(".name").html('تمام حساب‌ها');
        item.data('id', -1).data('name', 'تمام حساب‌ها') ;
        item.appendTo(list)
        $('<li class=\"divider\"></li>').appendTo(list);

        for (var key in accounts) {
            var item = tmp.clone() ;
            item.find(".name").html(accounts[key])
            item.data('id', key).data('name', accounts[key]) ;
            item.appendTo(list) ;
        }

        $('.filter .account .dropdown-menu li').click(function(event){
            window.report.filter.setAccount($(this).data('id'));
            base.find('.filter .account .btn').html($(this).data('name') + '<span class=\"caret\"></span></button>');
            event.preventDefault() ;
        });
    }

    function getBefore(y, m, d){
        var ret = new Date();

        with(ret)
        {
            ret.setDate(ret.getDate()-d);
            setMonth(getMonth()-m);
            setYear(getFullYear()-y);
        }
        return ret;
    }

    function setTime(){

        var times = [] ;
        times[0] = {'eDate' : getBefore(0, 0, 0), 'sDate' : getBefore(0, 0, 7), 'name' : 'هفته‌ گذشته'};
        times[1] = {'eDate' : getBefore(0, 0, 0), 'sDate' : getBefore(0, 1, 0), 'name' : 'ماه‌ گذشته'};
        times[2] = {'eDate' : getBefore(0, 0, 0), 'sDate' : getBefore(1, 0, 0), 'name' : 'سال گذشته'};
        times[3] = {'eDate' : getBefore(0, 0, 0), 'sDate' : getBefore(100, 0, 0), 'name' : 'تمام ادوار'};
        times[4] = {'eDate' : null, 'sDate' : null, 'name': 'بازه‌ دلخواه'};

        var list = base.find('.filter .time .dropdown-menu')
        list.html('')

        var tmp = $("<li><a href=\"#\"> </a></li>")
        for (var i = 0; i < times.length ; i++) {
            var item = tmp.clone() ;
            item.find("a").html(times[i].name)
            item.data('date', times[i])
            item.appendTo(list) ;
        }

        $('.filter .time .dropdown-menu li:not(:last-child)').click(function(event){
            var dict = $(this).data('date') ;
            window.report.filter.setTime(dict['sDate'], dict['eDate']);
            base.find('.filter .time .btn').html(dict['name'] + '<span class=\"caret\"></span></button>');
            event.preventDefault() ;
        });
    }

    function setType(){
        base.find('.type .btn').eq(0).data('type', 'pie') ;
        base.find('.type .btn').eq(1).data('type', 'bar') ;
        //-----------
        base.find('.type .btn').click(function(event){
            base.find('.criteria.type .btn').addClass('inactive').removeClass('active') ;
            $(this).addClass('active').removeClass('inactive');
            window.report.filter.setType($(this).data('type'));
            event.preventDefault() ;
        });
    }
	
	return {
		//Public
        initialize: function(baseDiv, accounts){
            base = baseDiv ;
            setAccount(accounts) ;
            setTime() ;
            setType() ;
        },
		loadChart: loadChart,
		loadDetail: loadDetail,
        beginLoading: function (){
            $("#report-loading").animate({opacity:1});
        },
        stopLoading: function (){
            $("#report-loading").animate({opacity:0});
        }
	};
})();

