export const drawHeader = () => {
  let headerTemplate = `
    <div class="py-3 border-bottom">
      <div class="container d-flex flex-wrap justify-content-center">
        <a
          href="/"
          class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none"
        >
          <svg class="bi me-2" width="40" height="32">
            <use xlink:href="#bootstrap" />
          </svg>
          <span class="fs-4">로고 넣기</span>
        </a>
        <ul class="nav">
          <li class="nav-item">
            <a href="" class="nav-link link-dark px-2">Login</a>
          </li>
          <li class="nav-item">
            <a href="" class="nav-link link-dark px-2">Sign up</a>
          </li>
          <li class="nav-item">
            <a href="../order-cart/order-cart.html" class="nav-link link-dark px-2">장바구니</a>
          </li>
        </ul>
      </div>
    </div>
    <nav class="py-2 bg-light border-bottom">
      <div class="container">
        <ul class="nav nav-bottom justify-content-center nav-pills" style="list-style: none;">
        </ul>
      </div>
    </nav>
    `;
  // .header 부분에 삽입
  const headerTag = document.querySelector(".header");
  headerTag.innerHTML = headerTemplate;
};

/* <li class="nav-item">
  <div class="dropdown text-end">
    <a
      href="#"
      class="d-block link-dark text-decoration-none nav-link"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      >
    </a>
    <ul class="dropdown-menu text-small">
      <li><a class="dropdown-item" href="#"></a></li>
      <li><a class="dropdown-item" href="#"></a></li>
      <li><a class="dropdown-item" href="#"></a></li>
      <li><a class="dropdown-item" href="#"></a></li>
    </ul>
  </div>
</li> */

async function getHeaderData() {
  let menudata = await fetch("/api/admin/categories").then((res) => res.json());

  return menudata;
}

export const insertHeaderData = async () => {
  const ul = document.querySelector(".nav-bottom");

  const AllMenuData = await getHeaderData();
  const MenuData = AllMenuData.AllCategory;
  //console.log("MenuData", MenuData);

  const MenuArray = [
    {
      CategoryName: "CategoryName",
      CategoryId: "CategoryId",
      SubCategory: [
        {
          SubCategoryName: "SubCategoryName",
          SubCategoryId: "SubCategoryId",
        },
      ],
    },
  ];

  const MenuObj = {
    CategoryName: "CategoryName",
    CategoryId: "CategoryId",
    SubCategory: [
      {
        SubCategoryName: "SubCategoryName",
        SubCategoryId: "SubCategoryId",
      },
    ],
  };

  //const { categoryName, subcategoryName } = MenuData;

  const deduplicationMenu = [
    ...new Map(MenuData.map((value) => [value.categoryName, value])).values(),
  ];
  //console.log("deduplicationMenu", deduplicationMenu);

  const deduplicationCategoryName = deduplicationMenu.map(
    (v) => v.categoryName
  );
  //console.log("deduplicationCategoryName", deduplicationCategoryName);

  const deduplicationCategoryId = deduplicationMenu.map((v) => v.categoryId);

  // for (let i = 0; i < 카테고리 길이; i++) {
  //   // 카테고리 이름 , 카테고리 id
  //   for (let j = 0; j < 서브 카테고리 길이; j++) {
  //     // i번째의 => j번째 서브 카테고리 이름 , 서브 카테고리 id
  //   }
  // }

  // let htmlcategory = "";
  // let htmlsubcategory = "";

  // for (let i = 0; i < deduplicationCategoryName.length; i++) {
  //   const subcategoryName = MenuData.filter(
  //     (v) => v.categoryName === deduplicationCategoryName[i]
  //   ).map((v) => v.subcategoryName);
  //   console.log("subcategoryName", subcategoryName);

  //   const subcategoryId = MenuData.filter(
  //     (v) => v.categoryId === deduplicationCategoryId[i]
  //   ).map((v) => v.subcategoryId);
  //   console.log("subcategoryId", subcategoryId);

  //   for (let j = 0; j < subcategoryName.length; j++) {
  //     const subCategory = `<li><a class="dropdown-item" href="/api/products/${subcategoryId[i]}">${subcategoryName[j]}</a></li>`;
  //     htmlsubcategory += subCategory;
  //   }

  //   const Category = `<li class="nav-item">
  //                         <div class="dropdown text-end">
  //                           <a
  //                             href="#"
  //                             class="d-block link-dark text-decoration-none nav-link nav-bottom-link"
  //                             data-bs-toggle="dropdown"
  //                             aria-expanded="false"
  //                             id="${deduplicationCategoryId[i]}"
  //                             >
  //                             ${deduplicationCategoryName[i]}
  //                           </a>
  //                           <ul class="dropdown-menu text-small subnav">${htmlsubcategory}</ul>
  //                         </div>
  //                       </li>`;
  //   htmlcategory += Category;
  //   ul.innerHTML = htmlcategory;
  // }
};
