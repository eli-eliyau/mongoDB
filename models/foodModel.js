//בניית סכמה
const mongoose = require("mongoose");

// זימון ספרייה
const Joi = require("joi");

const foodModel = new mongoose.Schema({
  name: String,
  img: String,
  cal: Number,
  price: Number,
});
// הפונקציה מסייכת את הסכמה לטבלה בדאתא פרמטר ראשון שם הטבלה בדאתא פרמטר שני הסכמה
const FoodModel = mongoose.model("foods", foodModel);

exports.FoodModel = FoodModel;

// פונקציה שבודקת תקינות קלט בצורת סכמה ואם יש שיגאה מחזירה מהיא
//  הפרמטר בעצם זה הבדי של הבקשה מצד לקוח
exports.validFood = (bodyData) => {
  let joiSchema = Joi.object({
    // בודק אם זה מחרוזת מינימום אותיות מאקסימום אותיות ומגדיר את זה כבקשה
    name: Joi.string().min(2).max(33).required(),
    img: Joi.string().min(2).max(333).allow(null, ""),
    cal: Joi.number().min(2).max(33333).required(),
    price: Joi.number().min(2).max(5555).required(),
  });
  // ומחזירים לבודי של הבקשה את הנתונים ובמידה ויש שגיאה יש מאפיין באובייקט החזרה ששם כתוב מה השגיאה
  return joiSchema.validate(bodyData);
};
