import axios from "axios";
const URL = 'https://backend-nomadsociety-development.up.railway.app/countries/'
export async function getCountries() {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.get(URL ,  { headers: { Authorization: token } });
    console.log(res.data)
    return res.data;

}
export async function addVisitor (countryId, userId) {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.get(URL + `/${countryId}/users/${userId}`,  { headers: { Authorization: token } }); //Añade visitor al schema Country (*Id del usuario*)//
    console.log('no se que soy',res.data)
    return res.data;
}