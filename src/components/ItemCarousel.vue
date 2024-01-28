<template>
    <div v-if="itemId && imageCount && fileExt" class="container" style="max-width: 700px; height: 600px;">
        <div id="itemCarousel" class="carousel slide">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#itemCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button v-for="n in imageCount - 1" type="button" data-bs-target="#itemCarousel" :data-bs-slide-to="`${n}`" :aria-label="`Slide${n+1}`"></button>
        </div>
        <div class="carousel-inner align-middle" style="max-width: 700px; height: 600px;">
            <div class="carousel-item active">
                <img :src="`https://image-storage-test-1231321.s3.us-east-2.amazonaws.com/${itemId}-0.${fileExt}`" class="carousel-image d-block overflow-hidden w-100" alt="...">
            </div>
            <div v-for="n in imageCount - 1" class="carousel-item">
                <img :src="`https://image-storage-test-1231321.s3.us-east-2.amazonaws.com/${itemId}-${n}.${fileExt}`" class="carousel-image d-block overflow-hidden w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#itemCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#itemCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ItemCarousel',
    props: {
        itemId: {
            default: null,
        },
        imageCount: {
            default: null,
        },
        fileExt: {
            default: null,
        },
    }
}
</script>

<style>
.carousel-item {
    position: relative;
    height: 100%;
}
.carousel-image {
    position: absolute;   
    top: 50%;
    transform: translateY(-50%);
}
</style>