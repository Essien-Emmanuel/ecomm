const app = require("express")();
const bodyParser = require("body-parser");
const UserRepo = require("./repositories/user");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
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

app.post("/", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const existingUser = await UserRepo.getOneBy({ email });

  if (existingUser) return res.send("Account already created.");

  if (confirmPassword !== password) return res.send("Passwords must match.");

  res.send("Account created!!!");
});

app.listen(3050, () => {
  console.log("server running at port 3050");
});
