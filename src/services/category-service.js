import { categoryModel } from "../db/models/category-model.js";
import { subcategoryModel } from "../db/models/subcategory-model.js";

class CategoryService {
    // 카테고리 생성
    async addCat(newCat) {
        const categoryName = newCat.categoryName;
        const subcategoryName = newCat.subcategoryName;

        // 부모 카테고리 중복 확인 
        const category = await categoryModel.findByCat(categoryName);
        if (category) {
            // 서브 카테고리 생성
            const subCatinCats = category.subcategory;
            
            for(const subcatId of subCatinCats){
                const subcat = await subcategoryModel.findById(subcatId);
                const name = subcat.subcategoryName;

                if (subcategoryName == name) {
                    throw new Error("이미 존재하는 서브 카테고리입니다.");
                    return;
                }
            }
           
            const addSubcat =  await subcategoryModel.create(subcategoryName);
            console.log("add -> ", addSubcat);
            if (!addSubcat) {
                throw new Error("서브 카테고리가 만들어지지 않았습니다.")
            }

            const categoryId = category._id;
            const addSubcatId = addSubcat._id;

            // 부모 카테고리에 서브 카테고리 참조 
            const subcatRefcat = await categoryModel.refSubcat(categoryId, addSubcatId);

            return subcatRefcat;

        } else {
            // 부모 카테고리 생성 
            const createCat = await categoryModel.create(categoryName);
            const addSubcat = await subcategoryModel.create(subcategoryName);

            const newCatId = createCat._id;
            const newSubcatId = addSubcat._id;

            // 부모 카테고리에 서브 카테고리 참조 
            const subcatRefcat = await categoryModel.refSubcat(newCatId, newSubcatId);

            return subcatRefcat;
        }

    }

    // 전체 카테고리 정보 조회
    async getAllCatService() {
        const allCatInfo = await categoryModel.findAll();
        // const allSubcatInfo = await subcategoryModel.findAll();
        const AllCategory = [];

        // allCatInfo.forEach( (catInfo) =>
        for(const catInfo of allCatInfo) {
            const catIds = catInfo.subcategory;

            // catIds.forEach( async (subcatId) =>            
            for (const subcatId of catIds) {

                const subcatInCat = await subcategoryModel.findById(subcatId);
                if (subcatInCat) {
                    const res = {};
                    const subcatName = subcatInCat.subcategoryName;
                    const subcatProductQauntity = subcatInCat.productQuantity;

                    // response로 보내줄 객체 생성!!
                    res.categoryName = catInfo.categoryName;
                    res.subcategoryName = subcatName;
                    res.productQauntity = subcatProductQauntity;

                    AllCategory.push(res);
                }
            }
        }       
        return { AllCategory };
    }
}

const categoryService = new CategoryService();

export { categoryService };