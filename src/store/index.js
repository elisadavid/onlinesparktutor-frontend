import { createStore } from "vuex";
import rootActions from './actions.js';
import rootGetters from './getters.js';
import rootMutations from './mutations.js';
import adminModule from './modules/admin/index.js';
import tutorModule from './modules/tutor/index.js';
import userModule from './modules/user/index.js';



const store=createStore({
    modules: {
        admin: adminModule,
        tutor: tutorModule,
        user: userModule,
        
    },
state(){
    return{
        base_url:'http://localhost:8089',
    
    };

},
mutations:rootMutations,
actions:rootActions,
getters:rootGetters
})

export default store;

