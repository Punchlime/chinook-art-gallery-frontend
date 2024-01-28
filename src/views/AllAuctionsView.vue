<template>
    <div class="row row-cols-1 row-cols-md-2 g-2">
        <div style="flex: auto;">
            <div class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-2 row-cols-lg-3 row-cols-xxl-4 g-4">
                        <SmallAuctionCard v-if="itemStatus" v-for="item in items" :key="item._id" :item="item" :status="getStatus(item._id)"></SmallAuctionCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SmallAuctionCard from '@/components/SmallAuctionCard.vue';
import axios from 'axios'
export default {
    name: 'AllAuctionsView',
    data() {
        return {
            items: [],
            itemStatus: []
        }
    },
    mounted() {
        console.log(process.env.VUE_APP_SERVERURL);
        console.log(process.env.VUE_APP_WSSERVERURL);
        axios.get(`${process.env.VUE_APP_SERVERURL}/items`, {
        })
        .then((res) => {
            this.items = res.data;
        })
        .catch(err => console.log(err))

        axios.get(`${process.env.VUE_APP_SERVERURL}/live-auctions`, {
        })
        .then((res) => {
            this.itemStatus = res.data;
        })
        .catch(err => console.log(err))
    },
    methods: {
        getStatus(itemId) {
            if (this.itemStatus.length == 0) {
                return "not live";
            }
            for (let item of this.itemStatus) {
                if (item.itemId == itemId) {
                    console.log(item.status);
                    return item.status;
                }
            }
            return "not live";
        }
    },
    components: {
        SmallAuctionCard
    }
}
</script>