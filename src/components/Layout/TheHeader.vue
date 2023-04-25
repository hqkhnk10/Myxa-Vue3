<template>
    <header class="header" style="height: 56px;">
        <div class="flex items-center justify-center">
            <div class="icon__launcher" style="margin: 0 16px"></div>
            <div class="logo-content">
                <i src="https://cegovapp.misacdn.net/cegov/img/ic_cegoLogo_new.89475e3e.svg" class="nav-logo"
                    alt="MISA Logo" style="cursor: pointer;" onclick="changeMenuItem()" />
                <a class="logo-title">MISA CeGov</a>
            </div>
        </div>
        <div class="flex items-center justify-center">
            <div class="tooltip">
                <div class="icon-header">
                    <div class="icon-margin icon__notification"></div>
                </div>
                <span class="tooltiptext tooltiptext-bottom">Thông báo</span>
            </div>
            <div class="tooltip">
                <div class="icon-header">
                    <div class="icon-margin icon__help"></div>
                </div>
                <span class="tooltiptext tooltiptext-bottom">Hướng dẫn</span>
            </div>
            <div class="tooltip">
                <div class="icon-header">
                    <div class="icon-margin icon__book"></div>
                </div>
                <span class="tooltiptext tooltiptext-bottom">Văn bản quy định</span>
            </div>
            <div class="tooltip">
                <div class="icon-header">
                    <div class="icon-margin icon__setting"></div>
                </div>
                <span class="tooltiptext tooltiptext-bottom">Thiết lập hệ thống</span>
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