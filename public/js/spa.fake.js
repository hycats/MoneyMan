// spa.fake.js

spa.fake = (function () {
    'use strict';

    var getAccountList, getLedgerList;

    getAccountList = function () {
        return [
            { id:1, name: "新生", type: 0 },
            { id:2, name: "SBI証券", type: 0 },
            { id:3, name: "KAMPO", type: 1 }
        ];
    };

    getLedgerList = function () {
        return [
            { recid: 1, sdate: "2017/01/12", expense: 0, breakdown: 99, product: 99, outgo: 1000, check: true },
            { recid: 2, sdate: "2017/01/25", expense: 5, breakdown: 3, product: '辞書', outgo: 15264, remark: 'amiami' },
            { recid: 3, sdate: "2017/03/24", expense: 84, breakdown: 99, product: 99, income: 200000 },
        ];
    };

    return {
        getAccountList: getAccountList,
        getLedgerList: getLedgerList
    };
}());
