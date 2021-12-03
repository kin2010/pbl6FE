import axios from "axios";
import { apiURL } from "../Context/Constants";

const OrderApi = {
	createOrder: (params) => {
		const url = `${apiURL}/orders`;
		return axios.post(url, params);
	},
	Myorder: (params) => {
		const url = `${apiURL}/orders/my-orders`;
		return axios.get(url);
	},
	GetAll: (params) => {
		const url = `${apiURL}/orders`;
		return axios.get(url, params);
	},
};
export default OrderApi;
