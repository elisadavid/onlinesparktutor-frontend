import { createStore } from "vuex";
import rootActions from './actions.js';
import rootGetters from './getters.js';
import rootMutations from './mutations.js';
import adminModule from './modules/admin/index.js'


const store=createStore({
    modules: {
        admin: adminModule
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