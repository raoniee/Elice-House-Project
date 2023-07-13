import jwt from "jsonwebtoken";

function checkLogin(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  // jwt 토큰을 가지고 있는지 확인(로그인되어 있는지 확인)
  if (!token) {
    res.status(401).json({
      result: "접근 불가",
      reason: "로그인 필요",
    });
  }
  const key = process.env.KEY;
  const jwtInfo = jwt.verify(token, key);

  req.body.userId = jwtInfo.userId;
  next();
}

export { checkLogin };
