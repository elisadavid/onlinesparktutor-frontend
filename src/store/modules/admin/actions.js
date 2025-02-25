import axios  from "axios";

export default{
    async adminlogin({ rootGetters},payload){
        const res = await axios.post(`${rootGetters.getUrl}/api/Admin/login`, payload);
        if (res.status>=200||res.status<300){
            console.log(res);
            return true;
        }
    }
}