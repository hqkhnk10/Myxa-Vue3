<template>
    <section class="container-wrap">
        <the-header></the-header>
        <section class="container container-border">
            <the-aside></the-aside>
            <section class="container is-vertical">
                <main class="main">
                    <router-view></router-view>
                </main>
            </section>
        </section>
    </section>
</template>
<script>
import TheAside from './TheAside.vue'
import TheHeader from './TheHeader.vue'
export default {
    components: { TheHeader, TheAside },
    name: 'TheLayout',
}
</script>