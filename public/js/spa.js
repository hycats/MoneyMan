
jQuery(function ($) {

    var scope = {};
    scope.curdate = new Date();
    scope.curdate.setHours(0, 0, 0, 0);
    console.log('now:' + scope.curdate);
    scope.config = {
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
                $('#tab-panel '+event.tab.my_tab_panel).show();
                w2ui.layout_top.refresh();
            }
        },
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
    };

    // タブ設定
    $('#tabs').w2tabs(scope.config.tabs);
    // 日付入力
    var input_date = $('#top_date');
    var now = scope.curdate.toLocaleDateString('ja-JP', { year: "numeric", month: "2-digit", day: "2-digit" });
    input_date.w2field('date', { format: 'yyyy/mm/dd' }).val(now).change(function (e) {
        scope.curdate.setFullYear($(this).val().substr(0, 4));
        scope.curdate.setMonth($(this).val().substr(5, 2) - 1, $(this).val().substr(8, 2));
        scope.curdate.setHours(0, 0, 0, 0);
    });
    // 日付変更ボタン
    $('button[type="my-date"]').click(function () {
        var offset = ($(this).attr('id') === 'btn-l') ? -1 : 1;
        scope.curdate.setDate(scope.curdate.getDate() + offset);
        var now = scope.curdate.toLocaleDateString('ja-JP', { year: "numeric", month: "2-digit", day: "2-digit" });
        $('#top_date').val(now);
    });
    // Top グリッド
    $('#top_layout').w2layout(scope.config.layout_top);
    w2ui.layout_top.content('main', $().w2grid(scope.config.grid_top));
    
    // 家計簿グリッド
    $('#kakeibo_tbl').handsontable({
        data: [  [ '1','2','3', '4'],[ '1','2','3', '4'],[]],
        colHeaders: [ 'D1', 'D2', 'D3', 'D4'],
        rowHeaders: [ '食費', '酒・たばこ', '生活用品'],
        rowHeaderWidth: 150,
        readOnly: true
    });

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
});
