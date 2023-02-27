<template>
    <div :class="['field-group', {'field-group-column': isColumn}]">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        isColumn: {
            type: Boolean,
            default: false
        }
    }
}
</script>