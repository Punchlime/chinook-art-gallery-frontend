<template>
    <div class="card my-3 shadow-sm">
        <div class="card-header" style="text-align: left;">
            Auction Date: 
        </div>
        <div class="card-body row" style="flex: auto;">
            <div class="col-md-2">
                <img src="../assets/placeholder.jpg" alt="" style="width: 100px;">
            </div>
            <div class="col-md-7" style="text-align: left;">
                Name
            </div>
            <div class="col-md-3">
                <ul class="list-group">
                    <router-link class="btn btn-sm btn-outline-secondary my-1" to="/item">Go To Item</router-link>
                    <router-link class="btn btn-sm btn-outline-secondary my-1" to="/item/edit">Edit</router-link>
                </ul>
            </div>
        </div>
        <div class="card-footer" style="text-align: left;">
            Item ID:
        </div>
    </div>
    <div>
        <button class="btn btn-outline-secondary" type="button" id="createTableAuction" @click.prevent="createTableAuction">Create Table Auction</button>
        <button class="btn btn-outline-secondary" type="button" id="createCupAuction" @click.prevent="createCupAuction">Create Cup Auction</button>
        <button class="btn btn-outline-secondary" type="button" id="createTeacupAuction" @click.prevent="createTeacupAuction">Create Teacup Auction</button>
        <button class="btn btn-outline-secondary" type="button" id="createBowlAuction" @click.prevent="createBowlAuction">Create Bowl Auction</button>
        <button class="btn btn-outline-secondary" type="button" id="createIncenseBowlAuction" @click.prevent="createIncenseBowlAuction">Create Incense Bowl Auction</button>
        <button class="btn btn-outline-secondary" type="button" id="createVaseAuction" @click.prevent="createVaseAuction">Create Vase Auction</button>
        <button class="btn btn-outline-secondary" type="button" id="createProcelainVaseAuction" @click.prevent="createProcelainVaseAuction">Create Procelain Vase Auction</button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'ListedCard',
    methods: {
        createTableAuction() {
            /*
                req is:
                startBid: starting bid
                reserve: minimum sale price
                estimateLow: low value estimate
                estimateHigh: high value estimate
                delay: delay in seconds
            */

            axios.post(`${process.env.VUE_APP_SERVERURL}/live-auctions/65696e6dacabc4e032e4fdb5`, {
                startBid: 100,
                reserve: 500,
                estimateLow: 1000,
                estimateHigh: 5000,
                delay: 0
            })
            .then((res) => {
            })
            .catch(err => {
                console.log(err);
            })
        },
        createCupAuction() {

            axios.post(`${process.env.VUE_APP_SERVERURL}/live-auctions/65696e5aacabc4e032e4fdb2`, {
                startBid: 150,
                reserve: 500,
                estimateLow: 1000,
                estimateHigh: 5000,
                delay: 0
            })
            .then((res) => {
            })
            .catch(err => {
                console.log(err);
            })
        },
        createTeacupAuction() {

            axios.post(`${process.env.VUE_APP_SERVERURL}/live-auctions/65696dc4acabc4e032e4fdaf`, {
                startBid: 50,
                reserve: 300,
                estimateLow: 500,
                estimateHigh: 1000,
                delay: 0
            })
            .then((res) => {
            })
            .catch(err => {
                console.log(err);
            })
        },
        createBowlAuction() {

            axios.post(`${process.env.VUE_APP_SERVERURL}/live-auctions/65696c9cacabc4e032e4fdac`, {
                startBid: 700,
                reserve: 3500,
                estimateLow: 5000,
                estimateHigh: 15000,
                delay: 0
            })
            .then((res) => {
            })
            .catch(err => {
                console.log(err);
            })
        },
        createIncenseBowlAuction() {

            axios.post(`${process.env.VUE_APP_SERVERURL}/live-auctions/65696c15acabc4e032e4fda9`, {
                startBid: 170,
                reserve: 800,
                estimateLow: 2000,
                estimateHigh: 5000,
                delay: 0
            })
            .then((res) => {
            })
            .catch(err => {
                console.log(err);
            })
        },
        createVaseAuction() {

            axios.post(`${process.env.VUE_APP_SERVERURL}/live-auctions/65696a94acabc4e032e4fda6`, {
                startBid: 200,
                reserve: 15000,
                estimateLow: 50000,
                estimateHigh: 85000,
                delay: 0
            })
            .then((res) => {
            })
            .catch(err => {
                console.log(err);
            })
        },
        createProcelainVaseAuction() {

            axios.post(`${process.env.VUE_APP_SERVERURL}/live-auctions/656969a2acabc4e032e4fd9d`, {
                startBid: 150,
                reserve: 500,
                estimateLow: 1000,
                estimateHigh: 5000,
                delay: 0
            })
            .then((res) => {
            })
            .catch(err => {
                console.log(err);
            })
        },
    }
}
</script>