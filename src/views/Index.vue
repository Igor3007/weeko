<template>
  <div class="container">
    <headerWorkspace></headerWorkspace>
    <workspaceDefault></workspaceDefault>
  </div>
   
</template>

<script>
 
import headerWorkspace from '../components/header-workspace/'
import workspaceDefault from '../components/workspace-default'
import { DateTime } from "luxon";

export default {
  name: 'HomeView',
  components: {
    headerWorkspace, workspaceDefault
  },

  data() {
    return {
      weekNumber: 15,
      weekParams: []
    }
  },

  mounted() {
    console.log()

    

  },

  methods: {
    getDaysWeek(year, weekNumber) {
      // Получаем первый день года
      const firstDayOfYear = DateTime.fromObject({ year: year, month: 1, day: 1 });
      // Находим первый понедельник года
      const firstMonday = firstDayOfYear.startOf('week').plus({ weeks: weekNumber - 1 });
      // Заполняем массив днями недели
      for (let i = 0; i < 7; i++) {
          this.weekParams.push(firstMonday.plus({ days: i }).toSeconds());
      }
      return this.weekParams;
    },

    createWeekParams() {

      this.getDaysWeek(2024, this.weekNumber)

    }

  }
}
</script> 
