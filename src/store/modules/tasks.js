import axios from "axios";
import config from "@/config";

const state = {
    tasks: []
}

const getters = {
    getUserTasks(state) {
        return state.tasks
    }
}

const mutations = {
    setUserTask(state, data) {

        data.forEach(element => {
            state.tasks.push(element)
        });

    },
}

const actions = {
    async fetchUserTasks(context) {
        await axios.get(config.api + 'tasks.json')
            .then(response => {
                context.commit('setUserTask', response.data)
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
};