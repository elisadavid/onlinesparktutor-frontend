// import axios  from "axios";

// export default{
//     async login({ rootGetters},payload){
//         const res = await axios.post(`${rootGetters.getUrl}/api/tutor/tutor_login`, payload);
//         if (res.status>=200||res.status<300){
//             console.log(res);
//             return true;
//         }
//     }
// }
import axios from "axios";

export default {
  // Existing login action
  async login({ rootGetters }, payload) {
    try {
      const res = await axios.post(`${rootGetters.getUrl}/api/tutor/tutor_login`, payload);
      if (res.status >= 200 && res.status < 300) {
        console.log(res);
        return res;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  // New fetchEducationLevels action
  async fetchEducationLevels({ rootGetters }) {
    try {
      const res = await axios.get(`${rootGetters.getUrl}/api/admin/get/education`);
      if (res.status >= 200 && res.status < 300) {
        console.log(res.data); // Logs the education level data fetched from the API
        return res.data; // Return the education levels to use in the component
      }
    } catch (error) {
      console.error("Error fetching education levels:", error);
      return [];
    }
  },
};
