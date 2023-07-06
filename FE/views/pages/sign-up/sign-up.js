// 회원가입 유효성 검사
const validateSignUp = (e) => {
  // 이벤트 기본값(효과) 제거
  e.preventDefault();

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

  // // 회원가입 api 요청
  // try {
  //   const data = { name, email, password };
  //   await Api.post("/api/sign-up", data);
  //   alert("회원가입이 완료되었습니다!");

  //   // 로그인 페이지로 이동
  //   window.location.href = "/login";
  // } catch(err) {
  //   console.log(err.stack);
  //   alert(`${err.message} : 확인 후, 다시 시도해 주세요.`);
  // }
};
