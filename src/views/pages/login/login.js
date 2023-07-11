// import * as API from "../../api.js";

const INPUT_EMAIL = document.getElementById("input-email");
const INPUT_PW = document.getElementById("input-password");
const LOGIN_FORM = document.getElementById("login-form");

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

// (일단) api.js의 post
async function post(endpoint, data) {
  console.log("data: ", data);
  const apiUrl = endpoint;
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${apiUrl}`, "color: #296aba;");
  console.log(`%cPOST 요청 데이터: ${bodyData}`, "color: #296aba;");

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: bodyData,
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    // const errorContent = await res.json();
    // const { reason } = errorContent;

    throw new Error("로그인 실패");
  }

  const result = await res.json();

  return result;
}

//

// 로그인
LOGIN_FORM.addEventListener("submit", async (event) => {
  // 이벤트 기본값(효과) 제거
  event.preventDefault();

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

  const email = INPUT_EMAIL.value;
  const password = INPUT_PW.value;
  console.log("회원가입 버튼 클릭 + input_email_val " + email);

  const data = { email, password };
  try {
    const response = await post("/api/login", data);

    const { token, isAdmin } = response;

    // 관리자(admin)인 경우, 로컬스토리지에 기록
    if (isAdmin) {
      localStorage.setItem("admin", "admin");
      alert("관리자 계정으로 로그인 되었습니다!");
    } else {
      // localStorage.setItem("token", data.token);
      localStorage.setItem("token", token);
      alert(`로그인 성공! 환영합니다 :)`);

      window.location.href = "/";
      // 메인 페이지 외 다른 페이지(예: 상품 상세페이지)에서 로그인 페이지로 온 경우, 해당 페이지로 복귀
      const { previouspage } = getUrlParams();

      if (previouspage) {
        window.location.href = previouspage;
        return;
      }
      // } else {
      //   // 메인 페이지에서 로그인한 경우, 메인 페이지로 이동
      //   window.location.href = "/";
      // }
    }
  } catch (error) {
    // console.error(error);
    alert(`로그인 실패: 이메일 또는 비밀번호가 틀렸습니다.`);
  }
});
