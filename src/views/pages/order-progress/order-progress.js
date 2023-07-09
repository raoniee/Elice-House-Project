import { drawHeader } from "../../components/header/header.js";
import { drawFooter } from "../../components/footer/footer.js";

// Header, Footer 템플릿 삽입
drawHeader();
drawFooter();

const searchAddressBtn = document.querySelector("#search-address-btn");
searchAddressBtn.addEventListener("click", searchAddress);

//주소 찾기
function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      const { roadAddress: roadAddr } = data; // 도로명 주소 변수

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("roadAddress").value = roadAddr;
      document.querySelector("#detailAddress").value = "";
    },
  }).open();
}
