const bodyParser = (req, res, next) => {
  if (req.method === 'POST') {
    req.on('data', (data) => {
      const stringifiedDataBuffer = data.toString('utf8');
      formData = parseReqBody(stringifiedDataBuffer);
      req.body = formData;
      next();
    });
  } else {
    next()
  }
}

function parseReqBody(reqBody) {
  const parsed = reqBody.split('&');
  const formData = {};
  for (const pair of parsed) {
    const [key, value ] = pair.split('=');
    formData[key] = value
  }
  return formData
}