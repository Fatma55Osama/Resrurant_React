import { create } from "zustand";
import burger from '../../assets/imgs/CategoriesImgs/Layer 1.png'
import pizza from '../../assets/imgs/CategoriesImgs/Layer 2.png'
import cold from '../../assets/imgs/CategoriesImgs/Layer 3.png'
import pasta from '../../assets/imgs/CategoriesImgs/Layer 4.png'
import dessert from '../../assets/imgs/CategoriesImgs/Layer 5.png'
import wok from '../../assets/imgs/CategoriesImgs/Layer 6.png'
export const useCategories = create((set) => ({
  data: [
    { documentId:1,name: "Cold Drinks", path: "cold", imgUrl: cold },
    { documentId:2,name: "Burgers", path: "burgeres", imgUrl: burger },
    { documentId:3,name: "Pizza", path: "pizza", imgUrl: pizza },
    { documentId:4,name: "Pasta", path: "pasta", imgUrl: pasta },
    { documentId:5,name: "wok", path: "wok", imgUrl: wok },
    { documentId:6,name: "Desserts", path: "Desserts", imgUrl: dessert },
  ],
  active_cat_id :0, // category هنا يعتبر مش فاتح اي 
  setActiveId:(activeTab)=>(set(()=>({active_cat_id:activeTab}))), //  يكتب مكانة category علشان لما اكون في اي  active_cat_id علشان تغير في قيمة method هنا عملنا 
  resetActiveId:()=>(set(()=>({active_cat_id:0}))) // بعمل كدا علشان في حالة انه غير اسم المسار يكون كدا كدا معتمد علي مكانه او رقمه مش اسمه علشان انا طبعا حاسة اسم الكاتيجوي بالمسار
}));
