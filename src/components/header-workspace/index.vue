<template>
    <div class="header-workspace">
        <div class="header-workspace__nav">
            <div class="hw-nav">
                <div class="hw-nav__current">Апрель 2024</div>
                <div class="hw-nav__prev">
                    <icon icon-name="ic_prev" ></icon>
                </div>
                <div class="hw-nav__next">
                    <icon icon-name="ic_next" ></icon>
                </div>
            </div>
            <div class="hw-week-number">Неделя 15</div>
        </div>
        <div class="header-workspace__action">
            <ul>
                <li><icon icon-name="ic_62" ></icon></li>
                <li><icon icon-name="ic_smart" ></icon></li>
                <li><icon icon-name="ic_theme" ></icon></li>
                <li><icon icon-name="ic_user" ></icon></li>
                <li><icon icon-name="ic_menu" ></icon></li>
            </ul>
        </div>
    </div>
</template>

<script>

import icon from '@/common-components/icon'

export default {

    name: 'header-workspace',

    components: {
        icon
    }

}

</script>

<style lang="scss" >
    @import 'style.scss';
</style>