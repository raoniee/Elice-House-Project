import jwt from "jsonwebtoken";

function checkLogin(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  // jwt 토큰을 가지고 있는지 확인(로그인되어 있는지 확인)
  if (!token) {
    res.status(401).json({
      result: "접근 불가",
      reason: "로그인 필요",
    });

    return;
  }

  // 토큰에 들어있는 정보가 올바른 회원 정보인지 확인
  try {
    
  } catch {
    res.status(401).json({
      result: "접근 불가",
      reason: "회원가입하지 않은 회원입니다.",
    });
  }
}

export { checkLogin };
