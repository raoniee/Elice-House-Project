// import * as API from "../../api.js";
// import { getUrlParams } from "../../useful-functions";

const INPUT_EMAIL = document.getElementById("input-email");
const INPUT_PW = document.getElementById("input-password");
const LOGIN_FORM = document.getElementById("login-form");

// 로그인
LOGIN_FORM.addEventListener("submit", async (event) => {
  // 이벤트 기본값(효과) 제거
  event.preventDefault();

  try {
    const response = await fetch("dummyData.json");
    const data = await response.json();
    console.log("data: ", data);
    console.log(data.users);

    // 코드리뷰 반영 -- 유효성 체크 필드가 늘어나는 경우 생각하기
    const validateList = [
      { elem: INPUT_EMAIL, label: "이메일" },
      { elem: INPUT_PW, label: "비밀번호" },
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

    // 더미 데이터에 저장된 이메일에 해당하는 회원 찾기
    const user = data.users.find((user) => user.email === INPUT_EMAIL.value);
    console.log(user.email);
    console.log(INPUT_EMAIL.value);
    console.log(user.email === INPUT_EMAIL.value);

    // 더미 데이터에 회원 이메일 존재 + 비밀번호 일치 -> 로그인 성공
    if (user && user.password === INPUT_PW.value) {
      // 관리자인 경우
      if (user.isAdmin === "true") {
        alert("관리자 계정으로 로그인 되었습니다!");
        localStorage.setItem("admin", "admin");
        window.location.href = "/admin/main";
      } else {
        alert("로그인 성공!");

        // // 메인 페이지 외 다른 페이지(예: 상품 상세페이지)에서 로그인 페이지로 온 경우, 해당 페이지로 복귀
        // const { previouspage } = getUrlParams();

        // if (previouspage) {
        //   window.location.href = previouspage;
        //   return;
        // }

        // 메인 페이지에서 로그인한 경우, 메인 페이지로 이동
        window.location.href = "/";
      }
    } else {
      alert("이메일 또는 비밀번호가 올바르지 않습니다.");
    }

    // // 관리자(admin)인 경우, 로컬스토리지에 기록
    // if (isAdmin) {
    //   localStorage.setItem("admin", "admin");
    // }
  } catch (error) {
    console.error(error.stack);
    alert(`로그인 실패 :: 입력하신 내용을 다시 확인해 주세요.`);
  }
});
