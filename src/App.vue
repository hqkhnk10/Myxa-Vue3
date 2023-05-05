<template>
  <router-view></router-view>
</template>
<script>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'App',
  mounted(){
    const router = useRouter()
    // Set the initial page title
    document.title = 'CeGov'
    // Update the page title when the route changes
    watch(
      () => router.currentRoute.value.meta.title,
      (title) => {
        document.title = this.t(title)
      }
    )
  }
}
</script>
<style>
@import url('./css/main.css');
</style>