//בניית סכמה
const mongoose = require("mongoose");

// זימון ספרייה
const Joi = require("joi");

// ספריית תוקן
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  naem: String,
  email: String,
  pass: String,
  // מאפיין שיש לו אובייקט אם סטג מסויים אבל במידה והוא לא הוגדר יש לו ברירת מחדל
  role: {
    type: String,
    default: "regular",
  },
  // מאפיין שיש לו אובייקט אם סטג מסויים אבל במידה והוא לא הוגדר יש לו ברירת מחדל
  dade_created: {
    type: Date,
    default: Date.now(),
  },
});

// הפונקציה מסייכת את הסכמה לטבלה בדאתא פרמטר ראשון שם הטבלה בדאתא פרמטר שני הסכמה
const UserModel = mongoose.model("users", userSchema);
exports.UserModel = UserModel;

// נייצר תוקן לפי קבלת אידי של משתמש
exports.genToken = (userId) => {
  // הפונקציה מקבלת 1 עבור מי מיוצר התוקן שכאן זה עבור אידי מסויים 2 מילת הסוד שממנה נוצר התוקן 3 לכמה זמן תקף התוקן
  let token = jwt.sign({ id: userId }, "eli", { expiresIn: "60mins" });
  return token;
};

// פונקציה שבודקת תקינות קלט בצורת סכמה ואם יש שיגאה מחזירה מהיא
//  הפרמטר בעצם זה הבדי של הבקשה מצד לקוח
exports.validUser = (bodyData) => {
  let joiSchema = Joi.object({
    // בודק אם זה מחרוזת מינימום אותיות מאקסימום אותיות ומגדיר את זה כבקשה
    name: Joi.string().min(2).max(33).required(),
    email: Joi.string().min(2).max(333).email(),
    pass: Joi.string().min(2).max(33).required(),
  });
  // ומחזירים לבודי של הבקשה את הנתונים ובמידה ויש שגיאה יש מאפיין באובייקט החזרה ששם כתוב מה השגיאה
  return joiSchema.validate(bodyData);
};

// פונקציה שבודקת קלט תקין של התחברות
exports.validLogin = (bodyData) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(100).required().email(),
    pass: Joi.string().min(3).max(100).required(),
  });

  return joiSchema.validate(bodyData);
};
