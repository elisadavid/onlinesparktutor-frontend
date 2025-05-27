export default{
settutorId(state,payload){
    state.auth.tutorId=payload;
    sessionStorage.setItem("tutorId",payload);
}
}