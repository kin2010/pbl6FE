import axios from "axios";
import { apiURL } from "../Context/Constants";
import axiosClient from "./AxoisClient";
const ShopApi = {
	getProduct: (params) => {
		const url = `${apiURL}/products`;
		return axios.get(url, { params });
	},
	createProduct: (params) => {
		const url = `${apiURL}/products`;
		return axios.post(url, params);
	},
	getOne: (params) => {
		const url = `${apiURL}/products/${params}`;
		return axios.get(url);
	},
	update: (params) => {
		console.log(params);
		const url = `${apiURL}/products/${params.id}`;
		return axios.put(url, params.value);
	},
};
export default ShopApi;
