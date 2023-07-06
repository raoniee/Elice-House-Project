// 회원가입 유효성 검사
const validateSignUp = () => {
  const USER_NAME = document.getElementById("input-name");
  const USER_PW1 = document.getElementById("password1");
  const USER_PW2 = document.getElementById("password2");
  const USER_EMAIL = document.getElementById("input-email");
  const SIGN_UP_SUBMIT = document.getElementById("sign-up-submit");

  // 사용자 이름 유효성 검사: 빈 칸 불가
  if (USER_NAME.value == "") {
    alert("이름을 입력해주세요.");
    USER_NAME.focus();
    return;
  }

  // 비밀번호 유효성 검사: 빈칸 불가, 비밀번호 === 비밀번호 재확인
  if (USER_PW1.value == "") {
    alert("비밀번호를 입력해주세요.");
    USER_PW1.focus();
    return;
  }
  if (USER_PW2.value == "") {
    alert("비밀번호 재확인을 입력해주세요.");
    USER_PW2.focus();
    return;
  }

  if (USER_PW1.value !== USER_PW2.value) {
    alert("비밀번화와 비밀번화 재확인이 동일하지 않습니다!");
    USER_PW1.focus();
    return;
  }

  // 이메일 유효성 검사: 빈 칸 불가
  if (USER_EMAIL.value == "") {
    alert("이메일을 입력해주세요.");
    USER_EMAIL.focus();
    return;
  }

  alert("회원가입이 완료되었습니다!");
};

// 로그인 유효성 검사
const validateLogin = () => {
  const INPUT_EMAIL = document.getElementById("input-email");
  const INPUT_PW = document.getElementById("input-password");
  const LOGIN_SUBMIT = document.getElementById("login-submit");

  // 이메일 유효성 검사: 빈 칸 불가
  if (INPUT_EMAIL.value == "") {
    alert("이메일을 입력해주세요.");
    INPUT_EMAIL.focus();
    return;
  }

  // 비밀번호 유효성 검사: 빈칸 불가, 비밀번호 === 비밀번호 재확인
  if (INPUT_PW.value == "") {
    alert("비밀번호를 입력해주세요.");
    INPUT_PW.focus();
    return;
  }

  return;
};
