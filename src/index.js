const app = require("express")();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");

const authRouter = require("./routes/admin/auth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["ikgjlsiakdfknmfbjlziknrgnkvljgcmnkd"],
  })
);
app.use(authRouter);

app.listen(3050, () => {
  console.log("server running at port 3050");
});
