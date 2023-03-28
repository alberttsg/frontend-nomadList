import axios from "axios";
const URL = import.meta.env.VITE_DEV_URL;

export async function getCountries() {
	const token = JSON.parse(localStorage.getItem('token'));
	const config = { headers: { Authorization: token } };
	const res = await axios.get(URL + 'countries/', config);
	return res.data;

}
export async function toggleVisited(countryId) {
	const token = JSON.parse(localStorage.getItem('token'));
	const config = { headers: { Authorization: token } };
	const res = await axios.post(URL + 'countries/addVisited/' + countryId, {}, config);
	return res.data;
}