// spa.panelkakeibo.js

spa.panelkakeibo = (function () {
    'use strict';

    var configMap = {
        main_html: String() + '<div id="kakeibo_tbl"></div>'
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
