import axios from "axios";
const URL = 'https://backend-nomadsociety-development.up.railway.app/countries/'
export async function getCountries() {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.get(URL ,  { headers: { Authorization: token } });
    console.log(res.data)
    return res.data;

}
export async function toggleVisited (countryId) {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.post(URL + `addVisited/${countryId}`, {} ,{ headers: { Authorization: token } }); 
    console.log('no se que soy',res.data)
    return res.data;
}