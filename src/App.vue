<template>
    <navbar
        @log-out="logOut"
        :user-logged-in="userLoggedIn"
        :is-admin="isAdmin"
    ></navbar>
    <router-view
        @login-success="loginSuccess"
        :user-logged-in="userLoggedIn"
        :auth-token="authToken"
        :username="username"
    />
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
    components: {
        Navbar
    },
    data() {
        return {
            userLoggedIn: false,
            authToken: "",
            isAdmin: false,
            username: ""
        }
    },
    methods: {
        loginSuccess(userInfo) {
            console.log("login successful");
            console.log(userInfo);
            this.authToken = userInfo.token;
            this.isAdmin = userInfo.isAdmin;
            this.username = userInfo.username;
            this.userLoggedIn = true;
            // TODO link was "home"
            this.$router.replace({name: 'auctions'});
        },
        logOut() {
            console.log("logout successful");
            this.authToken = "";
            this.username = "";
            this.userLoggedIn = false;
            // TODO link was "home"
            this.$router.replace({name: 'auctions'});
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}
</style>
