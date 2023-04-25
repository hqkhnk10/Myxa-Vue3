<template>
    <section class="container-wrap" style="height: 100vh;">
        <the-header></the-header>
        <section class="container" style="border: 1px solid rgb(238, 238, 238)">
            <the-aside></the-aside>
            <section class="container is-vertical">
                <the-main></the-main>
            </section>
        </section>
    </section>
</template>
<script>
import TheAside from './TheAside.vue'
import TheHeader from './TheHeader.vue'
import TheMain from './TheMain.vue'
export default {
    components: { TheHeader, TheAside, TheMain },
    name: 'TheLayout',
}
</script>