const app = require("express")();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const UserRepo = require("./repositories/user");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ["ikgjlsiakdfknmfbjlziknrgnkvljgcmnkd"],
  })
);

app.get("/signup", (req, res) => {
  res.send(`
      Your session user id is ${req.session.userId}
      <div>
        <form method="POST">
          <input name="email" placeholder="email" />
          <input name="password" placeholder="password" />
          <input name="confirmPassword" placeholder="confirm password" />
          <button>Sign Up </button>
        </form>
      </div>
    `);
});

app.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const existingUser = await UserRepo.getOneBy({ email });

  if (existingUser) return res.send("Account already created.");

  if (password.length < 6)
    return res.send("Password must be of min length of 6");

  if (confirmPassword !== password) return res.send("Passwords must match.");

  const user = await UserRepo.create({ email, password });
  req.session.userId = user.id;

  res.send("Account created!!!");
});

app.listen(3050, () => {
  console.log("server running at port 3050");
});
