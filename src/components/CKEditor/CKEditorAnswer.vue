<template>
  <div id="answer">
    <ckeditor
      ref="ck"
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      @ready="onReady"
      @blur="onBlur"
      @input="changeData"
    ></ckeditor>
  </div>
</template>

<script>
import { decodeHtml } from "@/js/format/format";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  data() {
    return {
      editor: ClassicEditor,
      editorData: this.modelValue,
      editorConfig: {
        alignment: {
          options: ["center"],
        },
        toolbar: ["bold", "italic"],
        startupFocus : true
      },
    };
  },
  props:{
    modelValue:{
      type: String,
      default: ''
    }
  },
  emits:['on-blur','update:modelValue'],
  methods:{
    changeData(value){
      this.$emit('update:modelValue', decodeHtml(value))
    },
    onReady(){
      document.querySelector("#answer .ck .ck-content").focus();
    },
    onBlur(){
      this.$emit('on-blur')
    }
  }
};
</script>
<style>
#answer .ck.ck-editor__top .ck-sticky-panel .ck-toolbar {
  border: 0;
}
#answer .ck .ck-content {
  border: 0 !important;
  box-shadow: none !important;
  text-align: center;
}
#answer .ck.ck-toolbar > .ck-toolbar__items {
  justify-content: flex-end;
}
</style>
