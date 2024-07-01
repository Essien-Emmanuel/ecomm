const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
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



app.post('/', (req, res) => {
  console.log('form data retrieved ', req.body);
  res.send('Account created!!!');
});

app.listen(3050, () => {
  console.log('server running at port 3050');
});