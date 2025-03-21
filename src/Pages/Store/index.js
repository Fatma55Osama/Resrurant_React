import { create } from "zustand";
import burger from "../../assets/imgs/CategoriesImgs/Layer 1.png";
import pizza from "../../assets/imgs/CategoriesImgs/Layer 2.png";
import cold from "../../assets/imgs/CategoriesImgs/Layer 3.png";
import pasta from "../../assets/imgs/CategoriesImgs/Layer 4.png";
import dessert from "../../assets/imgs/CategoriesImgs/Layer 5.png";
import wok from "../../assets/imgs/CategoriesImgs/Layer 6.png";
export const useCategories = create((set) => ({
  data: [
    // { documentId:1,name: "Cold Drinks", path: "cold", imgUrl: cold },
    // { documentId:2,name: "Burgers", path: "burgeres", imgUrl: burger },
    // { documentId:3,name: "Pizza", path: "pizza", imgUrl: pizza },
    // { documentId:4,name: "Pasta", path: "pasta", imgUrl: pasta },
    // { documentId:5,name: "wok", path: "wok", imgUrl: wok },
    // { documentId:6,name: "Desserts", path: "Desserts", imgUrl: dessert },
  ],

  setData: (categories) => set(() => ({ data: categories })),

  domain: "http://localhost:1337",
  active_cat_id: 0, // category هنا يعتبر مش فاتح اي
  setActiveId: (activeTab) => set(() => ({ active_cat_id: activeTab })), //  يكتب مكانة category علشان لما اكون في اي  active_cat_id علشان تغير في قيمة method هنا عملنا
  resetActiveId: () => set(() => ({ active_cat_id: 0 })), // بعمل كدا علشان في حالة انه غير اسم المسار يكون كدا كدا معتمد علي مكانه او رقمه مش اسمه علشان انا طبعا حاسة اسم الكاتيجوي بالمسار
}));
export const useSideCart = create((set) => ({
  productInCart: [],
  Cartmodal: false,
  checkOutIndex: false,
  openCart: () => set(() => ({ Cartmodal: true })),
  closeCart: () => set(() => ({ Cartmodal: false })),

  openCheckOut: () => set(() => ({ checkOutIndex: true })),
  closeCheckOut: () => set(() => ({ checkOutIndex: false })),
  decrementqty: (documentId) =>
    set((state) => {
      let copyproduct = [...state.productInCart];
      let index = copyproduct.findIndex((el) => el.documentId == documentId);
      if (copyproduct[index].qty > 1) {
        copyproduct[index].qty--;
      } else {
        copyproduct.splice(index, 1);
      }
      let obj = { productInCart: copyproduct };
      return obj;
    }),
  incrementqty: (documentId) =>
    set((state) => {
      let copyproduct = [...state.productInCart];
      let index = copyproduct.findIndex((el) => el.documentId == documentId);
      if (copyproduct[index].qty) {
        copyproduct[index].qty++;
      }
      return { productInCart: copyproduct };
    }),
  addToCart: (product) =>
    set((state) => {
      let copy = [...state.productInCart]; // addToCart هيدوس عليه علشان  user  هنا بيعبر عن الزرار اللي ال  product ال
      let obj = copy.find((el) => el.documentId == product.documentId);
      if (obj) {
        state.incrementqty(product.documentId);
      } else {
        copy.push(product);
      }
      return { productInCart: copy };
    }),
  resetCart: () => set(() => ({ productInCart: [] })),

  // getTotal: () =>
  //   set((state) => {
  //     return state.productInCart.reduce((acc, el) => acc +( el.qty * el.price),0);
  //   }),
}));
export const useInvoiceDetails = create((set) => ({
  index: false,
  activeInvoiceId:null, //ودا علشان لما ادوس علي اي فاتورة المودال يكون عارف
  openDetails:()=>(set(()=>({index:true}))),
  closeDetails:()=>(set(()=>({index:false}))),
  
  setActiveInvoiceId: (id)=>(set(()=>({activeInvoiceId:id}))),
  resetActiveInvoiceId:()=>(set(()=>({activeInvoiceId:null})))
}));
