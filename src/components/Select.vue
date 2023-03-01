<template>
    <div :class="['input-container', { [fieldClassName]: fieldClassName }]">
        <Label :label="label" :className="labelClassName" :isDisabled="isDisabled" />
        <div 
            @focus="onFocus" 
            @blur="onBlur" 
            :tabindex="0" 
            ref="selectRef" 
            :class="{
                'input input-select': true,
                'input-error': error,
                [inputClassName]: inputClassName,
                [errorClassName]: error && errorClassName,
                'disabled': isDisabled
            }"
        >
            <div class="input-select-current" @click="resetOpened">
                {{ currentLabel }}
                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 5L11 0.999999" stroke="#060811" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <ul v-if="isOpened" class="input-select-list">
                <li 
                    :class="['input-select-item', { 'active': option.value === value }]" 
                    v-for="option in options"
                    :key="option.value" 
                    @click="() => onChange(option.value)"
                >
                    {{ option.label }}
                </li>
            </ul>
        </div>
        <Error :error="error" />
    </div>
</template>

<script>
import { inject, computed, ref } from 'vue';

import Label from './Label.vue';
import Error from './Error.vue';

export default {
    components: { Label, Error },
    props: {
        label: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            requiered: true
        },
        options: {
            type: Array,
            requiered: true,
        },
        defaultValue: {
            type: String,
        },
        validator: {
            type: Array
        },
        inputClassName: {
            type: String,
            default: ''
        },
        labelClassName: {
            type: String,
            default: ''
        },
        errorClassName: {
            type: String,
            default: ''
        },
        fieldClassName: {
            type: String,
            default: ''
        },
        isDisabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const { name, defaultValue, validator, options } = props;
        const registerField = inject('registerField');
        const getFieldError = inject('getFieldError');
        const error = computed(() => getFieldError(name));
        const isInOptions = options.map(option => option.value).includes(defaultValue)
        const { value, validate, resetError }
            = registerField(name, isInOptions ? defaultValue : undefined, validator);
        const currentLabel = computed(
            () => options.find((option) => option.value === value.value)?.label
                ?? options[0].label);

        const isOpened = ref(false);
        const selectRef = ref();

        const resetOpened = () => {
            isOpened.value = !isOpened.value;
            if (!isOpened.value) {
                selectRef.value.blur();
            }
        };

        const onBlur = () => {
            isOpened.value = false;
            validate();
        };

        const onFocus = () => resetError(name);

        const onChange = (newValue) => {
            value.value = newValue;
            selectRef.value.blur();
        };

        return {
            value,
            error,
            onBlur,
            onFocus,
            currentLabel,
            isOpened,
            onChange,
            selectRef,
            resetOpened
        };
    }
}
</script>

<style></style>