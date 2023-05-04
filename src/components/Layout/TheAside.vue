<template>
    <aside class="aside" aria-label="menu" :class="shrinkMenu ? 'small' : ''">
        <ul role="menubar" class="menu">
            <li v-for="(item, index) in routes" :key="index" role="menuitem" class="submenu"
                :class="item.selected ? 'menu-item-selected' : ' '" @click="selectMenuItem(item)">
                <div class="menu-item-icon">
                    <img :src=item.meta.icon alt="logo">
                </div>
                <div class="menu__content" :class="shrinkMenu ? 'hide' : ''">
                    <div class="submenu__title">
                        {{ item.meta.title }}</div>
                    <div v-if="item.children" class="menu-item-icon-right" style="margin: 0;">
                        <img src="https://cegovapp.misacdn.net/cegov/img/ic_arrow_black_right.c6cd6189.svg"
                            alt="arrow-right">
                    </div>
                </div>
            </li>
            <li role="menuitem" class="submenu" router="index.html">
                <div class="menu-item-icon">
                    <img src="https://cegovapp.misacdn.net/cegov/img/ic_dashboard_default.110fa5f3.svg" alt="logo">
                </div>
                <div class="submenu__title">
                    {{ t('summary') }}</div>
            </li>
            <li role="menuitem" class="submenu">
                <div class="menu-item-icon">
                    <img src="https://cegovapp.misacdn.net/cegov/img/ic_movement_default.102c9e3d.svg" alt="thi đua">
                </div>
                <div class="flex" style="justify-content: space-between;flex: 1">
                    <div class="submenu__title">
                        Thi đua
                    </div>
                    <div class="menu-item-icon-right" style="margin: 0;">
                        <img src="https://cegovapp.misacdn.net/cegov/img/ic_arrow_black_right.c6cd6189.svg"
                            alt="arrow-right">
                    </div>
                </div>
            </li>
            <li role="menuitem" class="submenu">
                <div class="menu-item-icon">
                    <img src="https://cegovapp.misacdn.net/cegov/img/ic_reward_default.156d6945.svg" alt="Khen thưởng">
                </div>
                <div class="flex" style="justify-content: space-between;flex: 1">
                    <div class="submenu__title">
                        Khen thưởng
                    </div>
                    <div class="menu-item-icon-right" style="margin: 0;">
                        <img src="https://cegovapp.misacdn.net/cegov/img/ic_arrow_black_right.c6cd6189.svg"
                            alt="arrow right">
                    </div>
                </div>
            </li>
            <li role="menuitem" class="submenu">
                <div class="menu-item-icon">
                    <img src="https://cegovapp.misacdn.net/cegov/img/ic_decision_menu_default.cae653f2.svg"
                        alt="Quyết định">
                </div>
                <div class="flex" style="justify-content: space-between;flex: 1">
                    <div class="submenu__title">
                        Quyết định
                    </div>
                    <div class="menu-item-icon-right" style="margin: 0;">
                        <img src="https://cegovapp.misacdn.net/cegov/img/ic_arrow_black_right.c6cd6189.svg"
                            alt="arrow right">
                    </div>
                </div>
            </li>
            <li role="menuitem" class="submenu">
                <div class="menu-item-icon">
                    <img src="https://cegovapp.misacdn.net/cegov/img/ic_profile_default.d730fb8f.svg" alt="Profile">
                </div>
                <div class="flex" style="justify-content: space-between;flex: 1">
                    <div class="submenu__title">
                        Hồ sơ
                    </div>
                    <div class="menu-item-icon-right" style="margin: 0;">
                        <img src="https://cegovapp.misacdn.net/cegov/img/ic_arrow_black_right.c6cd6189.svg"
                            alt="Right arrow">
                    </div>
                </div>
            </li>
            <li role="menuitem" class="submenu">
                <div class="menu-item-icon">
                    <img src="https://cegovapp.misacdn.net/cegov/img/ic_search_default.903d371b.svg" alt="Search">
                </div>
                <div class="flex" style="justify-content: space-between;flex: 1">
                    <div class="submenu__title">
                        Tra cứu
                    </div>
                    <div class="menu-item-icon-right" style="margin: 0;">
                        <img src="https://cegovapp.misacdn.net/cegov/img/ic_arrow_black_right.c6cd6189.svg"
                            alt="Right arrow">
                    </div>
                </div>
            </li>
            <li role="menuitem" class="submenu">
                <div class="menu-item-icon">
                    <img src="https://cegovapp.misacdn.net/cegov/img/ic_report_default.67157268.svg" alt="report">
                </div>
                <div class="submenu__title">
                    Báo cáo</div>
            </li>
            <div class="menu-line"></div>
            <li role="menuitem" class="submenu menu-item-selected" router="pages/category.html">
                <div class="menu-item-icon">
                    <img src="https://cegovapp.misacdn.net/cegov/img/ic_category.f257fcc6.svg" alt="Danh mục">
                </div>
                <div class="flex" style="justify-content: space-between;flex: 1">
                    <div class="submenu__title">
                        Danh mục
                    </div>
                    <div class="menu-item-icon-right" style="margin: 0;">
                        <img src="https://cegovapp.misacdn.net/cegov/img/ic_arrow_black_right.c6cd6189.svg"
                            alt="Right arrow">
                    </div>
                </div>
            </li>
            <li role="menuitem" class="submenu">
                <div class="menu-item-icon">
                    <img src="https://cegovapp.misacdn.net/cegov/img/ic_setting_default.be222d4a.svg" alt="Setting">
                </div>
                <div class="flex" style="justify-content: space-between;flex: 1">
                    <div class="submenu__title">
                        Thiết lập
                    </div>
                    <div class="menu-item-icon-right" style="margin: 0;">
                        <img src="https://cegovapp.misacdn.net/cegov/img/ic_arrow_black_right.c6cd6189.svg"
                            alt="Right arrow">
                    </div>
                </div>
            </li>
            <div class="menu-line"></div>
            <li role="menuitem" class="submenu">
                <div class="menu-item-icon">
                    <img src="https://cegovapp.misacdn.net/cegov/img/ic_guide_default.186420dc.svg" alt="Guide">
                </div>
                <div class="flex" style="justify-content: space-between;flex: 1">
                    <div class="submenu__title">
                        Hướng dẫn
                    </div>
                    <div class="menu-item-icon-right" style="margin: 0;">
                        <img src="https://cegovapp.misacdn.net/cegov/img/ic_arrow_black_right.c6cd6189.svg"
                            alt="Right arrow">
                    </div>
                </div>
            </li>
        </ul>
        <div class="closemenu" @click="toogleMenu()" :class="shrinkMenu ? 'rotate' : ''">
            <div class="flex items-center justify-center">
                <img src="https://cegovapp.misacdn.net/cegov/img/ic_toggle.4abb3c52.svg" alt="Shrink">
            </div>
            <span class="menu-item-icon-right" :class="shrinkMenu ? 'hide' : ''">Thu gọn</span>
        </div>
    </aside>
    <aside class="aside" aria-label="subMenu" v-if="openSubMenu">
        <ul role="menubar" class="menu">
            <li v-for="(item, index) in childrenRoutes" :key="index" role="menuitem" class="submenu"
                :class="item.selected ? 'menu-item-selected' : ' '" @click="selectSubMenuItem(item)">
                <div class="menu-item-icon">
                    <img :src=item.meta.icon alt="logo">
                </div>
                <div class="flex" style="justify-content: space-between;flex: 1">
                    <div class="submenu__title">
                        {{ item.meta.title }}</div>
                </div>
            </li>
        </ul>
        <div class="closemenu">
            <div class="flex items-center justify-center">
                <img src="https://cegovapp.misacdn.net/cegov/img/ic_toggle.4abb3c52.svg" alt="Shrink">
            </div>
            <span class="menu-item-icon-right">Thu gọn</span>
        </div>
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
            shrinkMenu: false
        }
    },
    computed: {
        childrenRoutes() {
            return this.routes.filter(route => route.selected)[0]?.children
        },
        currentRoute(){
            return router.currentRoute.value.path
        }
    },
    watch: {
        currentRoute(newRoute){
            console.log('1');
            this.routes.forEach(route => {
                const child = route.children.find(child => child.path == newRoute)
                if(child){
                    route.selected = true
                }
                else{
                    if(route.path == newRoute){
                        route.selected = true
                    }
                    else{
                        // router.push('/notFound')
                    }
                }
            })
        }
    },
    methods: {
        log() {
            console.log('abc', this.currentRoute)
        },
        selectMenuItem(item) {
            routes.forEach(route => {
                route.selected = false
            })
            item.selected = true
            if (item.children) {
                router.push(item.path)
                this.openSubMenu = true
            }
        },
        selectSubMenuItem(item) {
            this.childrenRoutes.forEach(route => {
                route.selected = false
            })
            item.selected = true
            router.push(item.path)
        },
        toogleMenu() {
            this.shrinkMenu = !this.shrinkMenu
        }
    }
}
</script>