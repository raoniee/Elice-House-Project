import {
  makeAdminNav,
  clickNavbar,
} from "../../components/admin-nav/admin-nav.js";

// navbar 불러오기
makeAdminNav();

// navbar 클릭 함수 실행
clickNavbar();

function checkAdmin() {
  const isAdmin = localStorage.getItem("isAdmin");
  if (!isAdmin) {
    location.href = "/";
  }
}

checkAdmin();
