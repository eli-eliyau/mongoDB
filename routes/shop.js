// שימוש בקאורי סטרינג
const express = require("express");

const router = express.Router();

// ראוט שנקרא קאורי סטרינג שנותנים ערך לראוט ביוארל
// shop/?category=food
// השם של הראות שכתוב כאן נוסף לשם של הראוט שמזמן את הפונקציה הזאת
router.get("/category", (req, res) => {
  // קאורי זה תכונה מובנת ששולפת את הערך ששווה המשתנה ביוארל
  let categoryQ = req.query.category;
  // ואז ניתן לעבור על המערך ולהחזיר רק את הערכים שדומים לערך שי בקאורי

  res.json({ name: "eli" });
});
console.log("3");
module.exports = router;
