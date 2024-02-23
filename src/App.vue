<template>
    <router-view
        @log-out="logOut"
        :is-admin="isAdmin"
        @login-success="loginSuccess"
        :user-logged-in="userLoggedIn"
        :auth-token="authToken"
        :username="username"
        :user-id="userId"
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
            username: "",
            userId: ""
        }
    },
    mounted() {
        if (localStorage.getItem("userLoggedIn")) {
            console.log("logged in");
            this.authToken = localStorage.getItem("authToken");
            this.username = localStorage.getItem("username");
            this.userId = localStorage.getItem("userId");
            this.userLoggedIn = true;
        } else {
            console.log("not logged in")
        }
    },
    methods: {
        loginSuccess(userInfo) {
            console.log("login successful");
            this.authToken = userInfo.token;
            this.isAdmin = userInfo.isAdmin;
            this.username = userInfo.username;
            this.userId = userInfo.userID;
            this.userLoggedIn = true;
            localStorage.setItem("authToken", this.authToken);
            localStorage.setItem("username", this.username);
            localStorage.setItem("userId", this.userId);
            localStorage.setItem("userLoggedIn", true);
            // TODO link was "home"
            this.$router.replace({name: 'auctions'});
        },
        logOut() {
            console.log("logout successful");
            this.isAdmin = false;
            this.authToken = "";
            this.username = "";
            this.userId = "";
            this.userLoggedIn = false;
            localStorage.removeItem("authToken");
            localStorage.removeItem("username");
            localStorage.removeItem("userId");
            localStorage.removeItem("userLoggedIn");
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
