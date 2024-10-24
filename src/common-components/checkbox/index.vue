<template>
    <label class="checkbox">
        <input type="checkbox" @change="onChange" :checked="checked">
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
    },

    methods: {
        onChange(e) {
            this.$emit('onChange', {
                checked: e.target.checked 
            })
        }
    }
}
</script>

<style lang="scss">
    @import './style.scss';
</style> 