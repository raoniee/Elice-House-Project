import jwt from "jsonwebtoken";

function ifAdminAllow(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  // jwt 토큰을 가지고 있는지 확인(로그인되어 있는지 확인)
  if (!token) {
    res.status(401).json({
      result: "접근 불가",
      reason: "로그인이 필요합니다.",
    });
  }

  // 관리자인지 확인
  try {
    const key = process.env.KEY;
    const jwtInfo = jwt.verify(token, key);

    const isAdmin = jwtInfo.isAdmin;

    if (!isAdmin) {
      res.status(401).json({
        result: "접근 불가",
        reason: "관리자가 아닙니다.",
      });
    }
    next();
  } catch {
    res.status(401).json({
      result: "접근 불가",
      reason: "관리자가 아닙니다.",
    });
  }
}

function ifAdminDeny(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  // jwt 토큰을 가지고 있는지 확인(로그인되어 있는지 확인)
  if (!token) {
    res.status(401).json({
      result: "접근 불가",
      reason: "로그인이 필요합니다.",
    });
  }

  // 관리자인지 확인
  try {
    const key = process.env.KEY;
    const jwtInfo = jwt.verify(token, key);

    const isAdmin = jwtInfo.isAdmin;
    console.log(isAdmin);

    if (isAdmin) {
      res.status(401).json({
        result: "접근 불가",
        reason: "관리자입니다.",
      });
    }
    next();
  } catch {
    res.status(401).json({
      result: "접근 불가",
      reason: "관리자입니다.",
    });
  }
}

export { ifAdminAllow, ifAdminDeny };
