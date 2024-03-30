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
                        <div v-if="!isComplete && isBidQueued" class="col-6 border">
                            Starting Price: ${{ queuedBid }}
                        </div>
                        <div v-if="!isComplete && !isBidQueued" class="col-6 border">
                            Starting Price: ${{ startingBid }}
                        </div>
                        <div v-if="isComplete && noSale" class="col-6 border">
                            This item was not sold
                        </div>
                        <div v-if="isComplete && !noSale" class="col-6 border">
                            Sold for: ${{ finalPrice }}
                        </div>
                        <div class="col-6 border">
                            Estimate: ${{ estimateLow + " - $" +  estimateHigh }}
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
                                        {{ bid.uID }} : {{ bid.bid }}
                                    </li>
                                    <li v-if="isComplete && isFinalWinner" class="list-group-item" style="background-color: lightgreen;">
                                        You have won this item for: ${{ finalPrice }}
                                    </li>
                                    <li v-if="isComplete && noSale" class="list-group-item" style="background-color: lightpink;">
                                        This item was not sold
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-if="!isComplete && isLive && userLoggedIn && !onDelay" class="row">
                        <div v-if="currentWinner" class="col p-2 border">
                            Current Winner: {{ currentWinner }}
                        </div>
                        <div v-else="currentWinner" class="col p-2 border">
                            Current Winner: none
                        </div>
                    </div>
                    <div v-if="!isComplete && isLive && userLoggedIn && !onDelay" class="row">
                        <div class="col p-2 border">
                            Time remaining: {{ Math.floor(parseInt(timer)/60) }}:{{ compseconds }}
                        </div>
                    </div>
                    <div v-if="!isComplete && !isLive && userLoggedIn && onDelay" class="row">
                        <div class="col p-2 border">
                            This auction will begin in: {{ Math.floor(parseInt(timer)/60) }}:{{ compseconds }}
                        </div>
                    </div>
                    <div v-if="!isComplete && !isLive && !userLoggedIn && onDelay" class="row">
                        <div class="col p-2 border">
                            This auction will begin shortly
                        </div>
                    </div>
                </div>
                <div v-if="!isComplete && isLive && userLoggedIn" class="input-group mt-2 w-100">
                    <span class="input-group-text">Minimum Bid</span>
                    <span class="input-group-text">$</span>
                    <input type="text" class="form-control" :placeholder="minimumBid" aria-label="bidInput" aria-describedby="Minimum Bid" disabled>
                    <span class="input-group-text">.00</span>
                    <button class="btn btn-outline-secondary float-end w-auto" type="button" id="submitMinimumBid" @click.prevent="submitMinimumBid">Place bid</button>
                </div>
                <div v-if="!isComplete && isLive && userLoggedIn" class="input-group mt-2">
                    <span class="input-group-text">Custom Bid</span>
                    <span class="input-group-text">$</span>
                    <input type="text" id="customBidInput" class="form-control" aria-label="bidInput" v-model="customBid" aria-describedby="Input bid">
                    <span class="input-group-text">.00</span>
                    <button class="btn btn-outline-secondary" type="button" id="submitCustomBid" :disabled="isBidValid" @click.prevent="submitCustomBid">Place bid</button>
                </div>
                <div v-if="!isComplete && isLive && !userLoggedIn" class="container border">
                    <div class="row">
                        <div class="col p-2 border">
                            Log in to join the live auction
                        </div>
                    </div>
                </div>
                <div v-if="!isComplete && !isLive" class="container border mt-2">
                    <div class="row">
                        <div class="col p-2 border">
                            This item is not currently being auctioned
                        </div>
                    </div>
                </div>
                <div v-if="isComplete" class="container border mt-2">
                    <div class="row">
                        <div class="col p-2 border">
                            This auction has completed
                        </div>
                    </div>
                </div>
                <!-- <div v-if="isComplete && isFinalWinner" class="container border mt-2">
                    <div class="row">
                        <div class="col p-2 border">
                            You won this item for: ${{ finalPrice }}
                        </div>
                    </div>
                </div> -->
                <div v-if="!isComplete && !isLive" class="container border mt-2">
                    <div class="row">
                        <div class="col p-2 border">
                            Current Bids: {{ queuedBidCount }}
                        </div>
                    </div>
                </div>
                <div v-if="!isComplete && !isLive && isQueuedBidder && userLoggedIn" class="container border mt-2">
                    <div class="row">
                        <div class="col p-2 border">
                            You are holding the winning bid (${{ queuedBid }})
                        </div>
                    </div>
                </div>
                <div v-if="!isComplete && !isLive && userLoggedIn" class="input-group mt-2 w-100">
                    <span class="input-group-text">Queue Bid</span>
                    <span class="input-group-text">$</span>
                    <input type="text" id="queueBidInput" class="form-control" aria-label="bidInput" v-model="queueBidInput" aria-describedby="Input bid">
                    <span class="input-group-text">.00</span>
                    <button class="btn btn-outline-secondary" type="button" id="submitQueueBid" :disabled="isQueueBidValid" @click.prevent="submitQueueBid">Queue bid</button>
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
        reserve: {},
        estimateLow: {},
        estimateHigh: {},
        timer: {},
        onDelay: {
            default: false
        },
        currentWinner: {},
        isBidQueued: {
            default: false
        },
        queuedBid: {
            default: null
        },
        queuedUser: {
            default: null
        },
        userId: {},
        uID: {},
        isComplete: {
            default: false
        },
        finalWinner: {
            default: null
        },
        finalPrice: {
            default: null
        },
        queuedBidCount: {
            default: 0
        }
    },
    data() {
        return {
            customBid: "",
            queueBidInput: ""
        }
    },
    computed: {
        isBidValid() {
            return !this.customBid || !(parseInt(this.customBid) >= parseInt(this.minimumBid))
        },
        isQueueBidValid() {
            if (this.isBidQueued) {
                return !this.queueBidInput || !(parseInt(this.queueBidInput) >= parseInt(this.queuedBid))
            }
            return !this.queueBidInput || !(parseInt(this.queueBidInput) >= parseInt(this.startingBid))
        },
        compseconds() {
            var seconds = parseInt(this.timer)%60;
            if (seconds < 10) {
                return '0' + seconds;
            }
            return seconds;
        },
        isQueuedBidder() {
            return this.userId == this.queuedUser;
        },
        isFinalWinner() {
            if (this.finalWinner) {
                return this.userId == this.finalWinner;
            }

            return false;
        },
        noSale() {
            return !this.finalWinner;
        }
    },
    emits: {
        submitBid: null,
        submitQueueBid: null
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

            if (!Number.isInteger(parseFloat(this.customBid))) {
                alert('Invalid Bid (please do not enter decimals).');
                return;
            }

            this.$emit('submitBid', {
                bid: parseInt(this.customBid)
            })
        },
        submitQueueBid() {
            if (this.isQueueBidValid) {
                alert('Invalid Bid');
                return;
            }

            if (!Number.isInteger(parseFloat(this.queueBidInput))) {
                alert('Invalid Bid (please do not enter decimals).');
                return;
            }

            this.$emit('submitQueueBid', {
                bid: parseInt(this.queueBidInput)
            })

            return;
        }
    }
}
</script>