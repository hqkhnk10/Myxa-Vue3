<template>
    <header class="header">
        <div class="flex items-center justify-center">
            <div class="icon__launcher header__icon-launcher"></div>
            <div class="logo-content">
                <img src="@/assets/icon/logo.svg" class="nav-logo" alt="MISA Logo"/>
                <a class="logo-title">MISA CeGov</a>
            </div>
        </div>
        <div class="flex items-center justify-center">
            <div class="tooltip">
                <div class="icon-header">
                    <div class="icon-margin icon__notification"></div>
                </div>
                <span class="arrow-bottom tooltiptext tooltiptext-bottom">{{ t('reuse.notification') }}</span>
            </div>
            <div class="tooltip">
                <div class="icon-header">
                    <div class="icon-margin icon__help"></div>
                </div>
                <span class="arrow-bottom tooltiptext tooltiptext-bottom">{{ t('reuse.guide') }}</span>
            </div>
            <div class="tooltip">
                <div class="icon-header">
                    <div class="icon-margin icon__book"></div>
                </div>
                <span class="arrow-bottom tooltiptext tooltiptext-bottom">{{ t('reuse.bookRules') }}</span>
            </div>
            <div class="tooltip">
                <div class="icon-header">
                    <div class="icon-margin icon__setting"></div>
                </div>
                <span class="arrow-bottom tooltiptext tooltiptext-bottom">{{ t('reuse.settingSystem') }}</span>
            </div>
            <img src="@/assets/img/getavatar.png"
                class="avatar" alt="avatar">
        </div>
    </header>
</template>
<script>
export default {
    name: 'TheHeader'
}
</script>