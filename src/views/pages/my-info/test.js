// 페이지 로드 시 실행
// 나중에 사용자가 데이터를 변경했는지 확인하기 위해, 전역 변수로 userData 설정
let userData;
async function insertUserData() {
  userData = await Api.get("/api/user");

  // 객체 destructuring
  const { fullName, email, address, phoneNumber } = userData;

  // 서버에서 온 비밀번호는 해쉬 문자열인데, 이를 빈 문자열로 바꿈
  // 나중에 사용자가 비밀번호 변경을 위해 입력했는지 확인하기 위함임.
  userData.password = "";

  fullNameInput.value = fullName;

  if (address) {
    const { postalCode, address1, address2 } = address;

    postalCodeInput.value = postalCode;
    address1Input.value = address1;
    address2Input.value = address2;
  } else {
    // 나중에 입력 여부를 확인하기 위해 설정함
    userData.address = { postalCode: "", address1: "", address2: "" };
  }

  if (phoneNumber) {
    phoneNumberInput.value = phoneNumber;
  }

  // 크롬 자동완성 삭제함.
  passwordInput.value = "";
}

// db에 정보 저장
async function saveUserData(e) {
  e.preventDefault();

  const fullName = fullNameInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const phoneNumber = phoneNumberInput.value;
  const currentPassword = currentPasswordInput.value;

  const isPasswordSame = password === passwordConfirm;
  const isPostalCodeChanged =
    postalCode !== (userData.address?.postalCode || "");
  const isAddress2Changed = address2 !== (userData.address?.address2 || "");
  const isAddressChanged = isPostalCodeChanged || isAddress2Changed;

  // 비밀번호를 새로 작성한 경우
  if (password && !isPasswordSame) {
    closeModal();
    return alert("비밀번호와 비밀번호확인이 일치하지 않습니다.");
  }

  const data = { currentPassword };

  // 초기값과 다를 경우 api 요청에 사용할 data 객체에 넣어줌
  if (fullName !== userData.fullName) {
    data.fullName = fullName;
  }

  if (password !== userData.password) {
    data.password = password;
  }

  // 주소를 변경했는데, 덜 입력한 경우
  if (isAddressChanged && !address2) {
    closeModal();
    return alert("주소를 모두 입력해 주세요.");
  }

  if (isAddressChanged) {
    data.address = {
      postalCode,
      address1,
      address2,
    };
  }

  if (phoneNumber && phoneNumber !== userData.phoneNumber) {
    data.phoneNumber = phoneNumber;
  }

  // 만약 업데이트할 것이 없다면 (디폴트인 currentPassword만 있어서 1개라면), 종료함
  const toUpdate = Object.keys(data);
  if (toUpdate.length === 1) {
    disableForm();
    closeModal();
    return alert("업데이트된 정보가 없습니다");
  }

  try {
    const { _id } = userData;
    // db에 수정된 정보 저장
    await Api.patch("/api/users", _id, data);

    alert("회원정보가 안전하게 저장되었습니다.");
    disableForm();
    closeModal();
  } catch (err) {
    alert(`회원정보 저장 과정에서 오류가 발생하였습니다: ${err}`);
  }
}
