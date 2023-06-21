<template>
  <loading-screen />
  <router-view></router-view>
  <misa-notification />
</template>
<script>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import LoadingScreen from './components/LoadingScreen.vue'
export default {
  name: 'App',
  components: {
      LoadingScreen
    },
  mounted(){
    const router = useRouter()
    if(router.currentRoute.value.path == '/'){
      // router.push('/study')
    }
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