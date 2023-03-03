<template>
  <div :class="['input-container', { [fieldClassName]: fieldClassName }]">
    <div 
      class="file-upload" 
      @dragover.prevent="isDragging = true" 
      @dragleave="isDragging = false" 
      @drop.prevent="onDrop"
    >
      <img 
        :src="imageUrl" 
        alt="upload file icon" 
        width="60" 
        height="52" 
        class="file-upload-icon" 
      />
      <h2 :class="['file-upload-title', { [titleClassName]: titleClassName }]">
        Drop Files here
      </h2>
      <p :class="['file-upload-text', { [textClassName]: textClassName }]">
        Supported formates: {{
          validTypes
          ? validTypes.map((t) => t.toUpperCase()).join(', ')
          : 'JPEG, PNG, GIF, PDF, Word'
        }}
      </p>
      <Button 
        isStroke 
        type="button" 
        label="Choose File" 
        @click.stop="$refs.fileInputRef.click()" 
      />
      <input 
        :name="`${name}[]`" 
        @change="onChange" 
        type="file" 
        class="hidden" 
        ref="fileInputRef" 
        :multiple="isMultiple" 
      />
    </div>
    <FileInputInfo 
      v-if="value.length" 
      :files="value" 
      :filesInfo="filesInfo" 
      @onDelete="onDelete"
    />
  </div>
</template>

<script>
import { inject, ref, reactive } from 'vue';

import Button from './Button.vue';
import FileInputInfo from './FileInputInfo.vue';
import imageUrl from "@/assets/icons/Upload.svg";

export default {
  components: { Button, FileInputInfo },
  props: {
    name: {
      type: String,
      required: true,
    },
    validTypes: {
      type: Array,
      default: null,
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    fieldClassName: {
      type: String,
      default: ''
    },
    titleClassName: {
      type: String,
      default: ''
    },
    textClassName: {
      type: String,
      default: ''
    },
  },
  setup(props) {
    const { validTypes, name, isMultiple } = props;
    const registerField = inject('registerField');
    const { value, resetError, fileFieldValidate } = registerField(`${name}[]`, []);
    const isDragging = ref(false);
    const fileInputRef = ref(null);
    const filesInfo = reactive({});

    const validate = (file) => {
      if (validTypes) {
        return fileFieldValidate(file, validTypes);
      }
    }

    const setFilesToInput = (files) => {
      const dataTransferList = new DataTransfer();
      files.forEach((file) => dataTransferList.items.add(file));
      fileInputRef.value.files = dataTransferList.files;
    }

    const setFilesInfo = () =>
      value.value.forEach((value) => {
        if (!filesInfo[value.name]) {
          filesInfo[value.name] = {};
          filesInfo[value.name].progress = 0;
        }
        filesInfo[value.name].error = validate(value);
      });

    const setUpFiles = (files) => {
      if (files?.length > 0) {
        files.forEach((file) => {
          const reader = new FileReader();
          addListeners(reader, file);
          reader.readAsDataURL(file);
        })
        value.value = isMultiple
          ? [...value.value, ...files]
          : [...files]
        setFilesInfo();
        setFilesToInput([...value.value]);
      }
    }

    const onDelete = (file) => {
      const files = value.value.filter((f) => f.name !== file.name);
      setFilesToInput(files);
      resetError();
      value.value = [...files];
      delete filesInfo[file.name];
      setFilesInfo();
    }

    const onDrop = (event) => {
      setUpFiles([...event.dataTransfer.files]);
      isDragging.value = false;
    }

    const onChange = (event) => setUpFiles([...event.target.files]);

    const onLoad = (filename) => {
      filesInfo[filename].progress = 100;
    }

    const onProgress = (event, filename) => {
      filesInfo[filename].progress = (event.loaded / event.total).toFixed(2) * 100;
    }

    const addListeners = (reader, file) => {
      reader.addEventListener('load', () => onLoad(file?.name));
      reader.addEventListener('loadend', () => onLoad(file?.name));
      reader.addEventListener('progress', (event) => onProgress(event, file?.name));
      reader.addEventListener('abort', () => onDelete(f));
    }

    return {
      imageUrl,
      isDragging,
      fileInputRef,
      value,
      filesInfo,
      onChange,
      onDrop,
      onDelete
    };
  }
}
</script>

