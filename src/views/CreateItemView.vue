<template>
    <div class="container-lg mx-auto">
        <CreateItemHeader></CreateItemHeader>
        <CreateItemCard></CreateItemCard>
    </div>
</template>

<script>
import CreateItemHeader from '@/components/CreateItemHeader.vue';
import CreateItemCard from '@/components/CreateItemCard.vue';
export default {
    name: 'CreateItemView',
    components: {
        CreateItemHeader,
        CreateItemCard
    }
}
</script>