<template>
    <Header></Header>
    <navbar
        @log-out="logOut"
        :user-logged-in="userLoggedIn"
        :is-admin="isAdmin"
    ></navbar>
    <div class="container">
        <HomeBanner></HomeBanner>
        <div class="row mt-3">
            <HomeShowcase
                :showcase-collection = "showcase"
            ></HomeShowcase>
        </div>
        <div class="row mt-5">
            <HomeRecommends
                :recommends-collection = "recommends"
            ></HomeRecommends>
        </div>
        <div class="row mt-5">
            <HomeForum></HomeForum>
        </div>
        <div class="row mt-5">
            <HomeNews></HomeNews>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';
import HomeNews from '@/components/HomeNews.vue';
import HomeRecommends from '@/components/HomeRecommends.vue';
import HomeShowcase from '@/components/HomeShowcase.vue';
import HomeForum from '@/components/HomeForum.vue';
import HomeBanner from '@/components/HomeBanner.vue';
import axios from 'axios';

export default {
    name: 'HomeView',
    props: ['userLoggedIn', 'isAdmin'],
    components: {
        Header,
        Navbar,
        HomeNews,
        HomeRecommends,
        HomeShowcase,
        HomeForum,
        HomeBanner
    },
    data() {
        return {
            homeCollections: [],
            recommends: null,
            showcase: null
        }
    },
    emits: {
        logOut() {
            return true;
        }
    },
    mounted() {
        axios.get(`${process.env.VUE_APP_SERVERURL}/collections/home`, {
        })
        .then((res) => {
            this.homeCollections = res.data;
            for (const collection of this.homeCollections) {
                if (collection.name == 'recommends') {
                    this.recommends = collection;
                }
                if (collection.name == 'showcase') {
                    this.showcase = collection;
                }
            }
        })
        .catch(err => console.log(err))
    },
    methods: {
        logOut() {
            this.$emit('logOut');
        },
    }
}
</script>
