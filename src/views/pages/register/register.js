import * as API from "../../api.js";
// import { application } from "express";

const USER_NAME = document.getElementById("input-name");
const USER_PW1 = document.getElementById("password1");
const USER_PW2 = document.getElementById("password2");
const USER_EMAIL = document.getElementById("input-email");
const REGISTER_SUBMIT = document.getElementById("register-submit");
const REGISTER_CANCEL = document.getElementById("register-cancel");
const REGISTER_FORM = document.getElementById("register-form");

REGISTER_FORM.addEventListener("submit", async (event) => {
  // 이벤트 기본값(효과) 제거
  event.preventDefault();

  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(`회원가입이 완료되었습니다.`);
    } else {
      const errorData = await response.json();
      alert(`회원가입 실패:: ${errorData.error}`);
    }
  } catch (error) {
    console.error(error.stack);
    alert("회원가입 실패:: 확인 후 다시 한 번 시도해주세요.");
  }
});
