<template>
    <label :class="['input-container-box', {[className]: className}]">
        <input class="hidden" 
            type="radio" 
            :disabled="isDisabled" 
            :name="name" 
            v-model="fieldValue"
            :value="value"
            @change="(e) => $emit('update:fieldValue', e.target.value)" 
            />
            <span :class="{
            'input input-box input-radio': true,
            'input-radio-checked': value === fieldValue
        }" />
            <span class="label label-box">{{ label }}</span>
    </label>
</template>

<script>
import { inject } from 'vue';
export default {
    props: {
        label: {
            type: String,
            requiered: true,
        },
        isDisabled: {
            type: Boolean,
        },
        name: {
            type: String,
            requiered: true,
        },
        value: {
            type: [String, Boolean],
            requiered: true,
        },
        className: {
            type: String,
            default: ''
        },
        defaultChecked: {
            type: Boolean,
            default: false
        },
    },
    setup(props) {
        const { name, value, defaultChecked } = props;
        const registerField = inject('registerField');
        const { value: fieldValue } = registerField(name, defaultChecked ? value : null);

        return { fieldValue };
    }
};
</script>