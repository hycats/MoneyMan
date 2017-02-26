// spa.panelgraph.js

spa.panelgraph = (function () {
    'use strict';

    var configMap = {
        main_html: String() + '<div id="chartdiv" style="width:100%; height:100%;"></div>'
    },
        stateMap = {
            $container: null
        },
        jqueryMap = {},
        setJqueryMap, initModule;

    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = { $container: $container };
    };

    initModule = function ($container) {
        stateMap.$container = $container;
        $container.html(configMap.main_html);
        setJqueryMap();

        // チャート
        AmCharts.makeChart("chartdiv", {
            type: 'serial',
            dataProvider: [
                { year: 2013, income: 500000, outgo: 450000 },
                { year: 2014, income: 320000, outgo: 680000 },
                { year: 2015, income: 660000, outgo: 720000 },
                { year: 2016, income: 120000, outgo: 345000 },
                { year: 2017, income: 800000, outgo: 450000 },
            ],
            categoryField: 'year',
            categoryAxis: {
                gridPosition: 'start'
            },
            valueAxes: [{
                minimum: 0
            }],
            graphs: [
                { valueField: 'income', type: 'column', fillAlphas: 0.8, balloonText: '[[category]]: <b>[[value]]</b>' },
                { valueField: 'outgo', type: 'column', fillAlphas: 0.8, balloonText: '[[category]]: <b>[[value]]</b>' }
            ],
            angle: 30,
            depth3D: 15
        });

    }

    return { initModule: initModule };
}());
