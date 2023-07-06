// 로그인 유효성 검사
const validateLogin = (e) => {
  // 이벤트 기본값(효과) 제거
  e.preventDefault();
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
