import axios from "axios";

const state = {
    currentLang: {}
}

const getters = {

}

const mutations = {

}

const actions = {
    fetchLang(context, data) {
        axios.get('/lang/ru.json')
            .then(response => {
                context;
                data;
                console.log(response.data)

            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
};