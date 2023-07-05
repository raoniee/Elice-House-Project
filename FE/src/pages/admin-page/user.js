const userBtn = document.querySelector("#user-btn");
const listContainer = document.querySelector("#list-container");
const adminTitle = document.querySelector("#admin-title");

// 화면 초기화 함수
function initUserPage() {
  listContainer.innerHTML = "";
}

// 회원 관리창 생성 함수
function makeUserList() {
  initUserPage();

  const userList = document.createElement("div");
  userList.innerHTML = "<div>회원리스트 추가 필요</div>";

  listContainer.appendChild(userList);
}

userBtn.addEventListener("click", makeUserList);
