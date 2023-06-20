<template>
  <div id="answer">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        alignment: {
          options: ["center"],
        },
        toolbar: ["bold", "italic", "underline", "'alignment:center'"],
      },
    };
  },
};
</script>
<style>
#answer .ck.ck-editor__top .ck-sticky-panel .ck-toolbar {
  border: 0;
}
#answer .ck .ck-content {
  border: 0 !important;
  box-shadow: none !important;
}
#answer .ck.ck-toolbar > .ck-toolbar__items {
  justify-content: flex-end;
}
</style>
