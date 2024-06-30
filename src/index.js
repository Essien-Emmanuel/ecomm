const app = require('express')();

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

function parseReqBody(reqBody) {
  const parsed = reqBody.split('&');
  const formData = {};
  for (const pair of parsed) {
    const [key, value ] = pair.split('=');
    formData[key] = value
  }
  return formData
}

app.post('/', (req, res) => {
  req.on('data', (data) => {
    const stringifiedDataBuffer = data.toString('utf8');
    const parsedReqBody = parseReqBody(stringifiedDataBuffer);
    console.log('parsed body ', parsedReqBody)
  })
  res.send('Account created!!!');
})

app.listen(3050, () => {
  console.log('server running at port 3050');
})