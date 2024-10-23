<template>
    <label class="checkbox">
        <input type="checkbox" :checked="checked">
        <span class="checkbox__elem"></span>
        <span class="checkbox__text">{{ text }}</span>
    </label>
</template>

<script>
export default {
    name: 'checkbox-component',
    props: {
        text: String,
        checked: Boolean
    }
}
</script>

<style lang="scss">
    @import './style.scss';
</style> 