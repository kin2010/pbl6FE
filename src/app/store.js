import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../components/Admin/components/Categories/CategoriesSlice";
import shopReducer from "../components/Shop/ShopSlice";
import CartReducer from "../components/Cart/CartSlice";
import ProductReducer from "../components/Admin/components/Product/ProductSlice";
import OrderRuducer from "../components/Order/OrderSlice";
const rootReducer = {
	categories: categoriesReducer,
	shops: shopReducer,
	carts: CartReducer,
	products: ProductReducer,
	orders: OrderRuducer,
};
const store = configureStore({
	reducer: rootReducer,
});
export default store;
