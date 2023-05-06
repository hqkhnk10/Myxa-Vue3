<template>
    <aside class="aside" aria-label="menu" :class="shrinkMenu ? 'small' : ''">
        <ul role="menubar" class="menu">
            <li v-for="(item, index) in routes" :key="index" role="menuitem" @click="selectMenuItem(item)">
                <div class="submenu" :class="item.selected ? 'menu-item-selected' : ' '" v-if="!item.meta.hidden">
                    <div class="menu-item-icon" v-if="item.meta.icon">
                        <img :src=item.meta.icon alt="logo">
                    </div>
                    <div class="menu__content" :class="shrinkMenu ? 'hide' : ''">
                        <div class="submenu__title">
                            {{ t(item.meta.title) }}</div>
                        <div v-if="item.children" class="menu-item-icon-right" style="margin: 0;">
                            <img src="https://cegovapp.misacdn.net/cegov/img/ic_arrow_black_right.c6cd6189.svg"
                                alt="arrow-right">
                        </div>
                    </div>
                </div>
                <div class="menu-line" v-if="item.meta.afterLine"></div>
            </li>
        </ul>
        <div class="closemenu" @click="toogleMenu()" :class="shrinkMenu ? 'rotate' : ''">
            <div class="flex items-center justify-center">
                <img src="https://cegovapp.misacdn.net/cegov/img/ic_toggle.4abb3c52.svg" alt="Shrink">
            </div>
            <span class="menu-item-icon-right" :class="shrinkMenu ? 'hide' : ''">Thu gọn</span>
        </div>
    </aside>
    <aside class="aside" aria-label="subMenu" v-if="openSubMenu" v-click-outside="onClickOutside">
        <ul role="menubar" class="menu">
            <li v-for="(item, index) in childrenRoutes" :key="index" role="menuitem" class="submenu"
                :class="item.selected ? 'menu-item-selected' : ' '" @click="selectSubMenuItem(item)">
                <div class="menu-item-icon" v-if="item.meta.icon">
                    <img :src=item.meta.icon alt="logo">
                </div>
                <div class="flex" style="justify-content: space-between;flex: 1">
                    <div class="submenu__title">
                        {{ t(item.meta.title) }}</div>
                </div>
            </li>
        </ul>
    </aside>
</template>
<script>
import { router, routes } from '@/routers/router';
export default {
    name: 'TheAside',
    data() {
        return {
            routes: routes,
            openSubMenu: false,
            shrinkMenu: false,
            currentRoute: router.currentRoute.value.path
        }
    },
    computed: {
        childrenRoutes() {
            return this.routes.filter(route => route.selected)[0]?.children
        }
    },
    /**
     * push to emulationTitle when open the site
     */
    beforeMount() {
        if(this.currentRoute == '/')
        {
            router.push('/emulationTitle')
        }
    }
    ,
    /**
     * Find route in router array
     */
    mounted() {
        this.routes.forEach(route => {
            const child = route?.children?.find(child => child.path == this.currentRoute)
            if (child) {
                route.selected = true
                child.selected = true
            }
            else {
                if (route.path == this.currentRoute) {
                    route.selected = true
                }
            }
        })
    },
    methods: {
        /**
         * push router if menu has no children, open sidebar if there are
         * @param {*} item 
         */
        selectMenuItem(item) {
            routes.forEach(route => {
                route.selected = false
            })
            item.selected = true
            if (item.children) {
                this.openSubMenu = true
            }
            else {
                router.push(item.path)
            }
        },
        /**
         * select and close submenu when click child route
         * @param {*} item 
         */
        selectSubMenuItem(item) {
            this.childrenRoutes.forEach(route => {
                route.selected = false
            })
            item.selected = true
            this.openSubMenu = !this.openSubMenu
            router.push(item.path)
        },
        toogleMenu() {
            this.shrinkMenu = !this.shrinkMenu
        },
        onClickOutside() {
            this.openSubMenu = !this.openSubMenu
        }
    }
}
</script>