<template>
    <label class="checkbox">
        <input type="checkbox">
        <span class="checkbox__elem"></span>
        <span class="checkbox__text">{{ text }}</span>
    </label>
</template>

<script>
export default {
    name: 'checkbox-component',
    props: {
        text: String
    }
}
</script>

<style lang="scss">
    @import './style.scss';
</style> 