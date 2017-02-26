// spa.panelsetting.js

spa.panelsetting = (function () {
    'use strict';

    var configMap = {
        main_html: String() + '設定'
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
