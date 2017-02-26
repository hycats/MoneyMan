// spa.paneltop.js

spa.paneltop = (function () {
    'use strict';

    var configMap = {
        main_html: String()
        + '<div>'
        + '<button class="fontawesome bt" type="my-date" id="btn-l"><i class="fa fa-chevron-left"></i></button>'
        + '<input id="top_date" type="my-date" class="w2field dt" required>'
        + '<button class="fontawesome bt" type="my-date" id="btn-r"><i class="fa fa-chevron-right"></i></button>'
        + '</div>'
        + '<div id="top_layout" style="width:100%; height:100%;"></div>',

        settable_map: {
            layout_top: {
                name: 'layout_top',
                padding: 4,
                panels: [
                    { type: 'main', content: 'main' },
                    { type: 'right', size: '20%', content: 'right' }
                ]
            },
            grid_top: {
                name: 'grid_top',
                header: 'List of Names',
                //multiSearch: true,
                show: {
                    toolbar: true,
                    footer: true,
                    toolbarReload: false,
                    toolbarColumns: false
                    //toolbarSearch: true
                },
                searches: [
                    { field: 'sdate', caption: 'date', type: 'date' }
                ],
                columns: [
                    { field: 'sdate', caption: '日付', size: '80px', render: 'date:yyyy/mm/dd', editable: { type: 'date' } },
                    { field: 'fname', caption: '費目', size: '10%' },
                    { field: 'lname', caption: '内訳', size: '10%' },
                    { field: 'product', caption: '品名', size: '10%' },
                    { field: 'check', caption: '済', editable: { type: 'checkbox' }, size: '30px' },
                    { field: 'income', caption: '収入', render: 'int', editable: { type: 'int' }, size: '10%' },
                    { field: 'outgo', caption: '支出', render: 'int', editable: { type: 'int' }, size: '10%' },
                    { field: 'balance', caption: '残高', render: 'int', editable: { type: 'int' }, size: '10%' },
                    { field: 'email', caption: '備考', size: '30%' },
                ],
                records: [
                    { recid: 1, sdate: "01/12/2017", fname: "Peter", lname: "Jeremia", income: 1000 },
                    { recid: 2, fname: "Bruce", lname: "Wilkerson" }
                ]
            }
        }
    },
        stateMap = {
            $container: null,
            curdate: null
        },
        jqueryMap = {},
        setJqueryMap, refresh, initModule;

    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $datepicker: $container.find('#top_date'),
            $datebuttons: $container.find('button[type="my-date"]'),
            $layout: $container.find('#top_layout')
        };
    };

    refresh = function () {
        w2ui.layout_top.refresh();
    };

    initModule = function ($container) {
        stateMap.$container = $container;
        stateMap.curdate = new Date();
        stateMap.curdate.setHours(0, 0, 0, 0);
        $container.html(configMap.main_html);
        setJqueryMap();

        // 日付入力
        (function () {
            var now = stateMap.curdate.toLocaleDateString('ja-JP', { year: "numeric", month: "2-digit", day: "2-digit" });
            jqueryMap.$datepicker.w2field('date', { format: 'yyyy/mm/dd' }).val(now).change(function (e) {
                var curdate = stateMap.curdate;
                curdate.setFullYear($(this).val().substr(0, 4));
                curdate.setMonth($(this).val().substr(5, 2) - 1, $(this).val().substr(8, 2));
                curdate.setHours(0, 0, 0, 0);
            });
        }());

        // 日付変更ボタン
        jqueryMap.$datebuttons.click(function (event) {
            var offset = (event.target.id === 'btn-l') ? -1 : 1;
            stateMap.curdate.setDate(stateMap.curdate.getDate() + offset);
            var now = stateMap.curdate.toLocaleDateString('ja-JP', { year: "numeric", month: "2-digit", day: "2-digit" });
            jqueryMap.$datepicker.val(now);
        });
        // Top グリッド
        jqueryMap.$layout.w2layout(configMap.settable_map.layout_top);
        w2ui.layout_top.content('main', $().w2grid(configMap.settable_map.grid_top));
    };

    return { initModule: initModule, refresh: refresh };
}());
