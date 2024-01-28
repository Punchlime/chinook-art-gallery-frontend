<template>
    <div class="container-fluid mx-auto" style="max-width: 1200px;">
        <h3 v-if="item" class="pt-5 pb-3" style="text-align: left;">{{ item.name }}</h3>
    </div>
</template>

<script>
export default {
    name: 'AuctionItemHeader',
    props: {
        item: {
            default: null,
        }
    }
}
</script>