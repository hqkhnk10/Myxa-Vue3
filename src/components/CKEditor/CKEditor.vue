<template>
  <div id="ckeditor">
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
      editorData: '',
      editorConfig: {
        placeholder: 'Type the content here!',

      },
    };
  },
};
</script>
<style>
#ckeditor{
  height: 100%;
}
#ckeditor .ck.ck-editor{
    height: 100% ;
}
#ckeditor .ck.ck-toolbar{
    background-color: #fff2ab;
    border: 0;
    border-radius: 10px 10px 0 0 !important;
}
#ckeditor .ck.ck-content{
    background: #fff2ab !important;
    border: none !important;
    box-shadow: none !important;
    height: 100% !important;
}
#ckeditor .ck.ck-editor__main {
    height: calc(100% - 38px) !important;
}
#ckeditor .ck.ck-toolbar>.ck-toolbar__items {
    justify-content: flex-end;
}
</style>
