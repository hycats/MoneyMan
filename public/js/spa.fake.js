// spa.fake.js

spa.fake = (function () {
    'use strict';

    var getLedgerList;

    getLedgerList = function () {
        return [
            { recid: 1, sdate: "2017/01/12", expense:0, breakdown: "その他", product: "その他", outgo: 1000 },
            { recid: 2, sdate: "2017/01/25", expense:0, breakdown: "その他", product: "その他", outgo: 15264 },
        ];
    };

    return { getLedgerList: getLedgerList };
}());
