<template>
    <navbar
        @log-out="logOut"
        :user-logged-in="userLoggedIn"
        :is-admin="isAdmin"
    ></navbar>
    <div class="row row-cols-1 row-cols-md-2 g-2">
        <div class="container-fluid" style="flex: auto; max-width: 900px;">
            <ListedHeader></ListedHeader>
            <ListedCard></ListedCard>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';
import ListedHeader from '@/components/ListedHeader.vue';
import ListedCard from '@/components/ListedCard.vue';
export default {
    name: 'ListedView',
    props: ['userLoggedIn', 'isAdmin'],
    emits: {
        logOut() {
            return true;
        }
    },
    components: {
        Header,
        Navbar,
        ListedHeader,
        ListedCard
    },
    methods: {
        logOut() {
            this.$emit('logOut');
        },
    }
}
</script>