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
                <span class="tooltiptext tooltiptext-bottom">{{ t('reuse.notification') }}</span>
            </div>
            <div class="tooltip">
                <div class="icon-header">
                    <div class="icon-margin icon__help"></div>
                </div>
                <span class="tooltiptext tooltiptext-bottom">{{ t('reuse.guide') }}</span>
            </div>
            <div class="tooltip">
                <div class="icon-header">
                    <div class="icon-margin icon__book"></div>
                </div>
                <span class="tooltiptext tooltiptext-bottom">{{ t('reuse.bookRules') }}</span>
            </div>
            <div class="tooltip">
                <div class="icon-header">
                    <div class="icon-margin icon__setting"></div>
                </div>
                <span class="tooltiptext tooltiptext-bottom">{{ t('reuse.settingSystem') }}</span>
            </div>
            <img src="https://id.misa.vn/image/getavatar?userId=74c75e29-bc30-4210-87e2-d61a38f91a21&width=64&height=64"
                class="avatar" alt="avatar">
        </div>
    </header>
</template>
<script>
export default {
    name: 'TheHeader'
}
</script>