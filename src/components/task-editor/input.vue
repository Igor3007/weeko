<template>
  <div class="task-editor">
    <div class="task-editor__top">
      <div class="task-editor__actions">
        <div class="te-actions">
          <div class="te-actions__date">
            <icon icon-name="ic_calendar" ></icon>
            <span>{{formatDate}}</span>
          </div>

          <div class="te-actions__remove">
            <icon icon-name="ic_trash" ></icon>
          </div>

          <div class="te-actions__colorpicker">
            <colorSelect />
          </div>

        </div>
      </div>
    </div>
    <div class="task-editor__title">
      <div class="te-title">
        <div class="te-title__name">
          <div class="te-title__text">
            <input v-if="isEditTitle" type="text" ref="titleInput" v-model="taskTitle" :placeholder="lang.ENTER_NAME">
            <span v-else >{{ taskTitle }}</span>
          </div>
          <div class="te-title__edit" @click="isEditTitle = !isEditTitle" v-if="!isEditTitle">
            <icon icon-name="ic_pen" ></icon>
          </div>
        </div>
        <div class="te-title__close">
          <icon icon-name="ic_check" ></icon>
        </div>
      </div>
    </div>
    <div class="task-editor__desc">
      <vue-editor v-model="content" :editorToolbar="customToolbar" :placeholder="lang.EDITOR_PLACEHOLDER"></vue-editor>
    </div>
  </div>
</template>

<script>

import icon from '@/common-components/icon'
import colorSelect from '@/common-components/color-select'
import { VueEditor } from "vue2-editor";
import { DateTime } from "luxon";

export default {
    name: 'task-editor',
    components: {icon, colorSelect, VueEditor},

    data() {
      return {
        content: '',
        isEditTitle: false,
        taskTitle: '',
        customToolbar: [
          [{ header: 2 }, "bold", { list: "bullet" }, "link"],
        ]
      }
    },

    props: {
      date: {
        type: Number,
        default: DateTime.now().toSeconds()
      },

      title: String,
      
      desc: String,

      color: {
        type: String,
        default: null
      },

      status: {
        type: String,
        default: 'work'
      },
    },

    created() {
      if(!this.taskTitle) {
        this.isEditTitle = true;
      }

      this.taskTitle = this.title
      this.taskColor = this.color
      this.taskStatus = this.status
    },

    computed: {
      formatDate() {
        return this.lang.weekday[DateTime.fromSeconds(this.date).weekday]+', '+DateTime.fromSeconds(this.date).toFormat('dd.MM.yyyy')
      }
    },

    methods: {
      saveTask() {
        return {
          title: this.taskTitle,
          desc: this.content,
          color: this.taskColor,
          status: this.taskStatus
        }
      }
    }
}
</script>

<style lang="scss" >
  @import './vue2-editor.scss';
  @import './editors-style.scss';
  @import './style.scss';
</style>