// spa.model.js

spa.model = (function () {
    'use strict';

    var configMap = {
        products: [ /* プリセットの品名 */
            { exp_id: 20, brk_id: 0, items: ["残高調整"] },
            { exp_id: 80, brk_id: 0, items: ["給与"] },
            { exp_id: 81, brk_id: 0, items: ["賞与"] }
        ],
        breakdowns: [   /* プリセットの内訳 */
            { id: 0, items: [] },
            { id: 1, items: ["発泡酒", "ビール", "ワイン", "日本酒", "焼酎", "薬用酒", "たばこ", "ウィスキー"] },
            { id: 2, items: ["雑貨・消耗品", "電化・消耗品", "食器", "調理器具", "化粧品", "小物家具", "ペット関係"] },
            { id: 3, items: ["衣類", "下着・靴下", "クリーニング", "寝具", "装身具", "履物", "帽子", "雨具", "糸・針・布", "バッグ類"] },
            { id: 4, items: [] },
            {
                id: 5, items: [
                    "映画・コンサート", "教養娯楽用品", "写真・現像", "書籍・雑誌", "新聞代", "旅行代", "レンタルビデオ", "DVD、ビデオ",
                    "デスクトップPC", "ノートPC", "ブリンター", "スキャナー", "デジカメ", "PC消耗品", "スポーツ", "レジャー", "資格関係", "習い事"
                ]
            },
            { id: 6, items: [] },
            { id: 7, items: ["電車", "タクシー", "飛行機"] },
            { id: 8, items: ["冠婚葬祭", "贈答品", "デート"] },
            { id: 9, items: ["生命保険", "傷害保険", "損害保険", "火災保険", "個人年金"] },
            { id: 10, items: ["健康保険", "雇用保険", "国民年金"] },
            { id: 11, items: ["家賃", "住宅ローン", "地代", "住居維持費", "ごみ処分料", "電化製品", "家具", "リフォーム費", "リフォームローン"] },
            { id: 12, items: ["上下水道代", "ガス代", "電気料金"] },
            { id: 13, items: ["電話代", "TV受信料", "ケーブルTV", "プロバイダ料", "はがき・切手", "携帯電話", "宅急便"] },
            { id: 14, items: ["医薬品", "治療費"] },
            { id: 15, items: ["消費税", "所得税", "住民税", "固定資産税", "都市計画税"] },
            { id: 16, items: ["美容室", "美容用品"] },
            { id: 17, items: [] },
            { id: 18, items: [] },
            { id: 19, items: [] },
            { id: 20, items: ["残高調整"] },
            { id: 80, items: ["給与"] },
            { id: 81, items: ["賞与"] },
            { id: 82, items: [] },
            { id: 83, items: [] },
            { id: 84, items: [] }
        ]
    },
        stateMap = {
            //account_id: 0,
            account_db: TAFFY([{    /* プリセットの口座は現金だけ */
                "id": 0, name: "現金", "type": -1
            }]),
            expense_db: TAFFY([ /* 費目リスト */
                { id: 0, name: "食費", inout: -1, breakdown: null },
                { id: 1, name: "酒・たばこ", inout: -1, breakdown: null },
                { id: 2, name: "生活用品", inout: -1, breakdown: null },
                { id: 3, name: "衣類", inout: -1, breakdown: null },
                { id: 4, name: "教育・育児", inout: -1, breakdown: null },
                { id: 5, name: "教養娯楽", inout: -1, breakdown: null },
                { id: 6, name: "車関係", inout: -1, breakdown: null },
                { id: 7, name: "交通費", inout: -1, breakdown: null },
                { id: 8, name: "交際費", inout: -1, breakdown: null },
                { id: 9, name: "保険", inout: -1, breakdown: null },
                { id: 10, name: "社会保険", inout: -1, breakdown: null },
                { id: 11, name: "住居費", inout: -1, breakdown: null },
                { id: 12, name: "水道光熱", inout: -1, breakdown: null },
                { id: 13, name: "通信費", inout: -1, breakdown: null },
                { id: 14, name: "医療", inout: -1, breakdown: null },
                { id: 15, name: "税金", inout: -1, breakdown: null },
                { id: 16, name: "雑費", inout: -1, breakdown: null },
                { id: 17, name: "出金", inout: -1, name2: "口座預入", breakdown: null },
                { id: 18, name: "その他支出", inout: -1, editable: true, breakdown: null },
                { id: 19, name: "雑所得支出", inout: -1, editable: true, breakdown: null },
                { id: 20, name: "残高調整", inout: 0, breakdown: null },
                { id: 80, name: "給与", inout: 1, breakdown: null },
                { id: 81, name: "賞与", inout: 1, breakdown: null },
                { id: 82, name: "入金", inout: 1, name2: "口座引出", breakdown: null },
                { id: 83, name: "雑所得収入", inout: 1, editable: true, breakdown: null },
                { id: 84, name: "その他収入", inout: 1, editable: true, breakdown: null }
            ]),
            ledger_db: TAFFY()
        },
        isFakeData = true,
        makeProducts, makeExpenseSetDefault,
        accountProto, makeAccount, entryProto, makeEntry,
        accounts, expenseset, ledger,
        initModule;

    makeProducts = function (expense_id, breakdown_id, products) {
        /* 品名dbを作る */
        var items = [],
            p = products({ exp_id: expense_id, brk_id: breakdown_id }).first();
        if (p) {
            for (var i = 0, l = p.items.length; i < l; ++i) {
                items.push({ id: i, name: p.items[i] });
            }
        }
        items.push({ id: 99, name: "その他" });
        return TAFFY(items);
    };

    makeExpenseSetDefault = function () {
        var expense_db = stateMap.expense_db,
            products = TAFFY(configMap.products),
            breakdowns = TAFFY(configMap.breakdowns),
            items, item_array;
        /* デフォルトの内訳項目を作る */
        breakdowns().each(function (brkdwn, idx) {
            items = [];
            item_array = brkdwn.items;
            if (item_array !== undefined) {
                for (var i = 0, l = item_array.length; i < l; ++i) {
                    items.push({ id: i, name: item_array[i], product: makeProducts(brkdwn.id, i, products) });
                }
            }
            items.push({ id: 99, name: "その他", product: makeProducts(brkdwn.id, 99, products) });
            stateMap.expense_db({ id: brkdwn.id }).first().breakdown = TAFFY(items);
        });
    };

    accountProto = {
    };

    makeAccount = function (account_map) {
        var acc;

        acc = Object.create(accountProto);
        acc.id = account_map.id;
        acc.name = account_map.name;
        acc.type = account_map.type;

        stateMap.account_db.insert(acc);
        return acc;
    };

    entryProto = {

    };

    makeEntry = function (entry_map) {
        var entry;

        entry = Object.create(entryProto);
        entry.recid = entry_map.recid;
        entry.sdate = entry_map.sdate;
        entry.expense = entry_map.expense;
        entry.breakdown = entry_map.breakdown;
        entry.product = entry_map.product;
        entry.check = entry_map.check;
        entry.income = entry_map.income;
        entry.outgo = entry_map.outgo;
        entry.remark = entry_map.remark;

        stateMap.ledger_db.insert(entry);
        return entry;
    };

    accounts = {
        get_db: function () { return stateMap.account_db; }
    };

    expenseset = {
        get_expense_db: function () { return stateMap.expense_db; },
        get_breakdown_db: function (expense_id) { return stateMap.expense_db({ id: expense_id }).first().breakdown; },
        is_accounts_enable: function (expense_id) {
            return stateMap.expense_db({ id: expense_id }).first().name2 !== undefined;
        },
        get_product_db: function (expense_id, breakdown_id) {
            if (expense_id < 0 || breakdown_id < 0) return null;
            if (this.is_accounts_enable(expense_id)) {
                return stateMap.expense_db({ id: expense_id }).first().breakdown().first().product;
            }
            else {
                return stateMap.expense_db({ id: expense_id }).first().breakdown({ id: breakdown_id }).first().product;
            }
        }
    }

    ledger = {
        get_db: function () { return stateMap.ledger_db; }
    };

    initModule = function () {
        var account_list, account_map, ledger_list, entry_map;

        makeExpenseSetDefault();

        if (isFakeData) {
            account_list = spa.fake.getAccountList();
            for (var i = 0, l = account_list.length; i < l; ++i) {
                account_map = account_list[i];
                makeAccount(account_map);
            }

            ledger_list = spa.fake.getLedgerList();
            for (var i = 0, l = ledger.length; i < l; i++) {
                entry_map = ledger_list[i];
                makeEntry(entry_map);
            }
        }
    };

    return {
        initModule: initModule,
        accounts: accounts,
        expenseset: expenseset,
        ledger: ledger
    };
}());

