<template>
  <div>
    <div class="workspace-default">
      <div class="workspace-default__list">
        <div v-for="day in days" :key="day.name" class="workspace-default__item">
          <div class="wk-day">
            <div class="wk-day__head">
              <div class="wk-day__date">{{ day.date }}</div>
              <div class="wk-day__weekday">{{day.name}}</div>
            </div>
            <div class="wk-day__main">
              <div class="wk-day__tasks">
                <div class="wk-day__task" v-for="item in tasks" :key="item">
                  <div class="wk-day-task">
                    <div class="wk-day-task__title">{{ item }}</div>
                    <div class="wk-day-task__checkbox">
                      <checkbox></checkbox> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import checkbox from '@/common-components/checkbox'

  export default {
      name: 'workspace-default',
      components: {
        checkbox
      },

      data() {
        return {

          days: [
            {
              name: 'Пн',
              date: '08.04',
              type: 'day'
            },
            {
              name: 'Вт',
              date: '09.04',
              type: 'day'
            },
            {
              name: 'Ср',
              date: '10.04',
              type: 'day'
            },
            {
              name: 'Чт',
              date: '11.04',
              type: 'day'
            },
            {
              name: 'Пт',
              date: '12.04',
              type: 'day'
            },
            {
              name: 'Сб',
              date: '13.04',
              type: 'day'
            },
            {
              name: 'Вс',
              date: '14.04',
              type: 'day'
            },
            {
              name: 'fr1',
              date: 'Список без даты',
              type: 'free'
            },
            {
              name: 'fr2',
              date: 'Список без даты',
              type: 'free'
            },
            {
              name: 'fr3',
              date: 'Список без даты',
              type: 'free'
            },
          ],

          tasks: [
            'Задача', 
            'Наведение (курсор ладонь)', 
            'Задача 3 с длинным текстом...', 
            'Наведение на иконку', 
          ]
        }
      }
  }

</script>

<style lang="scss" >
  @import './style.scss';
  @import './wk-day.scss';
</style>