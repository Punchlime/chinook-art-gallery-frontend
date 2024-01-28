<template>
    <div class="container p-1" style="background-color: lightgray;">
        <div class="row m-2">
            <h5 class="col text-start mt-2">
                <span>Collector's Showcase /</span>
                <span> 海底拾珍</span>
            </h5>
            <!-- TODO link was /auctions -->
            <RouterLink class="col-6" to="/" style="text-align: right;">See all items</RouterLink>
        </div>
        <div class="row m-2">
            <HomeImageCard v-if="showcaseCollection" v-for="item in showcaseCollection.items" :key="item._id" :item="item"></HomeImageCard>
        </div>
    </div>
</template>

<script>
import HomeImageCard from '@/components/HomeImageCard.vue';
export default {
    name: 'HomeShowcase',
    props: {
        showcaseCollection: {
            default: null,
        }
    },
    components: {
        HomeImageCard
    }
}
</script>