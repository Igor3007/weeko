<template>
  <div>
    <div class="workspace-default">
      <div class="workspace-default__list">
        <div v-for="day in params" :key="day.date" class="workspace-default__item"
            :class="{
              'is-last-day' : day.date < statusDay 
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
               
                <draggable class="wk-day__tasks" :list="day.tasks" group="tasks" @change="changeSortable($event, day)">
                <div class="wk-day__task" 
                      v-for="item in day.tasks" 
                      :key="item.id"
                      :class="{
                        'is-status-closed' : item.status == 'closed'
                      }" 

                  >
                  <div class="wk-day-task" >
                    <div class="wk-day-task__title">{{ item.title }}</div> 
                    <div class="wk-day-task__checkbox" v-if="item.title">
                      <checkbox :checked="item.status == 'closed'" ></checkbox> 
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
  import { mapMutations } from 'vuex'
  import { DateTime } from "luxon";

  export default {
      name: 'workspace-default',
      components: {
        checkbox,
        draggable
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

        statusDay(){
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
          'changeTaskDate'
        ]),

        createRowEmpty(day) {

            //если будний день
            if(day.weekday <= 5 && day.weekday) {
              
              let count = day.tasks.length
              let delta = this.dayParams.minWeekDay - count

              for(let i=0; i < delta; i++) {
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
            }

           
        },

        changeSortable(e, day) {
          if('added' in e) {

            if(day.date < DateTime.now().startOf('day').toSeconds()) {
              return false
            }

            this.changeTaskDate({
              task_id: e.added.element.id,
              newDate: day.date
            })

          }

          
        }
      }
  }

</script>

<style lang="scss" >
  @import './style.scss';
  @import './wk-day.scss';
</style>