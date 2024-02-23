<template>
    <navbar
        @log-out="logOut"
        :user-logged-in="userLoggedIn"
        :is-admin="isAdmin"
    ></navbar>
    <div class="container-lg mx-auto">
        <CreateItemHeader></CreateItemHeader>
        <CreateItemCard></CreateItemCard>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';
import CreateItemHeader from '@/components/CreateItemHeader.vue';
import CreateItemCard from '@/components/CreateItemCard.vue';
export default {
    name: 'CreateItemView',
    props: ['userLoggedIn', 'isAdmin'],
    components: {
        Header,
        Navbar,
        CreateItemHeader,
        CreateItemCard
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