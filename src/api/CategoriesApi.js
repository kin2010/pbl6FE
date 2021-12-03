import axios from "axios";
import { apiURL } from "../Context/Constants";
const CategoriesApi = {
	get: () => {
		const url = `${apiURL}/categories`;
		return axios.get(url);
	},
};
export default CategoriesApi;
