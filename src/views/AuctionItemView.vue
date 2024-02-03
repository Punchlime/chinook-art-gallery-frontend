<template>
    <div class="container-lg mx-auto">
        <div class="top padder" style="height: 50px;"></div>
        <!-- <AuctionItemHeader
            :item="item"
        ></AuctionItemHeader> -->
        <AuctionItemCard
            :item="item"
            :user-logged-in="userLoggedIn"
            @submit-bid="submitBid"
            :is-live="isLive"
            :bid-history="bidHistory"
            :minimum-bid="minimumBid"
            :starting-bid="startBid"
            :min-increment="minInc"
            :timer="timer"
            :on-delay="onDelay"
            :current-winner="currentWinner"
        ></AuctionItemCard>
    </div>
</template>

<script>
import AuctionItemHeader from '@/components/AuctionItemHeader.vue';
import AuctionItemCard from '@/components/AuctionItemCard.vue';
import axios from 'axios';
export default {
    name: 'AuctionItemView',
    props: ['authToken', 'userLoggedIn', 'username', 'userId'],
    data() {
        return {
            itemId: "",
            item: null,
            connection: null,
            authenticated: false,
            testData: "Test Data",
            isLive: false,
            bidHistory: [],
            minimumBid: 0,
            startBid: 0,
            minInc: 0,
            timer: 0,
            onDelay: false,
            currentWinner: ""
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
                    this.minimumBid = res.data.minBid
                    this.bidHistory = res.data.history;
                    for (let index in this.bidHistory) {
                        if (this.bidHistory[index].userId == this.userId) {
                            this.bidHistory[index].user = "You";
                            this.bidHistory[index].userId = "You";
                        }
                        console.log(this.bidHistory[index]);
                        this.bidHistory[index].bid = "$" + this.bidHistory[index].bid + ".00";
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
                this.minInc = res.data.minimumIncrement;
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
                                this.bidHistory.push({user: "You", userId: "You", bid: "$" + request.currentBid + ".00"});
                                this.currentWinner = "You";
                            } else {
                                this.bidHistory.push({user: request.currentWinner, userId: request.currentWinnerId, bid: "$" + request.currentBid + ".00"});
                                this.currentWinner = request.currentWinnerId;
                            }
                            break;
                        case "tick":
                            this.timer = request.timer;
                            if (this.timer == 30) {
                                this.bidHistory.push({user: "warning", userId: "warning", bid: "1"});
                            }
                            if (this.timer == 20) {
                                this.bidHistory.push({user: "warning", userId: "warning", bid: "2"});
                            }
                            if (this.timer == 10) {
                                this.bidHistory.push({user: "warning", userId: "warning", bid: "Last chance!"});
                            }
                            break;
                        case "end":
                            this.timer = 0;
                            this.bidHistory.push({user: "final", userId: "final", bid: "auction complete"});
                            this.isLive = false;
                            break;
                        case "go live":
                            console.log(request.minBid);
                            this.onDelay = false;
                            this.isLive = true;
                            this.minimumBid = request.minBid;
                            break;
                        case "delay":
                            this.timer = request.timer;
                            break;
                        case "win":
                            alert('Congratulations, you have won this item.')
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
                    bid: bidObj.bid
                }));
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

        }
    },
    components: {
        AuctionItemHeader,
        AuctionItemCard
    }
}
</script>