<template>
  <svg
    :viewBox="viewBox"
    :width="width"
    :height="height"
    class="icon"
  >
    <use :xlink:href="href" />
  </svg>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'icon',
  props: {
    // Имя файла без расширения
    iconName: {
      type: String,
      required: true
    },
    // Ширина в пикселах
    width: {
      type: [Number, String],
      default: 24
    },
    // Высота в пикселах
    height: {
      type: [Number, String],
      default: 24
    },
    // Цвет заливки, по умолчанию - цвет окружающего текста
    fill: {
      type: String,
      default: 'currentColor'
    }
  },
  computed: {
    // Расположение SVG-файлов
    file () {
      let icon = require(`@/assets/icons/${this.iconName}.svg`)

      if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
        icon = icon.default
      }

      return icon
    },
    viewBox () {
      return this.file && this.file.viewBox ? this.file.viewBox : '0 0 ' + parseInt(this.width) + ' ' + parseInt(this.height)
    },
    href () {
      return this.file || ''
    }
  }
}
</script>
