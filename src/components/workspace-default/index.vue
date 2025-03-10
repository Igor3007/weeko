<template>
  <div>
    <div class="workspace-default">
      <div class="workspace-default__list">
        <div v-for="day in params" :key="day.date" class="workspace-default__item"
            :class="{
              'is-last-day' : day.dates < isCurrentDay && day.date,
              'is-current-day' : day.date == isCurrentDay && day.date
            }"
          >
          <div class="wk-day"> 

            <div v-if="day.weekday" class="wk-day__head">
              <div class="wk-day__date" :title="day.date">{{ day.dateFormat }}</div>
              <div class="wk-day__weekday">{{lang.weekday[day.weekday]}}</div>
            </div>

            <div v-else class="wk-day__head">
              <div class="wk-day__date">{{ lang['LIST_NO_DATE'] }}</div>
              <div class="wk-day__weekday"></div>
            </div>

            <div class="wk-day__main">  
               
                <draggable class="wk-day__tasks" handle=".wk-day-task__title" :list="day.tasks" group="tasks" @change="changeSortable($event, day)">
                  <div class="wk-day__task" 
                        v-for="item in day.tasks" 
                        :key="item.id"
                        :class="{
                          'is-status-closed' : item.status == 'closed'
                        }" 

                    >

                    <div class="wk-day-task" v-if="item.title" >
                      <div class="wk-day-task__title">{{ item.title }} {{ item.date ? getDateTaskFormat(item.date) : '' }}</div> 
                      <div class="wk-day-task__checkbox" v-if="item.title">
                        <checkbox 
                          :checked="item.status == 'closed'"
                          @onChange="changeTaskCheckbox($event, day, item)"
                        ></checkbox> 
                      </div>
                    </div>

                    <div class="wk-create-task" v-else >
                      <div class="wk-create-task__input">
                        <input type="text" :placeholder="lang.ADD_TASK" @focus="onFocusInputCreate" @blur="onBlurInputCreate($event, day)">
                      </div>
                      <div class="wk-create-task__icon" @click="createTaskOnEditor(day)">
                        <icon icon-name="ic_add" ></icon> 
                      </div>
                    </div>
                  </div>
                </draggable>
                
               
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import checkbox from '@/common-components/checkbox'
  import draggable from 'vuedraggable'
  import { mapMutations, mapActions } from 'vuex'
  import { DateTime } from "luxon";
  import icon from '@/common-components/icon'

  export default {
      name: 'workspace-default',
      components: {
        checkbox,
        draggable,
        icon
      },

      data() {
        return {
          dayParams: {
            minWeekDay: 8,
            minWeekEnd: 4,
            minAll: 4
          }
           
        }
      },

      

      computed:{

         

        isCurrentDay() {
          return DateTime.now().startOf('day').toSeconds()
        },

        
        params() {

          let res = []

          this.tasks.forEach(day => {

            this.createRowEmpty(day)

            res.push({
              ...day
            })
            
          }); 

          return res || []
        }
        

         
      },

      props: {
        tasks: [Array, Object]
      },

     

      methods: {

        ...mapMutations([
          'changeTaskDate',
          'changeTaskStatus',
        ]),

        ...mapActions([
          'SendChangeTask',
          'SendCreateTask'
        ]), 

        getDateTaskFormat(date) {
          return DateTime.fromSeconds(Number(date)).toFormat('dd.MM')
        },

        createTaskOnEditor(day) {
          this.$emit('onCreateTaskEditor', {
            day
          })
        },

        onBlurInputCreate(e, day) { 

          e.target.setAttribute('placeholder', this.lang.ADD_TASK)

            if(e.target.value) {
              this.createTask({
                title: e.target.value,
                date: day.date
              })

              e.target.value = ''
            }
        },

        onFocusInputCreate(e) {

          e.target.classList.add('animate-swap')

          e.target.setAttribute('placeholder', this.lang.ENTER_NAME)
          

          setTimeout(() => {!e.target.classList.contains('animate-swap') || e.target.classList.remove('animate-swap')}, 120)
        },

        createTask(data) {
            let params = {
              
              id: Math.floor(Math.random() * 9999),
              date: DateTime.now().startOf('day').toSeconds() ,
              title: "Новая задача",
              desc: "",
              status: "work",
              user_id: "1",
              color: "",

              ...data
            }

            this.SendCreateTask(params)
        },

        createRowEmpty(day) {

            //если будний день
            if(day.weekday <= 5 && day.weekday) {
              
              let count = day.tasks.length
              let delta = this.dayParams.minWeekDay - count

              for(let i=0; i < delta; i++) {
                day.tasks.push({})
              }

              if(delta <= 0) {
                day.tasks.push({})
              }
            }

            // выходной и бездаты

            if(day.weekday > 5 || !day.weekday) {
              
              let count = day.tasks.length
              let delta = this.dayParams.minWeekEnd - count

              for(let i=0; i < delta; i++) {
                day.tasks.push({})
              }

              if(delta <= 0) {
                day.tasks.push({})
              }
            }

           
        },

        changeSortable(e, day) {

           

          if('added' in e) {

            // if(day.date < DateTime.now().startOf('day').toSeconds()) {
            //   return false
            // }

            this.changeTaskDate({
              task_id: e.added.element.id,
              newDate: day.date
            })

          }

          
        },

        changeTaskCheckbox(e, day, task) {

           

          this.SendChangeTask({
              task_id : task.id,
              newStatus : e.checked ? 'closed' : 'work',
              newDate: day.date
            })
          
        }
      }
  }

</script>

<style lang="scss" >
  @import './style.scss';
  @import './wk-day.scss';
</style>