<template>
    <div>
        {{ t('lang.changeLanguage') }}
        <misa-combobox :modelValue="lang" :options="langOptions" @change="changeLang"></misa-combobox>
    </div>
    <div>
        Nút chính:
        <misa-button type="primary" @click="click">Button</misa-button>
        <misa-button type="primary" @click="click" disabled>Button Disabled</misa-button>
        <div>Nút phụ:</div>
        <misa-button type="secondary" @click="click">Button</misa-button>
        <misa-button type="danger" @click="click">Button</misa-button>
        <div>Nút link:</div>
        <misa-button type="link" @click="click">Button</misa-button>
        <div>Nút Icon:</div>
        <misa-button type="icon" @click="click">
            <img src="@/assets/icon/plus-icon-green.svg" alt="Plus icon">
        </misa-button>
        <div>Nút Combo:</div>
        <misa-button type="primary-combo" @click="click">
            <span style="padding-right:24px">Button</span>
            <div class="vertical"></div>
            <img src="@/assets/icon/down-arrow-icon.svg" style="width: 16px;" alt="Down arrow icon">
        </misa-button>
        <div>Nút Combo với icon:</div>
        <misa-button type="primary-combo" @click="click">
            <img src="@/assets/icon/plus-icon.svg" alt="Plus icon" class="button__icon_pr6">
            <span>Button</span>
        </misa-button>
    </div>
    <div>
        Input: {{ input }}
        <misa-input placeholder="Xin vui lòng nhập" v-model="input" @focus="focusEvent" @change="changeEvent"
            :validateEvent="minLength" style="width:300px;position: relative;"></misa-input>

            Error Input: {{ input2 }}
        <misa-input placeholder="Xin vui lòng nhập" v-model="input2" @focus="focusEvent" @change="changeEvent" :isValid="false"
            :validateEvent="minLength" style="width:300px;position: relative;"></misa-input>
    </div>
    <div>
        <div>Dialog</div>
        <misa-button type="primary" @click="toogleDialog">OpenDialog</misa-button>
        <misa-dialog v-model="dialogShow" title="Title" width="60%" top="10vh">
            <div class="dialog__body">
                <span>This is a message</span>
            </div>
            <div class="dialog__footer">
                <misa-button type="secondary" @click="toogleDialog">
                    <span>Button 2</span>
                </misa-button>
                <misa-button type="primary" @click="toogleDialog">
                    <span>Button 1</span>
                </misa-button>
            </div>
        </misa-dialog>
    </div>
    <div>
        <div>M-Combo-Box</div>
        <misa-combobox v-model="select" :options="options"></misa-combobox>
    </div>
    <div>
        <div>Checkbox</div>
        <misa-checkbox v-model="checkbox"></misa-checkbox>
    </div>
    <div>
        <div>Router</div>
        <router-link to="/home">About page</router-link>
        <router-view></router-view>
    </div>
    <div>
        Table
        <misa-table v-model="table" checkbox>
            <template #status="row">
                <span style="color: greenyellow">{{ row.status }}</span>
            </template>
        </misa-table>
    </div>
    <div>
        <misa-dropdown position="bottomRight" title="Title">
            <template #click>Dropdown</template>
            <template #content>This is dropdown</template>
        </misa-dropdown>
    </div>
    <div>
        <misa-button @click="showLoading">Loading</misa-button>
        <misa-loading v-model="loading"></misa-loading>
    </div>
    <div>Import/Export</div>
    <misa-button type="primary" @click="addProfile">Thêm hồ sơ</misa-button>
    <misa-upload v-if="upload"></misa-upload>
</template>
<script>
import { useLangStore } from '@/store/lang';

export default {
    name: 'BaseStyle',
    setup() {
        const langStore = useLangStore()
        return { langStore }
    },
    data() {
        return {
            upload: false,
            loading: false,
            langOptions: [
                {
                    label: this.t('lang.vi'),
                    value: this.$enum.Lang.Vietnamese
                },
                {
                    label: this.t('lang.en'),
                    value: this.$enum.Lang.English
                }
            ],
            input: '',
            input2: '',
            dialogShow: false,
            select: '',
            options: [{
                label: '1',
                value: 1
            },
            {
                label: '2',
                value: 2
            }
                , {
                label: '3',
                value: 3
            }
                , {
                label: '4',
                value: 4
            }
            ],
            checkbox: false,
            table: {
                header: [{
                    label: 'Name',
                    prop: 'name'
                },
                { label: 'Age', prop: 'age' },
                { label: 'Status', prop: 'status', slot: true }],
                data: [{
                    name: 'a',
                    age: 18,
                    status: 'active'
                },
                {
                    name: 'b',
                    age: 18,
                    status: 'active'
                },
                {
                    name: 'c',
                    age: 18,
                    status: 'active'
                }]
            }
        }
    },
    computed: {
        lang(){
            return this.langStore.getLocale
        }
    },
    methods: {
        addProfile(){
            this.upload = true
        },
        showLoading(){
            this.loading = true
        },
        changeLang(lang) {
            this.langStore.changeLanguage(lang)
        },
        minLength() {
            return true;
        },
        toogleDialog() {
            this.dialogShow = !this.dialogShow;
        },
        click() {
            alert('click');
        },
        changeEvent(value) {
            console.log('change', value);
        },
        focusEvent() {
            console.log('focus');
        }
    }
}
</script>