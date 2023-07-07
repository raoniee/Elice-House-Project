// import * as API from "../../api.js";

const INPUT_EMAIL = document.getElementById("input-email");
const INPUT_PW = document.getElementById("input-password");
const LOGIN_SUBMIT = document.getElementById("login-submit");

// 주소창 url의 params를 객체로 만드는 함수
const getUrlParams = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const result = {};

  for (const [key, value] of urlParams) {
    result[key] = value;
  }

  return result;
};

// 로그인 유효성 검사
async function validateLogin(e) {
  // 이벤트 기본값(효과) 제거
  e.preventDefault();

  // 이메일 유효성 검사: 빈 칸 불가
  if (INPUT_EMAIL.value == "") {
    alert("이메일을 입력해주세요.");
    INPUT_EMAIL.focus();
    return;
  }

  // 비밀번호 유효성 검사: 빈칸 불가
  if (INPUT_PW.value == "") {
    alert("비밀번호를 입력해주세요.");
    INPUT_PW.focus();
    return;
  }

  // 로그인 api 요청
  try {
    const data = { email, password };
    const result = await API.post("/api/login", data);
    const { token, isAdmin } = result;

    // 로그인 성공. 토큰을 __스토리지에 저장

    alert(`로그인 되었습니다 :)`);

    // 관리자(admin)인 경우, __스토리지에 기록
    if (isAdmin) {
      // __.setItem("admin", "admin");
    }

    // 메인 페이지 외 다른 페이지에서 로그인 페이지로 온 경우, 해당 페이지로 복귀
    const { previouspage } = getUrlParams();

    if (previouspage) {
      window.location.href = previouspage;
      return;
    }

    // 메인 페이지에서 로그인한 경우, 메인 페이지로 이동
    window.location.href = "/";
  } catch (err) {
    console.error(err.stack);
    alert(`${err.message}: 확인 후 다시 시도해 주세요.`);
  }
}
