import axios from "axios";
export async function getCountries() {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.get('https://backend-nomadsociety-development.up.railway.app/countries/', { headers: { Authorization: token } });
    console.log(res.data)
    return res.data;

}