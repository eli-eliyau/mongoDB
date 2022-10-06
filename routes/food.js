const express = require("express");

const router = express.Router();

const { FoodModel, validFood } = require("../models/foodModel");

// משיכה נתונים מהדאתא
router.get("/", async (req, res) => {
  // מציג את כל הדאתא לתוך למשתנה דאתא
  let data = await FoodModel.find({});
  res.json(data);
});

// הכנסת נתונים לטבלה פוד בדאתא
router.post("/", async (req, res) => {
  // נעשה בדיקת קלט ע"י פונקציה של גויי שנשלח אליו את הבקשה
  let validBody = validFood(req.body);

  // אם יש שגיאה נלך למאפיין שבו שומר את השיגאה ונציג טנגדיר גם סטטוס לבקשה
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  // נשלח לסכמה את הבקשה
  let food = FoodModel(req.body);
  // במידה והבקשה תקינה תמישך התונכנית ותכניבס את הערכים לדאטא
  //   סייב בעצם שומר את הערכים בטבלה המקושרת ומחזיר את למשתנה את עצמו אם עוד שני ערכים אידי
  await food.save();

  res.json(food);
});

// מחיקה מאדתא ע"י פרמטר בראוט שהוא דינמי שבו נכניס אידי שנרצה למחוק
router.delete("/:idDel", async (req, res) => {
  // תופס שגיאות בזמן ריצית התוכנית ושוךח שגיאה במידה וכן
  try {
    let data = await FoodModel.deleteOne({ id: req.params.idDel });
    // אם מחק בהצלחה יופיע אובייקט עם נ=1
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// לערוך מחדש משהו בטבלה לפי אידי
router.put("/:idPut", async (req, res) => {
  // נעשה בדיקת קלט ע"י פונקציה של גויי שנשלח אליו את הבקשה
  let validBody = validFood(req.body);

  // אם יש שגיאה נלך למאפיין שבו שומר את השיגאה ונציג טנגדיר גם סטטוס לבקשה
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  // תופס שגיאות בזמן ריצית התוכנית ושולח שגיאה במידה וכן
  try {
    // נוסיף את הערכים החדשים שבבקשה בתור פרמטר שני
    let data = await FoodModel.updateOne({ id: req.params.idPut }, req.body);
    // אם עבר בהצלחה יופיע אובייקט עם ערך=1
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});
console.log("4");

module.exports = router;
