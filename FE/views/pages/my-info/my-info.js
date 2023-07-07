import { drawHeader } from "../../components/header/header.js";
import { drawFooter } from "../../components/footer/footer.js";
import { drawMyNav } from "../../components/my-nav/my-nav.js";

// Header, Footer 템플릿 삽입
drawHeader();
drawFooter();

// 마이페이지 사이드메뉴 템플릿 삽입
drawMyNav();

// 내 정보 유효성 검사
const changeMyInfo = (e) => {
  // 이벤트 기본값(효과) 제거
  e.preventDefault();

  const USER_NAME = document.getElementById("input-name");
  const USER_PW1 = document.getElementById("password1");
  const USER_PW2 = document.getElementById("password2");
  const USER_EMAIL = document.getElementById("input-email");
  const SIGN_UP_SUBMIT = document.getElementById("change-my-info-confirm");

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
    alert("비밀번호와 비밀번호 재확인이 동일하지 않습니다!");
    USER_PW1.focus();
    return;
  }

  // 이메일 유효성 검사: 빈 칸 불가
  if (USER_EMAIL.value == "") {
    alert("이메일을 입력해주세요.");
    USER_EMAIL.focus();
    return;
  }
};
