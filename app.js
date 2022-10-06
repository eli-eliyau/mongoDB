const express = require("express");

require("./db/mongoConnect");

const { routesInt } = require("./routes/routes");

const app = express();

app.use(express.json());

//מעביר את אפ ומשם פותח ראוטים
routesInt(app);

app.listen(3000, () => console.log(3000));
