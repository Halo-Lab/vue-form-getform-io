<template>
    <label 
        :class="['input-container-box', { [className]: className, 'disabled': isDisabled }]">
        <input 
            class="hidden" 
            type="checkbox" 
            :disabled="isDisabled" 
            :name="name" 
            v-model="fieldValue" 
            :value="value"
        />
        <span :class="{
            'input input-box input-checkbox': true,
            'input-checkbox-checked': fieldValue.includes(value)
        }" />
        <span class="label label-box">{{ label }} </span>
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
    },
    setup(props) {
        const { name } = props;
        const registerField = inject('registerField');
        const { value: fieldValue } = registerField(name, []);

        return { fieldValue };
    }
};
</script>