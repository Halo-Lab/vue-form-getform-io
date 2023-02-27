<template>
    <div 
        @focus="onFocus" 
        @blur="onBlur" 
        :tabindex="0" 
        ref="selectRef" 
        :class="{
            'input input-select': true,
            'input-error': error,
            [className]: className,
            [errorClassName]: error && errorClassName
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
                :class="['input-select-item', {'active': option.value === value}]" 
                v-for="option in options" 
                :key="option.value"
                @click="() => onChange(option.value)"
            >
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script>
import { inject, computed, ref } from 'vue';

export default {
    props: {
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
        className: {
            type: String,
            default: ''
        },
        errorClassName: {
            type: String,
            default: ''
        },
    },
    setup(props) {
        const { name, defaultValue, validator, options } = props;
        const registerField = inject('registerField');
        const { value, validate, error, resetError }
            = registerField(name, defaultValue, validator);
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