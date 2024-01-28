<template>
    <div class="col-lg-3 col-sm-6">
        <div class="card shadow-sm">
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
    props: ['item'],
    name: 'HomeImageCard'
}
</script>