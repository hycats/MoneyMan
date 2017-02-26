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
    }
    
    return { initModule: initModule };
}());
