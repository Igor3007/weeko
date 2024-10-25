<template>
  <div class="container">
    <headerWorkspace 
      @onChangeNav = changeCurrentWeek($event) 
      :weekNumber = weekNumber
      :currentYear = currentYear
      :currentMonth = currentMonth
      >
    </headerWorkspace>
    <workspaceDefault :tasks="createWeekParams" @onCreateTaskEditor="createTaskEditor()" ></workspaceDefault>
    <bottom-sheet ref="popupCreateTask" max-width="640px" @closed="beforeClosePopup" @opened="beforeOpenPopup">
       <taskEditor ref="taskEditor" />
    </bottom-sheet>
  </div>
   
</template>

<script>
 
import headerWorkspace from '../components/header-workspace/'
import workspaceDefault from '../components/workspace-default'
import bottomSheet from '@/common-components/bottom-sheet'
import taskEditor from '../components/task-editor/input.vue'
import { DateTime } from "luxon";
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'WorkSpace',
  components: {
    headerWorkspace, workspaceDefault, bottomSheet, taskEditor
  },

  data() {
    return {
      currentDate: DateTime.now(),
      weekNumber: DateTime.now().weekNumber,
      currentDay: DateTime.now().day,
      currentYear: DateTime.now().year,
      currentMonth: DateTime.now().month,
      weekParams: [],
      weekDays: [],
    }
  },

  created() {
    if(!this.getUserTasks.length) this.fetchUserTasks() 
  },

  computed:  {

    ...mapGetters([
      'getUserTasks',
    ]), 


    createWeekParams() { 

      const result = [];

      this.getDaysWeek(this.currentYear, this.weekNumber).forEach(item => {
        result.push({
            date: item,
            weekday: DateTime.fromSeconds(item).weekday,
            dateFormat: DateTime.fromSeconds(item).toFormat('dd.MM'),
            tasks: this.getTasksForDay(item)
        })
      })

      result.push({
        date: null,
        weekday: null,
        dateFormat: null,
        tasks: this.getTasksForDay('')
      })

      return result;

      }
  },

  methods: {

    ...mapActions([
      'fetchUserTasks', 'SendCreateTask'
    ]),

    beforeOpenPopup() {
     
    },

    beforeClosePopup() {
      let data = this.$refs.taskEditor.saveTask()

      if(data.title.length) {

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
      }
    },

    createTaskEditor() {
      this.$refs.popupCreateTask.open()
    },

    changeCurrentWeek(e) {

      switch(e.type) {
        case 'next': 
          this.currentDate = this.currentDate.startOf('week').plus({ weeks: 1 })
        break;

        case 'prev':
          this.currentDate = this.currentDate.startOf('week').minus({ weeks: 1 })
        break;
      }

      this.weekNumber = this.currentDate.weekNumber;
      this.currentYear = this.currentDate.year;
      this.currentMonth = this.currentDate.month;

    },

    getDaysWeek(year, weekNumber) {

      this.weekParams = [];

      const firstDayOfYear = DateTime.fromObject({ year: year, month: 1, day: 1 });
      const firstMonday = firstDayOfYear.startOf('week').plus({ weeks: weekNumber - 1 });

      for (let i = 0; i < 7; i++) {
          this.weekParams.push(firstMonday.plus({ days: i }).toSeconds());
      }
      return this.weekParams;
    },

    getTasksForDay(timestamp) {
      return this.getUserTasks.filter(item => {


        //если дата задачи меньше или равно текущей и у задачи заполнена дата
        if(Number(item.date) <= DateTime.now().startOf('day').toSeconds() && item.date && item.status == 'work') {

          //если дата равна текущей добавляем задачу на текущий день
          if(timestamp == DateTime.now().startOf('day').toSeconds()) {
            // if(item.status == 'work' && item.date) 
            return true
          }

        }else{
          if(Number(item.date) == Number(timestamp)) return true
        } 

        

        

      })
    },

    

  },

  watch: {
     
  }
}
</script> 
