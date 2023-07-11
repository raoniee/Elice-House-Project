// import * as API from "../api.js";
// import { application } from "express";

const REGISTER_FORM = document.getElementById("register-form");

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
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(`회원가입이 완료되었습니다.`);
      window.location.href = "/";
    } else {
      const errorData = await response.json();
      alert(`회원가입 실패:: ${errorData.error}`);
    }
  } catch (error) {
    console.error(error.stack);
    alert("회원가입 실패:: 확인 후 다시 한 번 시도해주세요.");
  }
});

//
// 더미데이터로 확인할때 썼던 코드

// const USER_NAME = document.getElementById("input-name");
// const USER_PW1 = document.getElementById("password1");
// const USER_PW2 = document.getElementById("password2");
// const USER_EMAIL = document.getElementById("input-email");
// const REGISTER_FORM = document.getElementById("register-form");

// REGISTER_FORM.addEventListener("submit", async (event) => {
//   // 이벤트 기본값(효과) 제거
//   event.preventDefault();

//   // 코드리뷰 반영 -- 유효성 체크 필드가 늘어나는 경우 생각하기
//   const validateList = [
//     { elem: USER_NAME, label: "이름" },
//     { elem: USER_EMAIL, label: "이메일" },
//     { elem: USER_PW1, label: "비밀번호" },
//     { elem: USER_PW2, label: "비밀번호 재확인" },
//   ];

//   // 유효성 검사 - 빈칸 불가
//   const notValidFieldIndex = validateList.findIndex(
//     (field) => !field.elem.value.trim()
//   );
//   if (notValidFieldIndex !== -1) {
//     alert(`${validateList[notValidFieldIndex].label}을/를 입력해주세요.`);
//     validateList[notValidFieldIndex].elem.focus();
//     return;
//   }
//   // 유효성 검사 - 비밀번호, 비밀번호 재확인 값 일치
//   if (validateList[2].elem.value !== validateList[3].elem.value) {
//     alert(`입력하신 비밀번호와 비밀번호 재확인이 동일하지 않습니다.`);
//     validateList[2].elem.focus();
//     return;
//   }

//   // 회원가입 요청 보내기
//   try {
//     const response = await fetch("dummyData.json");
//     const data = await response.json();

//     // 더미 데이터에 새로운 회원 추가
//     // data.users.push({ name, password, email });
//     data.users.push({
//       name: USER_NAME.value,
//       password: USER_PW1.value,
//       email: USER_EMAIL.value,
//     });

//     // 더미 데이터 업데이트 요청 보내기
//     const updateResponse = await fetch("dummyData.json", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });

//     if (updateResponse.ok) {
//       alert("회원가입 완료!");
//       window.location.href = "/";
//     } else {
//       throw new Error("회원가입 실패");
//     }
//   } catch (error) {
//     console.error(error);
//     alert("회원가입에 실패했습니다.");
//   }
// });
