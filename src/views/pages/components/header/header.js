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
            <a href="" class="nav-link link-dark px-2">장바구니</a>
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

export const insertHeaderData = () => {
  const ul = document.querySelector(".nav-bottom");

  const Nav = [
    {
      categoryName: "침실가구",
      subcategoryName: "침대1",
    },
    {
      categoryName: "침실가구",
      subcategoryName: "침대2",
    },
    {
      categoryName: "침실가구",
      subcategoryName: "침대3",
    },
    {
      categoryName: "침실가구",
      subcategoryName: "침대4",
    },
    {
      categoryName: "옷장/수납장",
      subcategoryName: "옷장1",
    },
    {
      categoryName: "옷장/수납장",
      subcategoryName: "옷장2",
    },
    {
      categoryName: "옷장/수납장",
      subcategoryName: "옷장3",
    },
    {
      categoryName: "옷장/수납장",
      subcategoryName: "옷장4",
    },
    {
      categoryName: "거실가구",
      subcategoryName: "쇼파1",
    },
    {
      categoryName: "거실가구",
      subcategoryName: "쇼파2",
    },
    {
      categoryName: "거실가구",
      subcategoryName: "쇼파3",
    },
    {
      categoryName: "거실가구",
      subcategoryName: "쇼파4",
    },
    {
      categoryName: "주방가구",
      subcategoryName: "싱크대1",
    },
    {
      categoryName: "주방가구",
      subcategoryName: "싱크대2",
    },
    {
      categoryName: "주방가구",
      subcategoryName: "싱크대3",
    },
    {
      categoryName: "주방가구",
      subcategoryName: "싱크대4",
    },
    {
      categoryName: "서재가구",
      subcategoryName: "책장1",
    },
    {
      categoryName: "서재가구",
      subcategoryName: "책장2",
    },
    {
      categoryName: "서재가구",
      subcategoryName: "책장3",
    },
    {
      categoryName: "서재가구",
      subcategoryName: "책장4",
    },
  ];
  const { categoryName, subcategoryName } = Nav;

  const deduplicationNav = [
    ...new Map(Nav.map((value) => [value.categoryName, value])).values(),
  ];
  const deduplicationCategoryName = deduplicationNav.map((v) => v.categoryName);

  let htmlcategory = "";

  for (let i = 0; i < deduplicationCategoryName.length; i++) {
    const Category = `<li class="nav-item">
                          <div class="dropdown text-end">
                            <a
                              href="#"
                              class="d-block link-dark text-decoration-none nav-link nav-bottom-link"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              >
                            </a>${deduplicationCategoryName[i]}
                            <ul class="dropdown-menu text-small subnav"></ul>
                          </div>
                        </li>`;
    htmlcategory += Category;
    ul.innerHTML = htmlcategory;

    let htmlsubcategory = "";

    const result = Nav.filter(
      (v) => v.categoryName === deduplicationCategoryName[i]
    ).map((v) => v.subcategoryName);
    //console.log(result);

    for (let j = 0; j < result.length; j++) {
      //console.log("아이는", i, "j", j, "result", result[j]);

      const subCategory = `<li><a class="dropdown-item" href="#">${result[j]}</a></li>`;
      htmlsubcategory += subCategory;
    }

    //console.log(htmlsubcategory);
    const subul = document.querySelector(".subnav");
    //console.log(subul);
    subul.innerHTML = htmlsubcategory;
  }
};
