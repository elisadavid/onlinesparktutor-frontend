import axios  from "axios";

export default{
    async login({ rootGetters},payload){
        const res = await axios.post(`${rootGetters.getUrl}/api/admin/login`, payload);
        if (res.status>=200||res.status<300){
            console.log(res);
            return true;
        }
    },
    async profile({ rootGetters }, payload) {
        try {
          const res = await axios.get(`${rootGetters.getUrl}/tutor/profile/${payload.tutor_id}`);
          
          if (res.status >= 200 && res.status < 300) {
            console.log(res);
            return res.data; // Return the profile data
          }
        } catch (error) {
          console.error('Error fetching tutor profile:', error);
          throw error;
        }
      },
      

//   async fetchEducationLevels({ rootGetters ,payload}) {
//     try {
//       // Make the API call to fetch education levels
//       const res = await axios.get(`${rootGetters.getUrl}/api/admin/get/education`,payload);

//       // Check if the response is successful
//       if (res.status >= 200 && res.status < 300) {
//         console.log('Education levels fetched:', res.data);
//         return res.data; // Return the education levels data
//       }
//     } catch (error) {
//       console.error('Error fetching education levels:', error);
//       return false; // Return false if an error occurs
//     }
//   },
}


