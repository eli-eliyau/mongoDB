//חיבור לדאתא
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://express:1234@cluster0.ywfj6da.mongodb.net/experss0");
}
console.log("mongo");
