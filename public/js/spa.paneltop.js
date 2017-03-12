// spa.paneltop.js

spa.paneltop = (function () {
    'use strict';

    var configMap = {
        main_html: String()
        + '<div>'
        + '<button class="fontawesome bt" type="my-date" id="btn-l"><i class="fa fa-chevron-left"></i></button>'
        + '<input id="top_date" type="my-date" class="w2field dt" required>'
        + '<button class="fontawesome bt" type="my-date" id="btn-r"><i class="fa fa-chevron-right"></i></button>'
        + `<span class="today-label"> 今日:${(new Date()).toLocaleDateString('ja-JP', { year: "numeric", month: "2-digit", day: "2-digit" })}</span>`
        + ' <span class="account-label"><label>口座: </label><input id="top_accounts" type="list" class="w2field ac"></span>'
        + '</div>'
        + '<div id="top_layout" style="width:100%; height:100%;"></div>',

        settable_map: {
            accounts_model: true,
            expenseset_model: true
        },
        accounts_model: null,
        expenseset_model: null,

        layout_top: {
            name: 'layout_top',
            padding: 4,
            panels: [
                { type: 'main', content: 'main' },
                { type: 'right', size: '200px', content: 'right' }
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
                { field: 'expense', caption: '費目', size: '10%' },
                { field: 'breakdown', caption: '内訳', size: '10%' },
                { field: 'product', caption: '品名', size: '10%' },
                { field: 'check', caption: '済', editable: { type: 'checkbox' }, size: '30px' },
                { field: 'income', caption: '収入', render: 'int', editable: { type: 'int' }, size: '10%' },
                { field: 'outgo', caption: '支出', render: 'int', editable: { type: 'int' }, size: '10%' },
                { field: 'balance', caption: '残高', render: 'int', editable: { type: 'int' }, size: '10%' },
                { field: 'remark', caption: '備考', size: '30%' },
            ]
        },
        form: {
            header: '家計簿 入力',
            name: 'form_top',
            formHTML: '<div id="top_form">'
            + '<div class="w2ui-page page-0">'

            + '<div class="w2ui-field">'
            + '<label class="w2ui-field lbl">日付:</label>'
            + '<div class="w2ui-field ipt"><input name="top_form_date" class="w2ui-field dt"></div>'
            + '</div>'

            + '<div class="w2ui-field">'
            + '<label class="w2ui-field lbl">費目:</label>'
            + '<div class="w2ui-field ipt"><input name="top_form_expense" class="w2ui-field txt"></div>'
            + '</div>'

            + '<div class="w2ui-field" id="top_form_breakdown_id">'
            + '<label class="w2ui-field lbl">内訳:</label>'
            + '<div class="w2ui-field ipt"><input name="top_form_breakdown" class="w2ui-field txt"></div>'
            + '</div>'

            + '<div class="w2ui-field" id="top_form_accounts_id">'
            + '<label class="w2ui-field lbl">口座:</label>'
            + '<div class="w2ui-field ipt"><input name="top_form_accounts" class="w2ui-field txt"></div>'
            + '</div>'

            + '<div class="w2ui-field">'
            + '<label class="w2ui-field lbl">品名:</label>'
            + '<div class="w2ui-field ipt"><input name="top_form_product" class="w2ui-field txt"></div>'
            + '</div>'

            + '<div class="w2ui-field">'
            + '<label class="w2ui-field lbl">金額:</label>'
            + '<div class="w2ui-field ipt"><input name="top_form_money" class="w2ui-field num"></div>'
            + '</div>'

            + '</div>'
            + '<div class="w2ui-buttons">'
            + '<button class="w2ui-btn" name="save">入力</button>'
            + '</div>'

            + '</div>'
            + '</div>',

            fields: [
                { field: 'top_form_date', type: 'date', options: { format: 'yyyy/mm/dd' } },
                { field: 'top_form_expense', type: 'list' },
                { field: 'top_form_breakdown', type: 'list' },
                { field: 'top_form_accounts', type: 'list' },
                { field: 'top_form_product', type: 'list' },
                { field: 'top_form_money', type: 'int', required: true },
            ],
            focus: 9, // 1+2+2+2+2 ?
            actions: {
                save: function () {
                    if (this.validate().length == 0) {
                        console.log(this.record);
                    }
                }
            },
            onChange: function (event) {
                /* omComplete で処理しないと 内訳のDropListの変更の影響で費目の変更が効かなくなるらしい。 Validate が目的ではないのでこれでいいだろ */
                event.onComplete = function (event) {
                    if (event.target == 'top_form_date' && event.value_new != event.value_previous) {
                        updateDate(event.value_new);
                        //console.log(event.value_new);
                    }
                    else if (event.target == 'top_form_expense' && event.value_new.id != event.value_previous.id) {
                        stateMap.curexpense_id = event.value_new.id;
                        applyCurExpense();
                        //console.log(event.value_new.text);
                        this.refresh();
                    }
                    else if (event.target == 'top_form_breakdown' && event.value_new.id != event.value_previous.id) {
                        stateMap.curbreakdown_id = event.value_new.id;
                        applyCurBreakdown();
                        this.refresh();
                    }
                    else if (event.target == 'top_form_product' && event.value_new.id != event.value_previous.id) {
                        stateMap.curproduct_id = event.value_new.id;
                    }
                    else {
                        //console.log(event);
                    }
                }
            }
        }
    },

        stateMap = {
            $container: null,
            curdate: null,
            curacc_id: -1,  /* 選択中の口座ID */
            curexpense_id: -1,   /* 選択中の費目 */
            curbreakdown_id: -1,  /* 選択中の内訳 */
            curproduct_id: -1   /* 選択中の品名 */
        },
        jqueryMap = {},
        setJqueryMap, updateDate, applyCurdate, applyCurBreakdown, applyCurExpense, refresh,
        onAccountsChange,
        configModule, initModule;

    setJqueryMap = function () {
        var $container = stateMap.$container;
        jqueryMap = {
            $container: $container,
            $datepicker: $container.find('#top_date'),
            $accountsel: $container.find('#top_accounts'),
            $datebuttons: $container.find('button[type="my-date"]'),
            $layout: $container.find('#top_layout')
        };
    };

    updateDate = function (date_string) {
        /* curdate を日付文字列で設定する */
        var curdate = stateMap.curdate;
        curdate.setFullYear(date_string.substr(0, 4));
        curdate.setMonth(date_string.substr(5, 2) - 1, date_string.substr(8, 2));
        curdate.setHours(0, 0, 0, 0);
        applyCurdate();
    };

    applyCurdate = function (is_init) {
        /* curdate を変更したら view に反映するために呼ばれる */
        var now = stateMap.curdate.toLocaleDateString('ja-JP', { year: "numeric", month: "2-digit", day: "2-digit" });
        jqueryMap.$datepicker.val(now);
        w2ui.form_top.record['top_form_date'] = now;
        if (!is_init) { w2ui.form_top.refresh('top_form_date'); }
    };

    applyCurBreakdown = function () {
        /* curbreakdown_id を更新したら form の品名も入れ替える */
        var items = [],
            product_db = configMap.expenseset_model.get_product_db(stateMap.curexpense_id, stateMap.curbreakdown_id);
        if (product_db !== undefined && product_db !== null) {
            product_db().each(function (prd, idx) {
                items.push({ id: prd.id, text: ("00" + prd.id).substr(-2) + ':' + prd.name });
            });
            stateMap.curproduct_id = product_db().first.id;
            w2ui.form_top.set('top_form_product', { options: { items: items } });
            w2ui.form_top.record.top_form_product = items[0];
        }
        else {
            stateMap.curproduct_id = -1;
            w2ui.form_top.set('top_form_product', { options: { items: [] } });
            w2ui.form_top.record.top_form_product = null;
        }
    };

    applyCurExpense = function () {
        /* curexpense_id を変更したら form の内訳も入れ替える */
        var items = [],
            breakdown_db = configMap.expenseset_model.get_breakdown_db(stateMap.curexpense_id);
        //var expense_db = configMap.expenseset_model.get_expense_db();
        //var breakdown_db = expense_db({ id: stateMap.curexpense_id }).first().breakdown;
        if (breakdown_db !== undefined && breakdown_db !== null) {
            breakdown_db().each(function (exp, idx) {
                items.push({ id: exp.id, text: ("00" + exp.id).substr(-2) + ':' + exp.name });
            });
            stateMap.curbreakdown_id = breakdown_db().first().id;
            w2ui.form_top.set('top_form_breakdown', { options: { items: items } });
            w2ui.form_top.record.top_form_breakdown = items[0];
        }
        else {
            stateMap.curbreakdown_id = -1;
            w2ui.form_top.set('top_form_breakdown', { options: { items: [] } });
            w2ui.form_top.record.top_form_breakdown = null;
        }

        //TODO
        if (stateMap.curexpense_id == 17) {
            $('#top_form_breakdown_id').hide();
            $('#top_form_accounts_id').show();
        }

        /* curbreakdown_id も変わったので、品名も更新する */
        applyCurBreakdown();
    };

    refresh = function () {
        w2ui.layout_top.refresh();
    };

    /* 口座リストが変化した場合に呼ばれるべきハンドラ */
    onAccountsChange = function () {
        // 口座リストの取得
        var items = [];
        var accounts_db = configMap.accounts_model.get_db();
        accounts_db().each(function (acc, idx) {
            items.push({ id: acc.id, text: acc.name });
        });
        // DropList に口座リストを設定
        jqueryMap.$accountsel.data('w2field').options.items = items;
        // 選択中の口座を先頭の'現金'に設定
        stateMap.curacc_id = items[0].id;
        jqueryMap.$accountsel.data('selected', items[0]).data('w2field').refresh();
    };

    configModule = function (input_map) {
        spa.util.setConfigMap({
            input_map: input_map,
            settable_map: configMap.settable_map,
            config_map: configMap
        });
        return true;
    };

    initModule = function ($container) {
        stateMap.$container = $container;
        stateMap.curdate = new Date();
        stateMap.curdate.setHours(0, 0, 0, 0);
        $container.html(configMap.main_html);
        setJqueryMap();

        // 日付変更ボタン
        jqueryMap.$datebuttons.click(function (event) {
            var offset = (event.target.id === 'btn-l') ? -1 : 1;
            stateMap.curdate.setMonth(stateMap.curdate.getMonth() + offset);
            applyCurdate();
        });
        // Top グリッド
        jqueryMap.$layout.w2layout(configMap.layout_top);
        w2ui.layout_top.content('main', $().w2grid(configMap.grid_top));
        // Top form
        w2ui.layout_top.content('right', $('#top_form').w2form(configMap.form));
        //$('#top_form').hide();

        // 日付入力
        (function () {
            //var now = stateMap.curdate.toLocaleDateString('ja-JP', { year: "numeric", month: "2-digit", day: "2-digit" });
            jqueryMap.$datepicker.w2field('date', { format: 'yyyy/mm/dd' }).change(function (e) {
                updateDate($(this).val());
            });
            applyCurdate(true);
        }());

        // 口座選択
        (function () {
            jqueryMap.$accountsel.w2field('list').change(function (e) {
                stateMap.curacc_id = $(this).data('selected').id;
            });
            onAccountsChange();
        }());

        // 費目
        (function () {
            var items = [];
            var expense_db = configMap.expenseset_model.get_expense_db();
            expense_db().each(function (exp, idx) {
                items.push({ id: exp.id, text: ("00" + exp.id).substr(-2) + ':' + exp.name });
            });

            stateMap.curexpense_id = expense_db().first().id;

            w2ui.form_top.set('top_form_expense', { options: { items: items } });
            //w2ui.form_top.refresh('top_form_expense');

            //$('#top_form_accounts_id').hide(); /* このタイミングだと効かないっぽいので cssで消す */
            applyCurExpense();
        }());

        // イベント登録
        $.gevent.subscribe($container, 'spa-accountschange', onAccountsChange);
    };

    return {
        configModule: configModule,
        initModule: initModule,
        refresh: refresh
    };
}());
