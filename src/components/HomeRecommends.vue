<template>
    <div class="container p-1" style="background-color: lightgray;">
        <div class="row m-2">
            <h5 class="col text-start mt-2">
                <span>Recommended Auctions /</span>
                <span> 精品推荐</span>
            </h5>
            <!-- TODO link was /auctions -->
            <RouterLink class="col-6" to="/items" style="text-align: right;">See all items</RouterLink>
        </div>
        <div class="row m-2">
            <HomeImageCard v-if="recommendsCollection" v-for="item in recommendsCollection.items" :key="item._id" :item="item"></HomeImageCard>
        </div>
    </div>
</template>

<script>
import HomeImageCard from '@/components/HomeImageCard.vue';
import axios from 'axios';

export default {
    name: 'HomeRecommends',
    props: {
        recommendsCollection: {
            default: null,
        }
    },
    components: {
        HomeImageCard
    },
}
</script>