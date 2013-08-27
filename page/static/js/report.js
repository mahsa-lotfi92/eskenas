
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
        $('#general .chart-container').highcharts({
            chart: {
                type: 'column',
                width: 350,
                height: 350,
                borderColor: '#ccc',
                borderWidth: 1
            },
            title: {
                text: 'وضعیت مالی',
                style: {
                    fontSize: '20px'
                }
            },
            subtitle: {
                text: 'مجموع درآمد و هزینه کلی شما'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                percentageDecimals: 1,
                useHTML: true,
                formatter: function() {
                    var ret = this.key + ': <b>' + Highcharts.numberFormat(this.y, 0) + '</b>'
                    return ret
                },
                style: {
                    direction: 'rtl',
                    fontSize: '12px'
                }
            },
            plotOptions: {
                series: {
                    colorByPoint: true,
                    cursor: 'cursor',
                    borderRadiusTopLeft: 10,
                    borderRadiusTopRight: 10
                },
                style:
                {
                    direction: "rtl",
                    fontSize: "16px"
                }
            },
            xAxis: {
                categories: [
                    'درآمد',
                    'هزینه'
                ],
                labels: {
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            series: [{
                data: [window.data.total['درآمد'], window.data.total['هزینه']],
                showInLegend: false
            }],
            colors: [
                'green',
                'red'
            ]
        });

        $('#income .chart-container').highcharts({ });

   	 	$('#spending .chart-container').highcharts({ });

        $('#monthly .chart-container').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'گزارش زمانی',
                style: {
                    fontSize: '20px'
                }
            },
            subtitle: {
                text: 'درآمد و هزینه به تفکیک زمانی'
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            legend: {
                useHTML: true,
                style: {
                    direction: 'rtl'
                }
            },
            yAxis: {
                title: {
                    text: null
                }
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
            }
        });



        $('#general .boxes .current .value').eq(0).html(window.helper.format_with_tousand_seperator(window.data.current['درآمد'])+' تومان')
        $('#general .boxes .current .value').eq(1).html(window.helper.format_with_tousand_seperator(window.data.current['هزینه'])+' تومان')

        $('#general .boxes .average .value').eq(0).html(window.helper.format_with_tousand_seperator(window.data.avg['درآمد'])+' تومان')
        $('#general .boxes .average .value').eq(1).html(window.helper.format_with_tousand_seperator(window.data.avg['هزینه'])+' تومان')
    });


$(function () {
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
        window.report.core.initialize(3);
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
	var chartData, sortable, total, tabIndex;
    var title = ['', 'درآمد', 'هزینه', 'زمانی']

    function loadTrans(data){
        console.log('salam')
        console.log(data)
    }

	function refresh(){
        var tmp = {'startDate': filter.getStartDate(), 'endDate': filter.getEndDate(), 'account': filter.getAccount(), 'isIncome': tabIndex==1, 'category': 1} ;
        console.log(tmp);
		//---------------
		$.post('/ajax/transaction_report/', tmp, loadTrans);

        window.report.ui.beginLoading() ;
		//---------------
		var additionalData = {'startDate': filter.getStartDate(), 'endDate': filter.getEndDate(), 'account': filter.getAccount(), 'isIncome': tabIndex==1, 'type': (tabIndex==3?'time':'category')} ;
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
			window.report.ui.loadChart(chartData, window.report.filter.getType(), title[tabIndex], tabIndex) ;
			window.report.ui.loadDetail(sortable, total, tabIndex) ;
		}else{
			//TODO show error
			console.log(data);
		}
	}
	
	return {
		//Public 
		initialize: function(tabindex){


            tabIndex = tabindex ;
            //--------------------
            var base = null ;
            if (tabIndex == 1)
                base = $("#income")
            else if (tabIndex == 2)
                base = $("#spending")
            else if (tabIndex == 3)
                base = $("#monthly")

            //------------------
            window.report.ui.initialize(base, window.data.accounts);
			window.report.filter.initialize(base);


            base.find('.filter .account button').html('تمام حساب‌ها'+'<span class=\"caret\"></span>')
            base.find('.filter .criteria.time button').html('هفته گذشته'+'<span class=\"caret\"></span>')
            base.find('.filter .criteria .pie').addClass('inactive').removeClass('active')
            base.find('.filter .criteria .bar').removeClass('inactive').addClass('active')

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
	function loadDetail(data, total, tabIndex){
        if (tabIndex == 3){
            total = {}
            for(var key = 0 ; key < 2 ; key++){
                total[key] = 0 ;
                for(var time in data[key][1]){
                    total[key] += data[key][1][time] ;
                }
                base.find('.detail .tranRow').eq(key+1).find(' .tranCat').html('مجموع ' + data[key][0]);
                base.find('.detail .tranRow').eq(key+1).find(' .tranPay').html(window.helper.format_with_tousand_seperator(total[key]));
            }
            base.find('.detail .total').eq(0).html(window.helper.format_with_tousand_seperator(total[1] - total[0])+' تومان')
        }else{
            for(var i = 0 ; i < 4 ; i++){
                if (i < data.length){
                    base.find('.detail .tranRow').eq(i+1).find(' .tranCat').html(data[i][0]);
                    base.find('.detail .tranRow').eq(i+1).find(' .tranPay').html(window.helper.format_with_tousand_seperator(data[i][1]));
                }else{
                    base.find('.detail .tranRow').eq(i+1).find(' .tranCat').html('');
                    base.find('.detail .tranRow').eq(i+1).find(' .tranPay').html('');
                }
            }
            var m = window.helper.format_with_tousand_seperator(total)
            console.log(m)
            console.log(total)
            base.find('.detail .total').eq(0).html(m + ' تومان')
            if (data.length > 0){
                base.find('.detai   l .total').eq(1).html('- ' + data[0][0])
            }

        }
	}
	
	function loadChart(data, type, name, tabIndex){
		var chart =  base.find('.chart-container').highcharts();
		//------------------------------------------------
        if (tabIndex == 3){
            type = 'bar' ;
        }

	    while(chart.series.length > 0)
			chart.series[0].remove();
			
		var arr = [], category = []
        if (tabIndex != 3){
            for(var cat in data){
                arr.push([cat, data[cat]])
                category.push(cat)
            }
            console.log(type);
            var  variable =   [{
                type: type,
                name: name,
                data: arr,
                showInLegend: false
            }];


            chart.destroy();

            base.find('.chart-container').each(function(){
                var chartOptions = {
                    chart: {
                        renderTo: this,
                        type: 'bar'
                    },
                    title: {
                        text: name,
                        style: {
                            fontSize: '20px'
                        }
                    },
                    subtitle: {
                        text: 'به تفکیک دسته بندی'
                    },
                    xAxis: {
                        categories: category,
                        labels: {
                            useHTML: true,
                            style: {
                                color: '#444',
                                direction: 'rtl'
                            }
                        }
                    },
                    yAxis: {
                        title: null
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage}%</b>',
                        percentageDecimals: 1,
                        useHTML: true,
                        formatter: function() {
                            var ret = this.point.name + ': <b>' + Highcharts.numberFormat(this.y, 0) + '</b>'
                            return ret
                        },
                        style: {
                            direction: 'rtl',
                            fontSize: '12px'
                        }
                    },
                    plotOptions: {
                        series: {
                            cursor: 'cursor',
                            borderRadiusTopLeft: 10,
                            borderRadiusTopRight: 10
                        },
                        pie: {
                            allowPointSelect: true,
                            cursor: 'cursor',
                            dataLabels: {
                                useHTML: true,
                                enabled: true,
                                color: '#000000',
                                connectorColor: '#000000',
                                formatter: function() {
                                    return this.point.name +': <b>'+ Highcharts.numberFormat(this.percentage, 1) +'%<b>';
                                },
                                style:
                                {
                                    direction: "rtl"
                                }
                            }
                        }
                    }
                };
                chart = new Highcharts.Chart(chartOptions);
            });

            for(var i in variable) {
                console.log(variable[i])
                chart.addSeries(variable[i], false);
            }
        }else{
            for(var up  in data){
                arr = [], category = [], tmpDates = []

                for(var cat in data[up]){
                    tmpDates.push(cat)
                }
                 //---------------------------------

                tmpDates.sort(function(a, b) {return a - b})
                for(var i = 0; i < tmpDates.length ; i++){
                    var cat = tmpDates[i]
                    var d = new Date(Math.floor(cat))
                    var curr_date = d.getDate();
                    var curr_month = d.getMonth() + 1; //Months are zero based
                    var curr_year = d.getFullYear();
                    //-------------------------------------------------
                    var tmp = curr_date + "-" + curr_month + "-" + curr_year
                    if (Object.keys(data[up]).length > 10)
                        tmp = curr_date
                    category.push(tmp);
                    //----------------------------------------------
                    var tmp2 = curr_date + "-" + curr_month + "-" + curr_year
                    arr.push([tmp2, data[up][cat]])
                }
                 //---------------------------------
                var  variable =   [{
                    type: type,
                    name: up,
                    data: arr
                }];

                for(var i in variable) {
                    console.log(variable[i])
                    chart.addSeries(variable[i], false);
                }
            }
            chart.xAxis[0].setCategories(category, false);
        }
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
        times[2] = {'eDate' : getBefore(0, 0, 0), 'sDate' : getBefore(0, 6, 0), 'name' : '۶ ماه‌ گذشته'};
        times[3] = {'eDate' : getBefore(0, 0, 0), 'sDate' : getBefore(1, 0, 0), 'name' : 'سال گذشته'};
        times[4] = {'eDate' : getBefore(0, 0, 0), 'sDate' : getBefore(10, 0, 0), 'name' : 'تمام ادوار'};


        var list = base.find('.filter .time .dropdown-menu')
        list.html('')

        var tmp = $("<li><a href=\"#\"> </a></li>")
        for (var i = 0; i < times.length ; i++) {
            var item = tmp.clone() ;
            item.find("a").html(times[i].name)
            item.data('date', times[i])
            item.appendTo(list) ;
        }

        $('.filter .time .dropdown-menu li').click(function(event){
            var dict = $(this).data('date') ;
            window.report.filter.setTime(dict['sDate'], dict['eDate']);
            base.find('.filter .time .btn').html(dict['name'] + '<span class=\"caret\"></span></button>');
            event.preventDefault() ;
        });
    }

    function setType(){
        base.find('.type .pie').data('type', 'pie') ;
        base.find('.type .bar').data('type', 'bar') ;
        //-----------
        base.find('.type .chart-type').click(function(event){
            base.find('.criteria.type .chart-type').removeClass('active') ;
            $(this).addClass('active');
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







/**
 * Highcharts plugin for creating individual rounded borders.
 *
 * Author: Torstein Hønsi
 * Last revision: 2013-05-06
 * License: MIT License
 *
 * Known issues:
 * - Animation isn't working. To overcome that, create a method on the Renderer which points
 *   to a symbol definition, like it is currently done with "arc" in PieSeries.
 * - Dom exception on showing/hiding the series
 */
(function (H) {
    H.wrap(H.seriesTypes.column.prototype, 'translate', function (proceed) {
        var options = this.options,
            rTopLeft = options.borderRadiusTopLeft || 0,
            rTopRight = options.borderRadiusTopRight || 0,
            rBottomRight = options.borderRadiusBottomRight || 0,
            rBottomLeft = options.borderRadiusBottomLeft || 0;

        proceed.call(this);

        if (rTopLeft || rTopRight || rBottomRight || rBottomLeft) {
            H.each(this.points, function (point) {
                var shapeArgs = point.shapeArgs,
                    w = shapeArgs.width,
                    h = shapeArgs.height,
                    x = shapeArgs.x,
                    y = shapeArgs.y;
                point.shapeType = 'path';
                point.shapeArgs = [
                    'M', x + rTopLeft, y,
                    // top side
                    'L', x + w - rTopRight, y,
                    // top right corner
                    'C', x + w - rTopRight / 2, y, x + w, y + rTopRight / 2, x + w, y + rTopRight,
                    // right side
                    'L', x + w, y + h - rBottomRight,
                    // bottom right corner
                    'C', x + w, y + h - rBottomRight / 2, x + w - rBottomRight / 2, y + h, x + w - rBottomRight, y + h,
                    // bottom side
                    'L', x + rBottomLeft, y + h,
                    // bottom left corner
                    'C', x + rBottomLeft / 2, y + h, x, y + h - rBottomLeft / 2, x, y + h - rBottomLeft,
                    // left side
                    'L', x, y + rTopLeft,
                    // top left corner
                    'C', x, y + rTopLeft / 2, x + rTopLeft / 2, y, x + rTopLeft, y,
                    'Z'
                ];

            });
        }
    });
}(Highcharts));
// End of plugin



