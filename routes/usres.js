const express = require("express");

// ספריית הצפנה
const bcrypt = require("bcrypt");

// פונקציה שבודקת תקינות תוקן
const { authToken } = require("../auth/authToken");

const { UserModel, validUser, validLogin, genToken } = require("../models/usersModel");

const router = express.Router();

// הכנסת נתונים לטבלה פוד בדאתא
router.post("/", async (req, res) => {
  // נעשה בדיקת קלט ע"י פונקציה של גויי שנשלח אליו את הבקשה
  let validBody = validUser(req.body);

  // אם יש שגיאה נלך למאפיין שבו שומר את השיגאה ונציג טנגדיר גם סטטוס לבקשה
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  //   לאחר שהגדרנו בדאתא שמייל לא יכול לחזור על עצמו פעמים אז שננסה לכניס יוזר חדש נרצה לדעת אם המייל שלו לא חוזר על עצמו ובמידה וכן נשלח שגיאה
  try {
    // נשלח לסכמה את הבקשה
    let user = UserModel(req.body);

    // לפני שנשמור נרצה להצפין
    user.pass = await bcrypt.hash(user.pass, 10);

    // במידה והבקשה תקינה תמישך התונכנית ותכניבס את הערכים לדאטא
    //   סייב בעצם שומר את הערכים בטבלה המקושרת ומחזיר את למשתנה את עצמו אם עוד שני ערכים אידי
    await user.save();
    // מסתירים את הסיסמא המוצפנת לאחר ששמרנו אותה
    user.pass = "****";
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: "err" });
  }
});

//בקשת גט במידה והתוקן תקין ע"י בדיקת בפונקציה נקבל את הנתונים
router.get("/userInfo", authToken, async (req, res) => {
  // נדבר עם הדאתא ונבשקש לחפש יוזר לפי אידי שנקבל מאפאיין של הקיקאויר שמגיע מהפונקציה שבודקת את התוקן שבו יש גם את אידי ובפרמטר השני כדי לא לקבל את הסיסמא נכתוב כך
  let user = await UserModel.findOne({ _id: req.tokenData.id }, { pass: 0 });
  res.json(user);
});

// בקשת פוסט של התחברות
router.post("/login", async (req, res) => {
  // נעשה בדיקת קלט ע"י פונקציה של גויי שנשלח אליו את הבקשה
  let validBody = validLogin(req.body);

  // אם יש שגיאה נלך למאפיין שבו שומר את השיגאה ונציג טנגדיר גם סטטוס לבקשה
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  //   קודם נבדוק אם המייל של המשתמש קיים במערכת
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ msg: "err email" });
  }

  // במידה ומייל קיים נבדוק אם הסיסמא שנכנסה תואמת לסיסמא במערכת המוצפנת ע"י הפונקציה שמקבלת את הסיסמא שנכנסה ובפרמטר שני מקבלת את הסיסמא שבדאתא
  let passValid = await bcrypt.compare(req.body.pass, user.pass);
  if (!passValid) {
    return res.status(401).json({ msg: "err pass" });
  }

  //   אחרי שהכל בסדר והיוזר הכן שייך למערכת ניצור תוקן ונשלח את אידי של היוזר
  let newToken = genToken(user.id);
  res.json({ token: newToken });
});
module.exports = router;
