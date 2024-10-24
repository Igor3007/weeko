let configStorage = localStorage.getItem('userconfig') ? JSON.parse(localStorage.getItem('userconfig')) : {}
import { globalConfig } from "@/config/global"

const state = {
    //default
    theme: globalConfig.settings.themeDefault,
    name: 'User',
    email: '',
    id: '',

    // load from storage
    ...configStorage
}

const getters = {
    getUserConfig(state) {
        return state
    }
}

const mutations = {
    
    setUserData(state, data) {

        for(let key in state) {
            if(data[key]) {
                state[key] = data[key]
            }
        }

        localStorage.setItem('userconfig', JSON.stringify(state))
    }

}

const actions = {
    sendUserConfig(context, data) {
        context.commit('setUserData', data)
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
};