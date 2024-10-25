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

    changeTaskDate(state, data) {

        state.tasks.forEach(item => {
            if (item.id == data.task_id) {
                item.date = data.newDate
                console.log(item.date)
            }
        })

    },

    changeTaskStatus(state, data) {

        state.tasks.forEach(item => {
            if (item.id == data.task_id) {
                item.status = data.newStatus
                item.date = data.newDate
            }
        })

    }
}

const actions = {
    async fetchUserTasks(context) {
        await axios.get(config.api + 'tasks.json')
            .then(response => {
                context.commit('setUserTask', response.data)
            })
    },

    SendChangeTask(context, data) {
        context.commit('changeTaskStatus', data)
    },

    SendCreateTask(context, data) {
        context.commit('setUserTask', [data])
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
};