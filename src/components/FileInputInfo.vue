<template>
    <div class="file-info-wrapper">
        <h2 class="file-info-title">Uploading - {{ files.length }}/{{ files.length }} files</h2>
        <transition-group name="file-info-list-transition" tag="ul" class="file-info-list">
                <li v-for="file in files" class="file-info-item" :key="file.name">
                    <div class="file-info-item-header">
                        <span class="file-info-name">{{ file.name }}</span>
                        <Button type="button" isIcon :class="{ 'button-icon-error': info[file.name].error }"
                            @click.stop="$emit('onDelete', file)">
                            <svg v-if="info[file.name].progress !== 100 || info[file.name].error" width="10"
                                height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.2431 0.757865L0.757812 9.24315M9.2431 9.2431L0.757812 0.757812" stroke="#9B9CA0"
                                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <svg v-else width="11" height="12" viewBox="0 0 11 12" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
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
                        <div :class="['inner', {
                            'inner-error': info[file.name].error,
                            'inner-filled': info[file.name].progress === 100
                                && !info[file.name].error
                        }]" :style="{ width: `${info[file.name].progress}%` }"></div>
                    </div>
                    <span class="file-info-item-error">{{ info[file.name].error }}</span>
                </li>
        </transition-group>
    </div>
</template>
  
<script>

import { toRefs } from 'vue';
import Button from './Button.vue';

export default {
    components: { Button },
    props: {
        files: {
            type: Array,
            required: true,
        },
        filesInfo: {
            type: Object,
        },
    },
    setup(props) {
        const { filesInfo: info } = toRefs(props);
        return { info };
    }
}
</script>
  
  