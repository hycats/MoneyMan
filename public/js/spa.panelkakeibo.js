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

        // 家計簿グリッド
        jqueryMap.$container.find('#kakeibo_tbl').handsontable({
            data: [['1', '2', '3', '4'], ['1', '2', '3', '4'], []],
            colHeaders: ['D1', 'D2', 'D3', 'D4'],
            rowHeaders: ['食費', '酒・たばこ', '生活用品'],
            rowHeaderWidth: 150,
            readOnly: true
        });

    }

    return { initModule: initModule };
}());
