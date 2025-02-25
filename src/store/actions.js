import axios  from "axios";

export default{
    async login({ rootGetters},payload){
        const res = await axios.post(`${rootGetters.getUrl}/api/User/login`, payload);
        if (res.status>=200||res.status<300){
            console.log(res);
            return true;
        }
    }
}