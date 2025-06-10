export default{
settutorId(state,payload){
    state.auth.tutorId=payload;
    sessionStorage.setItem("tutorId",payload);
    
},
setstreamId(state,payload){
    state.auth.streamId=payload;
    sessionStorage.setItem("streamId",payload);
    
},
setuserId(state,payload){
    state.auth.userId=payload;
    sessionStorage.setItem("userId",payload);
}
}