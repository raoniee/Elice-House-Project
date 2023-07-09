import * as API from "../../api.js";

const INPUT_EMAIL = document.getElementById("input-email");
const INPUT_PW = document.getElementById("input-password");
const LOGIN_SUBMIT = document.getElementById("login-submit");

addAllEvents();

function addAllEvents() {
  LOGIN_SUBMIT.addEventListener("click", submitLogin);
}

// 주소창 url의 params를 객체로 만드는 함수
// user/:userId -- ?userId 방식으로 다시 생각해보기
const getUrlParams = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const result = {};

  for (const [key, value] of urlParams) {
    result[key] = value;
  }

  return result;
};

// 로그인
async function submitLogin(e) {
  // 이벤트 기본값(효과) 제거
  e.preventDefault();

  const data = { email, password };
  const result = await API.post("/login", data);
  const { token, isAdmin } = result;

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

    const result = await API.post("/login", data);
    // const { token, isAdmin } = result;

    // 로그인 성공. 토큰을 로컬스토리지에 저장
    localStorage.setItem("token", token.value);

    alert(`로그인 되었습니다 :)`);

    // 관리자(admin)인 경우, 로컬스토리지에 기록
    if (isAdmin) {
      localStorage.setItem("admin", "admin");
    }

    // 메인 페이지 외 다른 페이지(예: 상품 상세페이지)에서 로그인 페이지로 온 경우, 해당 페이지로 복귀
    const { previouspage } = getUrlParams();

    if (previouspage) {
      window.location.href = previouspage;
      return;
    }

    // 메인 페이지에서 로그인한 경우, 메인 페이지로 이동
    window.location.href = "/";
  } catch (err) {
    console.error(err.stack);
    alert(`로그인 실패 :: 입력하신 내용을 다시 확인해 주세요.`);
  }
}

// document
//   .getElementById("login-form")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const email = document.getElementById("input-email").value;
//     const password = document.getElementById("input-password").value;

//     const response = await fetch("/users/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     console.log(data);

//     // JWT 토큰을 로컬스토리지에 저장
//     localStorage.setItem("token", data.token);
//   });
