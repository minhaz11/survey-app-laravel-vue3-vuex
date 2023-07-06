
import {createStore} from 'vuex'
import axios from '../axios.js'



const tmpSurvey = [
    {
        id: 1,
        title: "Survey 1",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque maxime voluptatum explicabo sit ea voluptas quam quis quibusdam, expedita numquam?",
        status : "draft",
        image : "https://picsum.photos/300/300",
        created_at: "2021-05-01 00:00:00",
        updated_at: "2021-05-01 00:00:00",
        expire_date : "2021-05-01 00:00:00",
        questions : [
            {
                id: 1,
                question: "Question 1",
                type: "select",
                description: "This is a question",
                data:{
                    options : [
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120002",
                            text : "USA"
                        },
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120003",
                            text : "Canada"
                        },
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120004",
                            text : "Mexico"
                        },
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120005",
                            text : "Brazil"
                        },
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120006",
                            text : "Argentina"
                        }
                    ]
                }
            },
            {
                id: 2,
                question: "Question 2",
                type: "checkbox",
                description: "This is a question of checkbox type",
                data:{
                    options : [
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120002",
                            text : "JS"
                        },
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120003",
                            text : "PHP"
                        },
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120004",
                            text : "RUBY"
                        },
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120005",
                            text : "Python"
                        },
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120006",
                            text : "GOlang"
                        }
                    ]
                }
            },
            {
                id: 3,
                question: "Question 3",
                type: "text",
                description: "This is a question of text type",
                data:{
                    options : [
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120002",
                            text : "laravel"
                        },
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120003",
                            text : "Django"
                        },
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120004",
                            text : "Exlixir"
                        },
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120005",
                            text : "Gin"
                        },
                        {
                            uuid : "1455745c-1bab-11ee-be56-0242ac120006",
                            text : "Flask"
                        }
                    ]
                }
            },
            {
                id: 4,
                question: "Question 4",
                type: "text",
                description: "This is a question of textarea type",
                data:{}
            },
        ]
    
    },
    {
        id: 2,
        title: "Survey 2",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque maxime voluptatum explicabo sit ea voluptas quam quis quibusdam, expedita numquam?",
        status : "draft",
        image : "https://picsum.photos/400/300",
        created_at: "2021-05-01 00:00:00",
        updated_at: "2021-05-01 00:00:00",
        expire_date : "2021-05-01 00:00:00",
        questions : []
    }
]

const store = createStore({
    state : {
       user : {
        data : {},
        token : sessionStorage.getItem('TOKEN')
       },
       surveys : [...tmpSurvey]
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
        },
        async logout({ commit }) {
            try {
              const response = await axios.post('/logout');
              commit('logout',response);
              return response.data;
            } catch (error) {
                throw new Error(error.response.data.error);
            }
        }
    },
    mutations : {
        logout : (state,response) => {
            if(response.data.success){
                state.user.data = {};
                state.user.token = null;
                sessionStorage.removeItem('TOKEN');
            }
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