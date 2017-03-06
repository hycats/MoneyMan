// spa.shell.js

spa.shell = (function () {
    'use strict';

    var configMap = {
        main_html: String()
        + '<div id="tabs"></div>'
        + '<div id="tab-panel" style="width:100%; height:calc(100% - 80px);">'
            + '<div id="tab-panel-top" class="tab_panel show"></div>'
            + '<div id="tab-panel-kakeibo" class="tab_panel hide"></div>'
            + '<div id="tab-panel-graph" class="tab_panel hide"></div>'
            + '<div id="tab-panel-setting" class="tab_panel hide"></div>'
        + '</div>',

        settable_map: {
            tabs: {
                name: 'tabs',
                active: 'tab_top',
                tabs: [
                    { id: 'tab_top', text: '<i class="fa fa-home fa-lg"></i>', my_tab_panel: '#tab-panel-top' },
                    { id: 'tab_kakeibo', text: '<i class="fa fa-table fa-lg"></i>', my_tab_panel: '#tab-panel-kakeibo' },
                    { id: 'tab_graph', text: '<i class="fa fa-line-chart fa-lg"></i>', my_tab_panel: '#tab-panel-graph' },
                    { id: 'tab_setting', text: '<i class="fa fa-cog fa-fw fa-lg"></i>', my_tab_panel: '#tab-panel-setting' }
                ],
                onClick: function (event) {
                    //console.log(`ok ${event.target}`);
                    $('#tab-panel .tab_panel').hide();
                    $(event.tab.my_tab_panel).show();
                    if (event.tab.my_tab_panel == '#tab-panel-top') { spa.paneltop.refresh(); }
                }
            }
        }
    },
        stateMap = { $container: null },
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

        jqueryMap.$container.find('#tabs').w2tabs(configMap.settable_map.tabs);

        spa.paneltop.configModule({});
        spa.paneltop.initModule(jqueryMap.$container.find('#tab-panel-top'));
        spa.panelkakeibo.initModule(jqueryMap.$container.find('#tab-panel-kakeibo'));
        spa.panelgraph.initModule(jqueryMap.$container.find('#tab-panel-graph'));
        spa.panelsetting.initModule(jqueryMap.$container.find('#tab-panel-setting'));
    };

    return { initModule: initModule };
}());

