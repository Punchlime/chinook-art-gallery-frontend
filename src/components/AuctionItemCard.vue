<template>
    <div v-if="item" class="container-fluid mx-auto" style="max-width: 1200px;">
        <div class="row g-5">
            <div class="col-lg-1"></div>
            <div class="col-lg-6" style="text-align: left;">
                <div class="container">
                    <div class="row" style="max-width: 800px; background-color: lightgray;">
                        <div class="col border">
                            <ItemCarousel
                                :item-id="item._id"
                                :image-count="item.imageCount"
                                :file-ext="item.filesExt"
                            ></ItemCarousel>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col mt-3 p-2 border" style="height: 150px;">
                            {{ item.description }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 border">
                            Starting Bid: ${{ startingBid }}.00
                        </div>
                        <div class="col-6 border">
                            Minimum Bid Increment: ${{ minIncrement }}.00
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="container border">
                    <div class="row">
                        <div class="col p-2 border" style="font-size: x-large;">
                            {{ item.name }}
                        </div>
                    </div>
                </div>
                <div class="container border mt-2" style="text-align: left;">
                    <div class="row">
                        <div class="col p-2 border overflow-auto">
                            <div class="" style="height: 300px; overflow: auto; display: flex; flex-direction: column-reverse;">
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="bid in bidHistory">
                                        {{ bid.userId }} : {{ bid.bid }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-if="isLive && userLoggedIn && !onDelay" class="row">
                        <div v-if="currentWinner" class="col p-2 border">
                            Current Winner: {{ currentWinner }}
                        </div>
                        <div v-else="currentWinner" class="col p-2 border">
                            Current Winner: none
                        </div>
                    </div>
                    <div v-if="isLive && userLoggedIn && !onDelay" class="row">
                        <div class="col p-2 border">
                            Time remaining: {{ Math.floor(parseInt(timer)/60) }}:{{ parseInt(timer)%60 }}
                        </div>
                    </div>
                    <div v-if="!isLive && userLoggedIn && onDelay" class="row">
                        <div class="col p-2 border">
                            This auction will begin in: {{ Math.floor(parseInt(timer)/60) }}:{{ parseInt(timer)%60 }}
                        </div>
                    </div>
                    <div v-if="!isLive && !userLoggedIn && onDelay" class="row">
                        <div class="col p-2 border">
                            This auction will begin shortly
                        </div>
                    </div>
                </div>
                <div v-if="isLive && userLoggedIn" class="input-group mt-2 w-100">
                    <span class="input-group-text">Minimum Bid</span>
                    <span class="input-group-text">$</span>
                    <input type="text" class="form-control" :placeholder="minimumBid" aria-label="bidInput" aria-describedby="Minimum Bid" disabled>
                    <span class="input-group-text">.00</span>
                    <button class="btn btn-outline-secondary float-end w-auto" type="button" id="submitMinimumBid" @click.prevent="submitMinimumBid">Place bid</button>
                </div>
                <div v-if="isLive && userLoggedIn" class="input-group mt-2">
                    <span class="input-group-text">Custom Bid</span>
                    <span class="input-group-text">$</span>
                    <input type="text" id="customBidInput" class="form-control" aria-label="bidInput" v-model="customBid" aria-describedby="Input bid">
                    <span class="input-group-text">.00</span>
                    <button class="btn btn-outline-secondary" type="button" id="submitCustomBid" :disabled="isBidValid" @click.prevent="submitCustomBid">Place bid</button>
                </div>
                <div v-if="isLive && !userLoggedIn" class="container border">
                    <div class="row">
                        <div class="col p-2 border">
                            Log in to join the live auction
                        </div>
                    </div>
                </div>
                <div v-if="!isLive" class="container border mt-2">
                    <div class="row">
                        <div class="col p-2 border">
                            This item is not currently being auctioned
                        </div>
                    </div>
                </div>
                <div class="mt-2">
                    <!-- TODO link was /auctions -->
                    <router-link class="btn btn-outline-secondary" to="/">
                        Return to collection
                    </router-link>
                </div>
            </div>
            <div class="col-lg-1"></div>
        </div>
    </div>
</template>

<script>
import ItemCarousel from '@/components/ItemCarousel.vue';
export default {
    name: 'AuctionItemCard',
    components: {
        ItemCarousel
    },
    props: {
        isLive: {},
        userLoggedIn: {},
        item: {
            default: null
        },
        minimumBid: {
            default: 0
        },
        bidHistory: {
            default: []
        },
        startingBid: {},
        minIncrement: {},
        timer: {},
        onDelay: {
            default: false
        },
        currentWinner: {}
    },
    data() {
        return {
            customBid: ""
        }
    },
    computed: {
        isBidValid() {
            return !this.customBid || !(parseInt(this.customBid) >= parseInt(this.minimumBid))
        }
    },
    methods: {
        submitMinimumBid() {
            this.$emit('submitBid', {
                bid: this.minimumBid
            })
        },
        submitCustomBid() {
            if (!this.customBid || !(parseInt(this.customBid) >= parseInt(this.minimumBid))) {
                alert('Invalid Bid');
                return;
            }

            this.$emit('submitBid', {
                bid: this.customBid
            })
        }
    }
}
</script>