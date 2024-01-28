<template>
    <div class="col">
        <div class="card shadow-sm">
            <router-link v-if="status == 'active'" class="card-header" :to="'/item/' + item._id" style="text-decoration: none;">&#129001 This auction is live!</router-link>
            <router-link v-else-if="status == 'delay'" class="card-header" :to="'/item/' + item._id" style="text-decoration: none;">&#129000 This auction will be live soon!</router-link>
            <router-link v-else class="card-header" :to="'/item/' + item._id" style="text-decoration: none;">&#128997 This auction is not currently live.</router-link>
            <router-link class="card-header" :to="'/item/' + item._id">
                <img :src="`https://image-storage-test-1231321.s3.us-east-2.amazonaws.com/${item._id}-thumb.${item.filesExt}`" class="card-img-top" style="height: 200px; overflow: hidden;">
            </router-link>
            <router-link class="card-body" :to="'/item/' + item._id">
                <p class="card-text">{{ item.name }}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item', 'status'],
    name: 'SmallAuctionCard'
}
</script>