<template>
    <div class="auth-popup" >
        <div class="auth-popup__logo" >
          <span class="bgimage" :style="'backgroundImage: url('+getLogo+')'" ></span>
        </div>
        <div class="auth-popup__title" >{{ lang.HELLO_IN_APP}}</div>
        <div class="auth-popup__desc" >{{ lang.HELLO_IN_APP_DESC }}</div>
        <div class="auth-popup__btn" >
          <button class="btn" >{{ lang.HELLO_IN_APP_LOGIN }}</button>
          <button class="btn btn-line" >{{ lang.HELLO_IN_APP_TRY }}</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'auth-popup',
        data() {
            return {
                logo: {
                    'dark':'/img/logo-dark.svg', 
                    'default':'/img/logo.svg', 
                }   
            }
        },

        computed: {
            getLogo() {
                return this.logo[this.$store.state.userConfig.theme] || '/img/logo.svg'
            }
        }
    }
</script>

<style lang="scss" >
    @import 'auth-popup.scss';
</style>