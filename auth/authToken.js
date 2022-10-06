const jwt = require("jsonwebtoken");

// הפונקציה בודקת תקינות תוקן
exports.authToken = (req, res, next) => {
  // אדר זה כמו הבדי שניהם לא נראים ומאובטחים שנותנים קי בפונקציה ובמידה וקי וערך של התוקן תקין נקבל נתונים
  let token = req.header("x-api");

  // לפונקציה נשלח 1 הקי 2 המילת הסודית שנוצר התוקן והמידה ולא נתפס שגיאה יוצג הודעה
  try {
    let decodeToken = jwt.verify(token, "eli");
    // ברגע שנכתוב מאפיין בריקוריאר נוכל לשלוף את הנתון בכל פונקציה אחרת שיש לה את הריקריאר
    req.tokenData = decodeToken;

    //    במידה והכל בסדר תעבור לפונקציה הבאה שהיא המקום שבו זנמנו את הפוקציה הזאת
    next();
  } catch (err) {
    return res.status(401).json({ msg: "token invalid333" });
  }
};
