import { drawHeaderMenu } from "../../components/header/header-menu.js";
import { insertHeaderCategoryData } from "../../components/header/header-category.js";
import { drawFooter } from "../../components/footer/footer.js";
import * as Api from "../../apiUtil";
import { drawMyNav } from "../../components/my-nav/my-nav.js";

// Header 삽입
drawHeaderMenu();
insertHeaderCategoryData();

//Footer 삽입
drawFooter("../../public/assets/imgs/EliceHouse_logo.png");

// 마이페이지 사이드메뉴 템플릿 삽입
drawMyNav();

getUserData();

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const password2Input = document.querySelector("#password2");
const saveInfoChangeBtn = document.querySelector("#save-info-change-btn");
const deleteInfoBtn = document.querySelector("#delete-info-btn");

async function getUserData() {
  const userData = await Api.get("/api/users");

  const { name, email } = userData;
  userData.password = "";

  nameInput.value = name;
  emailInput.value = email;

  //정보 수정
  saveInfoChangeBtn.addEventListener("click", saveInfoChange);
  async function saveInfoChange(e) {
    e.preventDefault();

    const changedData = {};
    const name = nameInput.value;
    const password = passwordInput.value;
    const password2 = password2Input.value;

    if (name !== userData.name) {
      if (name === "") {
        return alert("이름을 입력해주세요.");
      } else {
        changedData.name = name;
      }
    }

    if (!password) {
      return alert("비밀번호를 입력해 주세요.");
    }

    if (password !== "" || password2 !== "") {
      if (password !== password2) {
        return alert("비밀번호와 비밀번호 재확인이 일치하지 않습니다.");
      } else {
        changedData.password = password;
      }
    }

    if (Object.keys(changedData).length === 0) {
      return alert("수정된 정보가 없습니다");
    }

    try {
      await Api.patch("/api/users", "", changedData);
      console.log(`수정사항: ${changedData}`);
      alert("수정된 정보가 저장되었습니다.");
      location.reload();
    } catch (err) {
      alert(`오류가 발생하였습니다: ${err}`);
    }
  }

  //탈퇴
  deleteInfoBtn.addEventListener("click", deleteInfo);
  async function deleteInfo(e) {
    e.preventDefault();

    try {
      await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("탈퇴되었습니다.");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (err) {
      alert(`오류가 발생하였습니다: ${err}`);
    }
  }
}
