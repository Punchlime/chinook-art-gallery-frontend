<template>
    <navbar
        @log-out="logOut"
        :user-logged-in="userLoggedIn"
        :is-admin="isAdmin"
    ></navbar>
    <div class="container-lg mx-auto">
        <div class="top padder" style="height: 50px;"></div>
        <!-- <AuctionItemHeader
            :item="item"
        ></AuctionItemHeader> -->
        <AuctionItemCard
            :item="item"
            :user-logged-in="userLoggedIn"
            @submit-bid="submitBid"
            @submit-queue-bid="submitQueueBid"
            :is-live="isLive"
            :bid-history="bidHistory"
            :minimum-bid="minimumBid"
            :starting-bid="startBid"
            :reserve="reserve"
            :estimateLow="estimateLow"
            :estimateHigh="estimateHigh"
            :timer="timer"
            :on-delay="onDelay"
            :current-winner="currentWinner"
            :is-bid-queued="isBidQueued"
            :queued-bid="queuedBid"
            :queued-user="queuedUser"
            :user-id="userId"
            :u-i-d="uID"
            :is-complete="isComplete"
            :final-winner="finalWinner"
            :final-price="finalPrice"
            :queued-bid-count="queuedBidCount"
        ></AuctionItemCard>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';
import AuctionItemHeader from '@/components/AuctionItemHeader.vue';
import AuctionItemCard from '@/components/AuctionItemCard.vue';
import axios from 'axios';
export default {
    name: 'AuctionItemView',
    props: ['authToken', 'userLoggedIn', 'username', 'userId', 'isAdmin', 'uID'],
    data() {
        return {
            itemId: "",
            item: null,
            connection: null,
            authenticated: false,
            testData: "Test Data",
            isLive: false,
            isComplete: false,
            bidHistory: [],
            minimumBid: 0,
            startBid: 0,
            timer: 0,
            reserve: 0,
            estimateLow: 0,
            estimateHigh: 0,
            onDelay: false,
            currentWinner: "",
            isBidQueued: false,
            queuedBid: "",
            queuedUser: "",
            finalWinner: "",
            finalPrice: "",
            queuedBidCount: 0
        }
    },
    emits: {
        logOut() {
            return true;
        }
    },
    mounted() {
        // get item from storage
        this.itemId = this.$route.params.id;


        axios.get(`${process.env.VUE_APP_SERVERURL}/items/${this.itemId}`, {
        })
        .then((res) => {
            this.item = res.data;
        })
        .catch(err => console.log(err))

        
        axios.get(`${process.env.VUE_APP_SERVERURL}/live-auctions/${this.itemId}`, {
        })
        .then((res) => {
            switch(res.data.status) {
                case "live":
                    this.isLive = true;
                    this.minimumBid = res.data.minBid;
                    this.bidHistory = res.data.history;
                    for (let index in this.bidHistory) {
                        if (this.bidHistory[index].userId == this.userId) {
                            this.bidHistory[index].user = "You";
                            this.bidHistory[index].userId = "You";
                            this.bidHistory[index].uID = "You";
                        }
                        this.bidHistory[index].bid = "$" + this.bidHistory[index].bid + ".00";
                    }
                    this.currentWinner = res.data.currentWinner;
                    if (this.currentWinner == this.userId) {
                        this.currentWinner = "You"
                    }
                    // TODO
                    break;
                case "on delay":
                    this.onDelay = true;
                case "not live":
                    console.log("not live");
                    //TODO
                    break;
                default:
                    console.log("unrecognized auction status");
                    break;
            }
        })
        .catch(err => console.log(err))

        
        axios.get(`${process.env.VUE_APP_SERVERURL}/auctions/${this.itemId}`, {
        })
        .then((res) => {
            if (res.data.itemId == this.itemId) {
                this.startBid = res.data.startingBid;
                this.reserve = res.data.reserve;
                this.estimateLow = res.data.estimateLow;
                this.estimateHigh = res.data.estimateHigh;
                this.isComplete = res.data.isComplete;
                if (this.isComplete) {
                    this.finalWinner = res.data.finalWinner;
                    this.finalPrice = res.data.sellPrice;
                }
                if (res.data.isBidQueued) {
                    this.isBidQueued = true;
                    this.queuedBid = res.data.queuedBid;
                    this.queuedUser = res.data.queuedUser;
                    this.queuedBidCount = res.data.queuedBidCount;
                }
            } else {
                console.log("id does not match")
            }
        })
        .catch(err => console.log(err))

        // connect to auction websocket
        if (this.userLoggedIn && this.itemId) {

            // connect to web socket

            console.log("Connecting to WebSocket Server");
            this.connection = new WebSocket(process.env.VUE_APP_WSSERVERURL);
            this.connection.onopen = (message) => {
                console.log("Connected");
                /*
                    auth requests will be:
                    type: "auth",
                    authToken: token,
                    itemId: _id,
                    username: username
                */
                this.connection.send(JSON.stringify({
                    type: "auth",
                    authToken: this.authToken,
                    itemId: this.itemId,
                    username: this.username
                }))
            }

            this.connection.onmessage = (message) => {
                let request = JSON.parse(message.data);
                if(!request.type) {
                    console.log("no request type")
                    // TODO throw error
                } else {
                    switch(request.type){
                        case "auth OK":
                            if (request.timer) {
                                this.timer = request.timer;
                                if (request.onDelay) {
                                    this.onDelay = true;
                                }
                            }
                            console.log ("auth is ok")
                            break;
                        case "update":
                            /*
                                update notifications will be:
                                type: "update"
                                item: item ID
                                currentBid: current winning bid
                                minBid: new minimum bid
                            */
                            this.minimumBid = request.minBid;
                            // TODO show "you"
                            if (request.currentWinnerId == this.userId) {
                                this.bidHistory.push({user: "You", userId: "You", uID: "You", bid: "$" + request.currentBid + ".00"});
                                this.currentWinner = "You";
                            } else {
                                this.bidHistory.push({user: request.currentWinner, userId: request.currentWinnerId, uID: request.currentWinnerUID, bid: "$" + request.currentBid + ".00"});
                                this.currentWinner = request.currentWinnerId;
                            }
                            break;
                        case "tick":
                            this.timer = request.timer;
                            if (this.timer == 30) {
                                this.bidHistory.push({user: "warning", userId: "warning", uID: "warning", bid: "1"});
                            }
                            if (this.timer == 20) {
                                this.bidHistory.push({user: "warning", userId: "warning", uID: "warning", bid: "2"});
                            }
                            if (this.timer == 10) {
                                this.bidHistory.push({user: "warning", userId: "warning", uID: "warning", bid: "Last chance!"});
                            }
                            break;
                        case "end":
                            this.timer = 0;
                            this.bidHistory.push({user: "final", userId: "final", uID: "final", bid: "auction complete"});
                            this.isLive = false;
                            this.isComplete = true;
                            break;
                        case "go live":
                            this.onDelay = false;
                            this.isLive = true;
                            this.minimumBid = request.minBid;
                            break;
                        case "delay":
                            this.timer = request.timer;
                            break;
                        case "win":
                            // might no longer be needed
                            // alert('Congratulations, you have won this item.');
                            this.finalWinner = request.winner;
                            this.finalPrice = request.price;
                            break;
                        case "sold":
                            // alert('Congratulations, you have won this item.');
                            this.finalWinner = request.winner;
                            this.finalPrice = request.price;
                            break;
                        case "no sale":
                            // alert('No sale, this auction was not completed.');
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    },
    unmounted() {
        if (this.connection) {
            this.connection.close();
        }
    },
    methods: {
        submitBid(bidObj) {
            if (this.userLoggedIn) {
                this.connection.send(JSON.stringify({
                    type: "bid",
                    username: this.username,
                    uID: this.uID,
                    bid: bidObj.bid
                }));
            } else {
                // TODO throw error or prevent
                console.log("not logged in");
            }
        },
        submitQueueBid(bidObj) {
            if (this.userLoggedIn) {
                axios.patch(`${process.env.VUE_APP_SERVERURL}/auctions/queue`, {
                    itemId: this.itemId,
                    userId: this.userId,
                    username: this.username,
                    uID: this.uID,
                    bid: bidObj.bid
                })
                .then((res) => {
                    if (res.status == 200) {
                        this.isBidQueued = true;
                        this.queuedBid = bidObj.bid;
                        this.queuedUser = this.userId;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            } else {
                // TODO throw error or prevent
                console.log("not logged in");
            }
        },
        async checkLive(itemId) {

            axios.get(`${process.env.VUE_APP_SERVERURL}/live-auctions/${itemId}`, {
            })
            .then((res) => {
                if (res.data == "live") {
                    this.isLive = true;
                };
            })
            .catch(err => console.log(err))

        },
        logOut() {
            this.$emit('logOut');
        },
    },
    components: {
        Header,
        Navbar,
        AuctionItemHeader,
        AuctionItemCard
    }
}
</script>