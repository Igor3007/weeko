<template>
    <div class="header-workspace">
        <div class="header-workspace__nav">
            <div class="hw-nav">
                <div class="hw-nav__current">{{ lang.month[currentMonth] }} {{currentYear}}</div>
                <div class="hw-nav__prev" @click = "changeWeek('prev')">
                    <icon icon-name="ic_prev" ></icon>
                </div>
                <div class="hw-nav__next" @click = "changeWeek('next')">
                    <icon icon-name="ic_next" ></icon>
                </div>
            </div>
            <div class="hw-week-number">Неделя {{ weekNumber }}</div>
        </div>
        <div class="header-workspace__action">
            <ul>
                <li><icon icon-name="ic_62" ></icon></li>
                <li><icon icon-name="ic_smart" ></icon></li>
                <li @click="changeUserTheme" ><icon icon-name="ic_theme" ></icon></li>
                <li><icon icon-name="ic_user" ></icon></li>
                <li><icon icon-name="ic_menu" ></icon></li>
            </ul>
        </div>
    </div>
</template>

<script>

import icon from '@/common-components/icon'
import { mapGetters, mapActions } from 'vuex';

export default {

    name: 'header-workspace',

    components: {
        icon
    },

    computed: {
        ...mapGetters([
        'getUserConfig'
        ])
    },

    methods: {

        ...mapActions([
            'sendUserConfig'
        ]),

        changeWeek(type) {
            this.$emit('onChangeNav', {
                type
            })
        },

        changeUserTheme() {

             

            let theme = this.getUserConfig.theme == 'default' ? 'dark' : 'default'
            let htmlElement = document.documentElement;

            htmlElement.setAttribute('theme', theme);

            this.sendUserConfig({
                theme
            })

        }
    },

    props: {
        weekNumber: Number,
        currentYear: Number,
        currentMonth: [Number, String],
    }

}

</script>

<style lang="scss" >
    @import 'style.scss';
</style>