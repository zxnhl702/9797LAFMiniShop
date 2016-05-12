$(function() {

	// AREA CHART
	var area = new Morris.Area({
		element: 'revenue-chart',
		resize: true,
		data: [{
			y: '2011-01-02',
			item1: 50,
			item2: 200
		}, {
			y: '2011-01-03',
			item1: 20,
			item2: 35
		}, {
			y: '2011-01-04',
			item1: 31,
			item2: 32
		}, {
			y: '2011-01-05',
			item1: 5,
			item2: 65
		}, {
			y: '2011-01-06',
			item1: 65,
			item2: 32
		}, {
			y: '2011-01-07',
			item1: 123,
			item2: 321
		}, {
			y: '2011-01-08',
			item1: 78,
			item2: 564
		}, {
			y: '2011-01-09',
			item1: 34,
			item2: 902
		}, {
			y: '2011-01-10',
			item1: 13,
			item2: 321
		}, {
			y: '2011-01-11',
			item1: 42,
			item2: 721
		}],
		xkey: 'y',
		ykeys: ['item1', 'item2'],
		labels: ['成交量', '成交额'],
		lineColors: ['#a0d0e0', '#3c8dbc'],
		hideHover: 'auto'
	});

	// LINE CHART
	var line = new Morris.Line({
		element: 'line-chart',
		resize: true,
		data: [{
			y: '2011-01-02',
			item1: 2666
		}, {
			y: '2011-01-03',
			item1: 2778
		}, {
			y: '2011-01-04',
			item1: 4912
		}, {
			y: '2011-01-05',
			item1: 3767
		}, {
			y: '2011-01-06',
			item1: 6810
		}, {
			y: '2011-01-07',
			item1: 5670
		}, {
			y: '2011-01-08',
			item1: 4820
		}, {
			y: '2011-01-09',
			item1: 15073
		}, {
			y: '2011-01-10',
			item1: 10687
		}, {
			y: '2011-01-11',
			item1: 8432
		}],
		xkey: 'y',
		ykeys: ['item1'],
		labels: ['增加'],
		lineColors: ['#3c8dbc'],
		hideHover: 'auto'
	});

});