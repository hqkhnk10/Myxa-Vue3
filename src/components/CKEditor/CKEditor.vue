<template>
  <div id="ckeditor">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      @input="changeData"
      @ready="onReady"
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
        placeholder: this.placeholder,
      },
      instance: null,
    };
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  expose: ["focusCK"],
  emits: ["update:modelValue"],
  watch: {
    modelValue: {
      handler(newValue) {
        this.editorData = newValue;
      },
      immediate: true,
    },
  },
  methods: {
    changeData(value) {
      this.$emit("update:modelValue", value);
    },
    onReady(editor) {
      editor.focus();
    },
    focusCK() {
      this.instance.focus();
    },
  },
};
</script>
<style>
#ckeditor {
  height: 100%;
}
#ckeditor .ck.ck-editor {
  height: 100%;
}
#ckeditor .ck.ck-toolbar {
  background-color: #fff2ab;
  border: 0;
  border-radius: 10px 10px 0 0 !important;
}
#ckeditor .ck.ck-content {
  background: #fff2ab !important;
  border: none !important;
  box-shadow: none !important;
  height: 100% !important;
  padding-left: 24px;
  font-size: 16px;
  min-height: 450px;
}
#ckeditor .ck.ck-editor__main {
  height: calc(100% - 38px) !important;
}
#ckeditor .ck.ck-toolbar > .ck-toolbar__items {
  justify-content: flex-end;
}
</style>
