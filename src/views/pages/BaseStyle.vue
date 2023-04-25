<template>
    <div>
        Button:
        <misa-button type="primary" @click="click">Button</misa-button>
        <misa-button type="primary" @click="click" disabled>Button</misa-button>
    </div>
    <div style="width: 300px;">
        Input: {{ input }}
        <misa-input placeholder="Xin vui lòng nhập" v-model="input" @focus="focusEvent" @change="changeEvent"></misa-input>
    </div>
</template>
<script>
export default {
    name: 'BaseStyle',
    data() {
        return{
            input: '',
            input2: ''
        }
    },
    methods: {
        click(){
            alert('click');
        },
        changeEvent(value){
            alert('change', value)
        },
        focusEvent(){
            console.log('focus');
        }
    }
}
</script>