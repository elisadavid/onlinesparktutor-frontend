// import axios  from "axios";

// export default{
//     async login({ rootGetters},payload){
//         const res = await axios.post(`${rootGetters.getUrl}/api/User/login`, payload);
//         if (res.status>=200||res.status<300){
//             console.log(res);
//             return true;
//         }
//     }
// } 
import axios from "axios";

export default {
  async login({ commit,rootGetters }, payload) {
    try {
      const res = await axios.post(`${rootGetters.getUrl}/api/User/login`, payload);
      // Check if the response status is in the 2xx range
      if (res.status >= 200 && res.status < 300) {
        console.log(res);  // Successfully logged in, response logged
        commit('setstreamId',res.data.streamId);
        console.log("streamId",res.data.streamId);
        commit('setuserId',res.data.userId);
        
        
        return true;       // Return true to indicate success
      } else {
        return false;      // Return false if login failed (non 2xx status)
      }
    } catch (error) {
      console.error('Login failed:', error); // Log error for troubleshooting
      return false;        // Return false in case of error
    }
  },
  async tutorlogin({ commit, rootGetters }, payload) {
    try {
      const res = await axios.post(`${rootGetters.getUrl}/api/tutor/tutor_login`, payload);
      if (res.status >= 200 && res.status < 300) {
        const tutorId = res.data.tutor_id; // ✅ extract ID
        commit('settutorId', tutorId);
        return tutorId; // ✅ return tutorId directly
      } else {
        return null;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  }
  
  ,
  async registerStore({rootGetters},payload){
    const response = await axios.post(`${rootGetters.getUrl}/api/tutor/tutor_reg`,payload,{ headers: { "Content-Type": "multipart/form-data" }});
    if(response.status>=200 && response.status<300){
      console.log(response);
      return response;
}
},

};
