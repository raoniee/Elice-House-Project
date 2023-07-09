import * as API from "../../api.js";
// import { application } from "express";

const USER_NAME = document.getElementById("input-name");
const USER_PW1 = document.getElementById("password1");
const USER_PW2 = document.getElementById("password2");
const USER_EMAIL = document.getElementById("input-email");
const REGISTER_SUBMIT = document.getElementById("register-submit");
const REGISTER_CANCEL = document.getElementById("register-cancel");
const REGISTER_FORM = document.getElementById("register-form");

addAllEvents();

function addAllEvents() {
  REGISTER_SUBMIT.addEventListener("click", submitRegister);
}

// 회원가입
async function submitRegister(e) {
  // 이벤트 기본값(효과) 제거
  e.preventDefault();

  // 회원가입 간단 유효성 검사
  // 사용자 이름 유효성 검사: 빈 칸 불가
  if (USER_NAME.value == "") {
    USER_NAME.focus();
    return alert("이름을 입력해주세요.");
  }

  // 비밀번호 유효성 검사: 빈칸 불가, 비밀번호 === 비밀번호 재확인
  if (USER_PW1.value == "") {
    USER_PW1.focus();
    return alert("비밀번호를 입력해주세요.");
  }
  if (USER_PW2.value == "") {
    USER_PW2.focus();
    return alert("비밀번호 재확인을 입력해주세요.");
  }

  if (USER_PW1.value !== USER_PW2.value) {
    USER_PW1.focus();
    return alert("비밀번호와 비밀번호 재확인이 동일하지 않습니다!");
  }

  // 회원가입 api 요청
  try {
    // 코드리뷰 내용으로 추가한 내용 - api호출 시 항상 성공한다는 보장X
    const { token, isAdmin } = await API.post("/login", data);
    // 왜 'name'은 취소선으로 뜨는건지...?
    const data = { name, email, password };
    await API.post("/register", data);
    alert("회원가입이 완료되었습니다!");

    // 로그인 페이지로 이동
    window.location.href = "/login";
  } catch (err) {
    console.error(err.stack);
    alert(
      `회원가입 오류:: 모든 항목값 입력 또는 비밀번호 재확인 후 다시 시도해 주세요.`
    );
  }
}

// document
//   .getElementById("register-form")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const name = document.getElementById("input-name").value;
//     const email = document.getElementById("input-email").value;
//     const password = document.getElementById("password1").value;

//     const response = await fetch("/users/register", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password }),
//     });

//     const data = await response.json();
//     console.log(data);
//   });
