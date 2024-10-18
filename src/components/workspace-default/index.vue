<template>
  <div>
    <div class="workspace-default">
      <div class="workspace-default__list">
        <div v-for="day in params" :key="day.date" class="workspace-default__item">
          <div class="wk-day">

            <div v-if="day.weekday" class="wk-day__head">
              <div class="wk-day__date">{{ day.dateFormat }}</div>
              <div class="wk-day__weekday">{{day.weekday}}</div>
            </div>

            <div v-else class="wk-day__head">
              <div class="wk-day__date">Список без даты</div>
              <div class="wk-day__weekday"></div>
            </div>

            <div class="wk-day__main">
              <div class="wk-day__tasks">

                <div class="wk-day__task" v-for="item in day.tasks" :key="item.id">
                  <div class="wk-day-task">
                    <div class="wk-day-task__title">{{ item.title }}</div>
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

          
          dayParams: {
            minWeekDay: 8,
            minWeekEnd: 4,
            minAll: 4
          }
           
        }
      },

      created() {
        console.log(this.lang)
      },

      computed:{

        
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

           
        }
      }
  }

</script>

<style lang="scss" >
  @import './style.scss';
  @import './wk-day.scss';
</style>