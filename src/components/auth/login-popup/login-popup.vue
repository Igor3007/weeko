<template>
   
    <div class="auth-popup" >
        <div class="auth-popup__logo" >
          <span class="bgimage" :style="'backgroundImage: url('+getLogo+')'" ></span>
        </div>
        <div class="auth-popup__title" >Вход в аккаунт</div>
        <div class="auth-popup__form" >
            <form method="POST" >
                <div class="form">
                    <div class="form__item">
                        <div class="form__subitem">
                            <input type="email" placeholder="Электронная почта">
                        </div> 
                    </div> 
                    <div class="form__item">
                        <div class="form__subitem">
                            <input type="password" placeholder="Пароль">
                        </div> 
                    </div> 
                </div>
            </form>
        </div>
        <div class="auth-popup__recovery" >
            <a href="#">Забыли пароль?</a>
        </div>

        <div class="auth-popup__login" >
            <button class="btn" >Войти</button>
        </div>

        <div class="auth-popup__google" >
            <button class="btn btn-line" >Войти через Google</button>
        </div>

        <div class="auth-popup__reg" >
            <a href="reg" >Регистрация</a>
        </div>
        
    </div>
   
</template>

<script>
    export default {
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
    @import 'login-popup.scss';
</style>