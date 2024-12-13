<template>
    <Header></Header>
    <navbar
        @log-out="logOut"
        :user-logged-in="userLoggedIn"
        :is-admin="isAdmin"
    ></navbar>
    <div class="container">
        <HomeTempBody></HomeTempBody>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';
import HomeTempBody from '@/components/HomeTempBody.vue';

export default {
    name: 'ContactView',
    props: ['userLoggedIn', 'isAdmin'],
    components: {
        Header,
        Navbar,
        HomeTempBody
    },
    emits: {
        logOut() {
            return true;
        }
    },
    methods: {
        logOut() {
            this.$emit('logOut');
        },
    }
}
</script>
