<template>
    <div class="contaienr">
        <h4>Registration complete.</h4>
        <a @click.prevent="$emit('returnToLogin')">Click here to log into your account.</a>
    </div>
</template>

<script>
export default {
    name: 'RegisterSuccess',
    emits: {
        returnToLogin: null
    }
}
</script>