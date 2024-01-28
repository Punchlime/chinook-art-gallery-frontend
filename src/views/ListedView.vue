<template>
    <div class="row row-cols-1 row-cols-md-2 g-2">
        <div class="container-fluid" style="flex: auto; max-width: 900px;">
            <ListedHeader></ListedHeader>
            <ListedCard></ListedCard>
        </div>
    </div>
</template>

<script>
import ListedHeader from '@/components/ListedHeader.vue';
import ListedCard from '@/components/ListedCard.vue';
export default {
    name: 'ListedView',
    components: {
        ListedHeader,
        ListedCard
    }
}
</script>