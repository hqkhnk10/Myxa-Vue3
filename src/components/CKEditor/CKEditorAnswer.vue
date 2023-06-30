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
        placeholder: "Nhập đáp án",
      },
    };
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["on-blur", "update:modelValue"],
  watch: {
    modelValue: {
      handler(newValue) {
        this.editorData = newValue;
      },
    },
  },
  methods: {
    changeData(value) {
      this.$emit("update:modelValue", value);
    },
    onReady() {
      // document.querySelector("#answer .ck .ck-content").focus();
    },
    onBlur() {
      this.$emit("on-blur");
    },
  },
};
</script>
<style>
#answer:has(.ck-focused) .ck.ck-editor__editable > .ck-placeholder::before {
  display: none;
}
#answer {
  height: 100%;
}
#answer .ck.ck-editor {
  height: 100%;
}
#answer .ck.ck-editor__top .ck-sticky-panel .ck-toolbar {
  border: 0;
}
#answer .ck .ck-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 0 !important;
  box-shadow: none !important;
  text-align: center;
  height: 100% !important;
  background: transparent;
}
#answer .ck .ck-content p {
  width: 100%;
}
#answer:has(.ck-focused) .ck.ck-editor__main {
  height: calc(100% - 40px) !important;
  padding-bottom: 40px;
}
#answer:not(.ck-focused) .ck.ck-editor__main {
  height: calc(100%);
}
#answer:has(.ck-focused) .ck-toolbar__items {
  display: flex !important;
  justify-content: flex-end;
}
#answer:has(.ck-focused),
.ck .ck-content {
  background: white;
}
#answer:not(.ck-focused) .ck-toolbar__items {
  display: none;
}
</style>
