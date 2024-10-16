<template>
  <div class="container">
    <headerWorkspace></headerWorkspace>
    <workspaceDefault></workspaceDefault>
  </div>
   
</template>

<script>
 
import headerWorkspace from '../components/header-workspace/'
import workspaceDefault from '../components/workspace-default'

export default {
  name: 'HomeView',
  components: {
    headerWorkspace, workspaceDefault
  }
}
</script>
