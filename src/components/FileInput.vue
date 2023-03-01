<template>
  <div :class="['input-container', { [fieldClassName]: fieldClassName }]">
    <div class="file-upload" @dragover.prevent="isDragging = true" @dragleave="isDragging = false" @drop.prevent="drop">
      <img :src="imageUrl" alt="upload file icon" width="60" height="52" class="file-upload-icon" />
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
      <Button isStroke type="button" label="Choose File" @click.stop="$refs.fileInputRef.click()" />
      <input name="files[]" @change="handleSelected" type="file" class="hidden" ref="fileInputRef" multiple />
    </div>
    <div class="file-info-wrapper">
      <h2>Uploading - 5/5 files</h2>
      <ul class="file-info-list">
        <li v-for="file in value" class="file-info-item">
          <div class="file-info-item-header">
            <span class="file-info-name">{{ file.name }}</span>
            <Button 
              type="button"  
              isIcon 
              :class="{ 'button-icon-error': filesInfo[file.name].error }"
              @click.stop="onDelete(file)"
            >
                <svg v-if="filesInfo[file.name].progress !== 100 || filesInfo[file.name].error" width="10" height="10"
                  viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.2431 0.757865L0.757812 9.24315M9.2431 9.2431L0.757812 0.757812" stroke="#9B9CA0"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <svg v-else width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.6 0.6C3.6 0.268629 3.86863 0 4.2 0H6.6C6.93137 0 7.2 0.268629 7.2 0.6V1.2H10.2C10.5314 1.2 10.8 1.46863 10.8 1.8C10.8 2.13137 10.5314 2.4 10.2 2.4H0.6C0.268629 2.4 0 2.13137 0 1.8C0 1.46863 0.268629 1.2 0.6 1.2H3.6V0.6Z"
                    fill="#9B9CA0" />
                  <path
                    d="M1.8 3.6C2.13137 3.6 2.4 3.86863 2.4 4.2V10.2C2.4 10.5314 2.66863 10.8 3 10.8H7.8C8.13137 10.8 8.4 10.5314 8.4 10.2V4.2C8.4 3.86863 8.66863 3.6 9 3.6C9.33137 3.6 9.6 3.86863 9.6 4.2V10.2C9.6 11.1941 8.79411 12 7.8 12H3C2.00589 12 1.2 11.1941 1.2 10.2V4.2C1.2 3.86863 1.46863 3.6 1.8 3.6Z"
                    fill="#9B9CA0" />
                  <path
                    d="M3.6 5.4C3.6 5.06863 3.86863 4.8 4.2 4.8C4.53137 4.8 4.8 5.06863 4.8 5.4V9C4.8 9.33137 4.53137 9.6 4.2 9.6C3.86863 9.6 3.6 9.33137 3.6 9V5.4Z"
                    fill="#9B9CA0" />
                  <path
                    d="M6.6 4.8C6.26863 4.8 6 5.06863 6 5.4V9C6 9.33137 6.26863 9.6 6.6 9.6C6.93137 9.6 7.2 9.33137 7.2 9V5.4C7.2 5.06863 6.93137 4.8 6.6 4.8Z"
                    fill="#9B9CA0" />
                </svg>
            </Button>
          </div>
          <div :class="['file-info-item-progress']">
            <div
              :class="['inner', { 'inner-error': filesInfo[file.name].error, 'inner-filled': filesInfo[file.name].progress === 100 && !filesInfo[file.name].error }]"
              :style="{ width: `${filesInfo[file.name].progress}%` }"></div>
          </div>
          <span class="file-info-item-error">{{ filesInfo[file.name].error }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { inject, ref, reactive } from 'vue';

import Button from './Button.vue';
import imageUrl from "@/assets/icons/Upload.svg";

export default {
  components: { Button },
  props: {
    name: {
      type: String,
      required: true,
    },
    validTypes: {
      type: Array,
      default: null,
    },
    maxTotalSize: {
      type: [String, Number],
      default: '',
    },
    validator: {
      type: Array,
      default: null,
    },
    isDisabled: {
      type: Boolean,
    },
    fieldClassName: {
      type: String,
      default: ''
    },
    labelClassName: {
      type: String,
      default: ''
    },
    inputClassName: {
      type: String,
      default: ''
    },
    errorClassName: {
      type: String,
      default: ''
    },
  },
  setup(props) {
    const { validTypes } = props;
    const registerField = inject('registerField');
    const setFieldError = inject('setFieldError');
    const { value, resetError } = registerField('files[]', []);
    const isDragging = ref(false)
    const fileInputRef = ref(null);
    const filesInfo = reactive({})

    const validate = (file) => {
      if (validTypes) {
        const ext = file.name.toLowerCase().split('.').slice(-1)[0];
        const error = (!validTypes.map((t) => t.toLowerCase()).includes(ext))
          ? 'This document is not supported, please delete and upload another file.'
          : '';
        if (error) {
          setFieldError('files[]', error)
        }
        return error
      }
    }

    const setFilesToInput = (files) => {
      const dataTransferList = new DataTransfer();
        files.forEach(f => dataTransferList.items.add(f))
        fileInputRef.value.files = dataTransferList.files;
    }

    const setFilesInfo = () =>
      value.value.forEach((v) => {
        if (!filesInfo[v.name]) {
          filesInfo[v.name] = {};
          filesInfo[v.name].progress = 0;
        }
        filesInfo[v.name].error = validate(v);
      });

    const setUpFiles = (files) => {
      if (files?.length > 0) {
        files.forEach(f => {
          const reader = new FileReader();
          addListeners(reader, f.name);
          reader.readAsDataURL(f);
        })
        value.value = [...value.value, ...files];
        setFilesInfo();
        setFilesToInput([...value.value])
        
      }
    }

    const onDelete = (file) => {
      const files = value.value.filter((f) => f.name !== file.name);
      setFilesToInput(files);
      resetError('files[]')
      value.value = [...files];
      delete filesInfo[file.name];
      setFilesInfo();

    }

    const drop = (event) => {
      setUpFiles([...event.dataTransfer.files])
      isDragging.value = false;
    }

    const handleEvent = (event, filename) => {
      if (['loadend', 'load'].includes(event.type)) {
        filesInfo[filename].progress = 100;
      }
      if (event.type === 'progress') {
        filesInfo[filename].progress = (event.loaded / event.total).toFixed(2) * 100
      }
    }

    const addListeners = (reader, filename) => {
      reader.addEventListener('loadstart', (event) => handleEvent(event, filename));
      reader.addEventListener('load', (event) => handleEvent(event, filename));
      reader.addEventListener('loadend', (event) => handleEvent(event, filename));
      reader.addEventListener('progress', (event) => handleEvent(event, filename));
      reader.addEventListener('error', (event) => handleEvent(event, filename));
      reader.addEventListener('abort', (event) => handleEvent(event, filename));
      //dont do this, make diffrent functions for every 
      //event listener please, your code's readability will be 100% better, 
      //i am on a bus rn, but will make it prettier later :D
    }

    function handleSelected(e) {
      const selectedFiles = [...e.target.files];
      setUpFiles(selectedFiles)

    }
    return {
      handleSelected,
      // currentProgress,
      imageUrl,
      isDragging,
      fileInputRef,
      drop,
      value,
      filesInfo,
      onDelete
    };
  }
}
</script>

