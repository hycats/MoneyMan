// spa.model.js

spa.model = (function () {
    'use strict';

    var configMap = {
        expense_list: [
            { id: 0, name: "食費", inout: -1 },
            { id: 1, name: "酒・たばこ", inout: -1 },
            { id: 2, name: "生活用品", inout: -1 },
            { id: 3, name: "衣類", inout: -1 },
            { id: 4, name: "教育・育児", inout: -1 },
            { id: 5, name: "教養娯楽", inout: -1 },
            { id: 6, name: "車関係", inout: -1 },
            { id: 7, name: "交通費", inout: -1 },
            { id: 8, name: "交際費", inout: -1 },
            { id: 9, name: "保険", inout: -1 },
            { id: 10, name: "社会保険", inout: -1 },
            { id: 11, name: "住居費", inout: -1 },
            { id: 12, name: "水道光熱", inout: -1 },
            { id: 13, name: "通信費", inout: -1 },
            { id: 14, name: "医療", inout: -1 },
            { id: 15, name: "税金", inout: -1 },
            { id: 16, name: "雑費", inout: -1 },
            { id: 17, name: "出金", inout: -1, name2: "口座預入" },
            { id: 18, name: "その他支出", inout: -1, editable: true },
            { id: 19, name: "雑所得支出", inout: -1, editable: true },
            { id: 20, name: "残高調整", inout: 0 },
            { id: 80, name: "給与", inout: 1 },
            { id: 81, name: "賞与", inout: 1 },
            { id: 82, name: "入金", inout: 1, name2: "口座引出" },
            { id: 83, name: "雑所得収入", inout: 1, editable: true },
            { id: 84, name: "その他収入", inout: 1, editable: true }
        ]
    },
        stateMap = {
            //account_id: 0,
            account_db: TAFFY([{
                "id": 0, name: "現金", "type": -1
            }]),
            expense_db: TAFFY([
                { id: 0, name: "食費", inout: -1 },
                { id: 1, name: "酒・たばこ", inout: -1 },
                { id: 2, name: "生活用品", inout: -1 },
                { id: 3, name: "衣類", inout: -1 },
                { id: 4, name: "教育・育児", inout: -1 },
                { id: 5, name: "教養娯楽", inout: -1 },
                { id: 6, name: "車関係", inout: -1 },
                { id: 7, name: "交通費", inout: -1 },
                { id: 8, name: "交際費", inout: -1 },
                { id: 9, name: "保険", inout: -1 },
                { id: 10, name: "社会保険", inout: -1 },
                { id: 11, name: "住居費", inout: -1 },
                { id: 12, name: "水道光熱", inout: -1 },
                { id: 13, name: "通信費", inout: -1 },
                { id: 14, name: "医療", inout: -1 },
                { id: 15, name: "税金", inout: -1 },
                { id: 16, name: "雑費", inout: -1 },
                { id: 17, name: "出金", inout: -1, name2: "口座預入" },
                { id: 18, name: "その他支出", inout: -1, editable: true },
                { id: 19, name: "雑所得支出", inout: -1, editable: true },
                { id: 20, name: "残高調整", inout: 0 },
                { id: 80, name: "給与", inout: 1 },
                { id: 81, name: "賞与", inout: 1 },
                { id: 82, name: "入金", inout: 1, name2: "口座引出" },
                { id: 83, name: "雑所得収入", inout: 1, editable: true },
                { id: 84, name: "その他収入", inout: 1, editable: true }
            ]),
            ledger_db: TAFFY()
        },
        isFakeData = true,
        accountProto, makeAccount, entryProto, makeEntry,
        accounts, expenseset, ledger,
        initModule;

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
        get_expense_db: function () { return stateMap.expense_db; }
    }

    ledger = {
        get_db: function () { return stateMap.ledger_db; }
    };

    initModule = function () {
        var account_list, account_map, ledger_list, entry_map;

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

