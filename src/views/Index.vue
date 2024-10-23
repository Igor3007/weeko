<template>
  <div class="container">
    <headerWorkspace 
      @onChangeNav = changeCurrentWeek($event) 
      :weekNumber = weekNumber
      :currentYear = currentYear
      :currentMonth = currentMonth
      >
    </headerWorkspace>
    <workspaceDefault :tasks="createWeekParams" ></workspaceDefault>
  </div>
   
</template>

<script>
 
import headerWorkspace from '../components/header-workspace/'
import workspaceDefault from '../components/workspace-default'
import { DateTime } from "luxon";

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'WorkSpace',
  components: {
    headerWorkspace, workspaceDefault
  },

  data() {
    return {
      currentDate: DateTime.now(),
      weekNumber: DateTime.now().weekNumber,
      currentYear: DateTime.now().year,
      currentMonth: DateTime.now().month,
      weekParams: [],
      weekDays: [],
    }
  },

  created() {
    
    this.fetchUserTasks().then((() => {
      // this.weekDays = this.createWeekParams

      // console.log(this.weekDays)

      //console.log(this.createWeekParams())
        
    }))

    
  },

  mounted() {
    //console.log(this.getUserTasks)
  },

  computed:  {
    ...mapGetters([
      'getUserTasks',
    ]),


    createWeekParams() { 

      const result = [];

      this.getDaysWeek(2024, this.weekNumber).forEach(item => {
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
      'fetchUserTasks'
    ]),

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
      return this.getUserTasks.filter(item => Number(item.date) == Number(timestamp))
    },

    

  },

  watch: {
     
  }
}
</script> 
