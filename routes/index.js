const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ name: "eli" });
});
console.log("2");
module.exports = router;
