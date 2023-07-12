import * as API from "../apiUtil.js";
// import { application } from "express";

const REGISTER_CANCEL = document.getElementById("register-cancel");
const REGISTER_FORM = document.getElementById("register-form");

// 회원가입 페이지의 '취소' 버튼 클릭 -> 메인 페이지로 이동
REGISTER_CANCEL.addEventListener("click", () => {
  window.location.href = "/";
});

REGISTER_FORM.addEventListener("submit", async (event) => {
  // 이벤트 기본값(효과) 제거
  event.preventDefault();

  const USER_NAME = document.getElementById("input-name");
  const USER_PW1 = document.getElementById("password1");
  const USER_PW2 = document.getElementById("password2");
  const USER_EMAIL = document.getElementById("input-email");
  const name = USER_NAME.value;
  const password = USER_PW1.value;
  const email = USER_EMAIL.value;

  // 코드리뷰 반영 -- 유효성 체크 필드가 늘어나는 경우 생각하기
  const validateList = [
    { elem: USER_NAME, label: "이름" },
    { elem: USER_EMAIL, label: "이메일" },
    { elem: USER_PW1, label: "비밀번호" },
    { elem: USER_PW2, label: "비밀번호 재확인" },
  ];
  // 유효성 검사 - 빈칸 불가
  const notValidFieldIndex = validateList.findIndex(
    (field) => !field.elem.value.trim()
  );
  if (notValidFieldIndex !== -1) {
    alert(`${validateList[notValidFieldIndex].label}를 입력해주세요.`);
    validateList[notValidFieldIndex].elem.focus();
    return;
  }
  // 유효성 검사 - 비밀번호, 비밀번호 재확인 값 일치
  if (validateList[2].elem.value !== validateList[3].elem.value) {
    alert(`입력하신 비밀번호와 비밀번호 재확인이 동일하지 않습니다.`);
    validateList[2].elem.focus();
    return;
  }
  try {
    const response = await API.post("/api/register", { name, email, password });

    alert("회원가입이 완료되었습니다!");

    // 회원가입 후 로그인 페이지로 바로 이동
    window.location.href = "/login";
  } catch (error) {
    console.error(error.stack);
    alert("회원가입 실패:: 확인 후 다시 한 번 시도해주세요.");
  }
});
