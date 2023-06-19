<template>
  <ckeditor
    :editor="editor"
    v-model="editorData"
    :config="editorConfig"
    placeholder="123"
  ></ckeditor>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  data() {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        placeholder: 'Type the content here!',

      },
    };
  },
};
</script>
<style>
.ck.ck-editor{
    height: 100% ;
}
.ck.ck-toolbar{
    background-color: #fff2ab;
    border: 0;
}
.ck.ck-content{
    background: #fff2ab !important;
    border: none !important;
    box-shadow: none !important;
    height: 80% !important;
}
.ck.ck-editor__main {
    height: 80% !important;
}
</style>
