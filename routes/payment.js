var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/", function(req, res) {
  console.log(req.body);
  res.redirect(
    "/success?mmp_txn" +
      "=" +
      req.body.mmp_txn +
      "&mer_txn" +
      "=" +
      req.body.mer_txn +
      "&amt" +
      "=" +
      req.body.amt +
      "&prod" +
      "=" +
      req.body.prod +
      "&date" +
      "=" +
      req.body.date +
      "&bank_txn" +
      "=" +
      req.body.bank_txn +
      "&f_code" +
      "=" +
      req.body.f_code +
      "&clientcode" +
      "=" +
      req.body.clientcode +
      "&bank_name" +
      "=" +
      req.body.bank_name +
      "&auth_code" +
      "=" +
      req.body.auth_code +
      "&ipg_txn_id" +
      "=" +
      req.body.ipg_txn_id +
      "&merchant_id" +
      "=" +
      req.body.merchant_id +
      "&desc" +
      "=" +
      req.body.desc +
      "&udf9" +
      "=" +
      req.body.udf9 +
      "&discriminator" +
      "=" +
      req.body.discriminator +
      "&surcharge" +
      "=" +
      req.body.surcharge +
      "&CardNumber" +
      "=" +
      req.body.CardNumber +
      "&udf1" +
      "=" +
      req.body.udf1 +
      "&udf2" +
      "=" +
      req.body.udf2 +
      "&.udf3" +
      "=" +
      req.body.udf3 +
      "&udf4" +
      "=" +
      req.body.udf4 +
      "&udf5" +
      "=" +
      req.body.udf5 +
      "&udf6" +
      "=" +
      req.body.udf6 +
      "&signature" +
      "=" +
      req.body.signature
  );
});

module.exports = router;
