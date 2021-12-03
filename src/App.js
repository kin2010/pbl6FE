import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";

import Login from "./components/Auth/Login";
import AuthContextProvider from "./Context/AuthContext";
import Auth from "./components/Auth/Auth";
import Shop from "./components/Shop/Shop";
import Navi from "./HomePage/Navi";
import Footer from "./HomePage/Footer";
import CategoryContextProvider from "./Context/CategoryContext";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import CartContextProvider from "./Context/CartContext";
import About from "./components/About";
import ViewCart from "./components/Cart/ViewCart";
import PublicRoute from "./Utils/PublicRoute";
import Admin from "./components/Admin/Admin";
import DefaultLayout from "../src/components/Admin/layout/layout";
import Checkout from "./components/Cart/Checkout";
import PrivateRoute from "./Utils/PrivateRoute";
import OrderHistory from "./components/Order/OrderHistory";
import OrderDetail from "./components/Order/OrderDetail";
import Profile from "./components/Profile";
function App() {
	return (
		<>
			<>
				{" "}
				<AuthContextProvider>
					<CategoryContextProvider>
						<CartContextProvider>
							<Router>
								<Switch>
									{/* <Navi></Navi> */}
									<Route exact path="/" component={Home}></Route>
									<PublicRoute
										exact
										path="/login"
										component={(props) => (
											<Auth {...props} auth="login"></Auth>
										)}
									></PublicRoute>
									<Route
										exact
										path="/register"
										render={() => <Auth auth="register"></Auth>}
									></Route>
									<PrivateRoute
										exact
										path="/shop"
										component={Shop}
									></PrivateRoute>
									<PrivateRoute
										exact
										path="/orderhistory"
										component={OrderHistory}
									></PrivateRoute>
									<Route
										exact
										path="/viewcart"
										component={ViewCart}
									></Route>
									<PublicRoute
										exact
										path="/about"
										component={About}
									></PublicRoute>
									<Route exact path="/shop-single/:id">
										<SingleProduct />
									</Route>
									<Route exact path="/order/:id">
										<OrderDetail />
									</Route>
									<Route exact path="/profile" component={Profile} />
									<Route
										path="/admin"
										component={DefaultLayout}
									></Route>
									{/* <Footer></Footer> */}
									<PrivateRoute
										exact
										path="/checkout"
										component={Checkout}
									/>
								</Switch>
							</Router>
						</CartContextProvider>
					</CategoryContextProvider>
				</AuthContextProvider>
			</>
		</>
	);
}

export default App;
