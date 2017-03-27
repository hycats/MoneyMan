// spa.fake.js

spa.fake = (function () {
    'use strict';

    var getAccountList, getLedgerList;

    getAccountList = function () {
        return [
            { id: 1, name: "新生", type: 0, initial_money: 0 },
            { id: 2, name: "SBI証券", type: 0, initial_money: 0 },
            { id: 3, name: "KAMPO", type: 1, initial_money: 0 }
        ];
    };

    getLedgerList = function () {
        return [
            { account: 0, sdate: "2017/01/12", expense: 0, breakdown: 99, product: 99, cost: 1000, check: true },
            { account: 0, sdate: "2017/01/25", expense: 5, breakdown: 3, product: '辞書', cost: 15264, remark: 'amiami' },
            { account: 0, sdate: "2017/03/24", expense: 84, breakdown: 99, product: 99, cost: -200000 },
        ];
    };

    return {
        getAccountList: getAccountList,
        getLedgerList: getLedgerList
    };
}());
