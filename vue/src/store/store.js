
import {createStore} from 'vuex'
import axios from '../axios.js'

const store = createStore({
    state : {
       user : {
        data : {},
        token : sessionStorage.getItem('TOKEN')
       }
    },
    getters : {},
    actions :{

        async register({ commit }, user) {
            try {
              const response = await axios.post('/register', user);
              const { token, user: userData } = response.data;
              commit('setToken', token);
              commit('setUser', userData);
              return response.data;
            } catch (error) {
              throw new Error(error.response.data.error);
            }
        },

        async login({ commit }, user) {
            try {
              const response = await axios.post('/login', user);
              const { token, user: userData } = response.data;
              commit('setToken', token);
              commit('setUser', userData);
              return response.data;
            } catch (error) {
                if (error.response.data.errors) {
                    
                }
                throw new Error(error.response.data.error);
            }
        }
    },
    mutations : {
        logout : (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setToken : (state, token) => {
            state.user.token = token;
            sessionStorage.setItem('TOKEN', token);
        },
        setUser : (state, user) => {
            state.user.data = user;
        }
    },
    modules : {}

})

export default store