
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

			                renderTo: 'container',

			                type: 'bar'

			            },

			            title: {

			                text: '',
							style:
		                    {
		                        direction: "rtl",
		                        fontSize: "16px"
		                    }
			            },

			            xAxis: {
			                categories: [],
							style:
		                    {
		                        direction: "rtl",
		                        fontSize: "16px"
		                    }
			            },

			            yAxis: {

			                min: 0,

			                title: {

			                    text: null,
								style:
			                    {
			                        direction: "rtl",
			                        fontSize: "16px"
			                    }
								

			                },
				                stackLabels: {
				                enabled: true,
				                style: {
				                    fontWeight: 'bold',
				                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray',
			                        direction: "rtl",
			                        fontSize: "16px"
				                }
				            }

			            },

			            legend: {
							align: 'right',
				            x: -100,
				            verticalAlign: 'top',
				            y: 20,
				            floating: true,
				            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
				            borderColor: '#CCC',
				            borderWidth: 1,
				            shadow: false,
									style:
				                    {
				                        direction: "rtl",
				                        fontSize: "16px"
				                    }

				            },
			            tooltip: {
			              formatter: function() {
			                return '<b>'+ this.x +'</b><br/>'+
			                    this.series.name +': '+ this.y +'<br/>'+
			                    'Total: '+ this.point.stackTotal ;
				            }
			            },

			            plotOptions: {

			                series: {

			                    stacking: 'normal',
			                    dataLabels: {
			                    enabled: true,
			                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
			               	 	},
								style:
			                    {
			                        direction: "rtl",
			                        fontSize: "16px"
			                    }
			                }

			            },
			            series: [{
			            }]
        });



   	 	$('#spending .chart-container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: null
        },
        tooltip: {
    	    pointFormat: '{series.name}: <b>{point.percentage}%</b>',
        	percentageDecimals: 1
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
                        return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                    },
					style:
                    {
                        direction: "rtl",
                        fontSize: "16px"
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['خوراک',   45.0],
                ['حمل و نقل',       26.8],
                {
                    name: 'سلامت',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['پوشاک',    8.5],
                ['بدون دسته',     6.9],
            ]
        }]
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
	window.report.core.initialize()
	
	
	$ ('#inCon').css('margin-right', -790 )
	$ ('.barItem').removeClass('active')
	$('#sidebar .barItem').eq(1).addClass('active')
	
	$('#sidebar .barItem').eq(0).click(function(ev) {
		ev.preventDefault()
		// 
		// $ ('#inCon').css('margin-right', -20 )
		// $ ('.barItem').removeClass('active')
		// $(this).addClass('active')
	})

	$('#sidebar .barItem').eq(1).click(function(ev) {
		ev.preventDefault()
		// 
		// $ ('#inCon').css('margin-right', -790 )
		// $ ('.barItem').removeClass('active')
		// $(this).addClass('active')
	})

	$('#sidebar .barItem').eq(2).click(function(ev) {
		ev.preventDefault()
		// 
		// $ ('#inCon').css('margin-right', -1545 )
		// $ ('.barItem').removeClass('active')
		// $(this).addClass('active')
	})
	
	$('#sidebar .barItem').eq(3).click(function(ev) {
		ev.preventDefault()
		// 
		// $ ('#inCon').css('margin-right', -2305 )
		// $ ('.barItem').removeClass('active')
		// $(this).addClass('active')
	})
	
	$('#refresh').click(function(ev){
		ev.preventDefault();
		//------------------
		window.report.core.refresh();
	})
	

})	

window.report.filter = (function (){

	return{
		
	}
})();

window.report.filter = (function () {
	//Private
	var sDate, eDate;
	
	return {
		//Public 
		initialize: function(){
			sDate = new Date()
			eDate = new Date()
		    with(sDate)
		    {
		      // setDate(1);
		      setMonth(getMonth()-1);
		    }
		},
		getStartDate: function(){
			return sDate.getTime() / 1000 ;
		},
		getEndDate: function(){
			return eDate.getTime() / 1000 ;
		}
	};
})();


window.report.core = (function () {
	//Private
	var filter 
	var chartData, sortable, total; 
	
	
	function beginLoading(){
		$("#report-loading").animate({opacity:1});
	}
	
	function stopLoading(){
		$("#report-loading").animate({opacity:0});	
	}
	
	function refresh(){
		beginLoading() ;
		//---------------
		var additionalData = {'startDate': filter.getStartDate(), 'endDate': filter.getEndDate(), 'isIncome': true, 'type': 'category'} ;
		//---------------
		$.post('/ajax/monthly_report/', additionalData, load);
	}
	
	function load(data){
		stopLoading();
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
			window.report.ui.loadChart(chartData) ;
			window.report.ui.loadDetail(sortable, total) ;
		}else{
			//TODO show error
			console.log(data);
		}
	}
	
	return {
		//Public 
		initialize: function(){
			filter = window.report.filter
			filter.initialize();	
		},
		set: function(input){
		},
		refresh: refresh
	};
})();

window.report.ui = (function () {
	//Private
	function loadDetail(data, total){
		for(var i = 0 ; i < 4 ; i++){
			if (i < data.length){
				$('.detail .tranRow').eq(i+1).find(' .tranCat').html(data[i][0]);
				$('.detail .tranRow').eq(i+1).find(' .tranPay').html(data[i][1]);				
			}else{
				$('.detail .tranRow').eq(i+1).find(' .tranCat').html('');
				$('.detail .tranRow').eq(i+1).find(' .tranPay').html('');				
			}
		}
		$('.detail .total').eq(0).html(total)
		$('.detail .total').eq(1).html(data[0][0])
	}
	
	function loadChart(data){
		var chart =  $('#income .chart-container').highcharts();
		//------------------------------------------------
	    while(chart.series.length > 0)
			chart.series[0].remove();
			
		var arr = [], category = [] 
		for(var cat in data){
			arr.push(data[cat]) 
			category.push(cat)
		}
		//------------------------------------------------	
		var  variable =   [{
		    type: 'column',
		    name: 'درآمد',
		    data: arr
		}]; 
		for(var i in variable) {
		    chart.addSeries(variable[i], false);
		}
		chart.xAxis[0].setCategories(category, false);
		chart.redraw(); 
	}
	
	return {
		//Public 
		loadChart: loadChart,
		loadDetail: loadDetail
	};
})();

