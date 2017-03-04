// spa.model.js

spa.model = (function () {
    'use strict';

    var stateMap = {
        ledger_db: TAFFY()
    },
        isFakeData = true,
        entryProto, makeEntry, ledger, initModule;

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

    ledger = {
        get_db: function () { return stateMap.ledger_db; }
    };

    initModule = function () {
        var i, ledger_list, entry_map;

        if (isFakeData) {
            ledger_list = spa.fake.getLedgerList();
            for (i = 0; i < ledger_list.length; i++) {
                entry_map = ledger_list[i];
                makeEntry(entry_map);
            }
        }
    };

    return {
        initModule: initModule,
        ledger: ledger
    };
}());

