const { join } = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const authRouter = require("./routes/admin/auth");
const adminProductRouter = require("./routes/admin/product");
const userProductRouter = require("./routes/user/product");

const app = express();

app.use(express.static(join(__dirname, "..", "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["ikgjlsiakdfknmfbjlziknrgnkvljgcmnkd"],
  })
);

app.use(authRouter);
app.use(adminProductRouter);
app.use(userProductRouter);

app.listen(3050, () => {
  console.log("server running at port 3050");
});
