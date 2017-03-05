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
            { recid: 1, sdate: "2017/01/12", expense: 0, breakdown: "その他", product: "その他", outgo: 1000 },
            { recid: 2, sdate: "2017/01/25", expense: 0, breakdown: "その他", product: "その他", outgo: 15264 },
        ];
    };

    return {
        getAccountList: getAccountList,
        getLedgerList: getLedgerList
    };
}());
