<template>
    <Header></Header>
    <navbar
        @log-out="logOut"
        :user-logged-in="userLoggedIn"
        :is-admin="isAdmin"
    ></navbar>
    <div class="loginPadding" style="height: 75px;"></div>
    <Login v-if="displayLogin" @login-user="loginUser" @show-login="showLogin" @show-register="showRegister"></Login>
    <Register v-if="displayRegister" @register-user="registerUser" @show-login="showLogin" @show-register="showRegister"></Register>
    <RegisterSuccess v-if="displayRegisterSuccess" @return-to-login="returnToLogin"></RegisterSuccess>
</template>

<script>
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import RegisterSuccess from '@/components/RegisterSuccess.vue';
import axios from 'axios';
export default {
    name: 'LoginView',
    props: ['userLoggedIn', 'isAdmin'],
    emits: {
        loginSuccess(userInfo) {
            if (!userInfo.token) {
                return false;
            }
            return true;
        },
        logOut() {
            return true;
        }
    },
    data() {
        return {
            displayLogin: true,
            displayRegister: false,
            displayRegisterSuccess: false,
            userInfo: {
                token: "",
                isAdmin: "",
                username: "",
                userID: "",
                uID: ""
            }
        }
    },
    components: {
        Header,
        Navbar,
        Login,
        Register,
        RegisterSuccess
    },
    methods: {
        registerUser(registerObj) {
            // post to server

            axios.post(`${process.env.VUE_APP_SERVERURL}/users`, {
                name: registerObj.username,
                email: registerObj.email,
                password: registerObj.password,
                mobile: registerObj.mobile,
                // credit: registerObj.credit
            })
            .then((res) => {
                this.displayRegister = false;
                this.displayRegisterSuccess = true;
            })
            .catch(err => {
                if (err.response.data.error == 'dupeUser') {
                    alert('Username already in use');
                }
                if (err.response.data.error == 'dupeEmail') {
                    alert('Email already in use');
                }
            })
        },
        loginUser(loginObj) {

            axios.post(`${process.env.VUE_APP_SERVERURL}/auth`, {
                email: loginObj.email,
                password: loginObj.password
            })
            .then((res) => {
                this.userInfo.token = res.data.token;
                this.userInfo.isAdmin = res.data.isAdmin;
                this.userInfo.username = res.data.username;
                this.userInfo.userID = res.data.userID;
                this.userInfo.uID = res.data.uID;
                this.displayLogin = false;
                this.$emit('loginSuccess', this.userInfo);
            })
            .catch(err => {
                alert('Incorrect email address or password');
                console.log(err);
            })
        },
        logOut() {
            this.$emit('logOut');
        },
        showLogin() {
            this.displayLogin = true;
            this.displayRegister = false;
        },
        showRegister() {
            this.displayLogin = false;
            this.displayRegister = true;
        },
        returnToLogin() {
            this.displayRegisterSuccess = false;
            this.displayLogin = true;
        }
    }
}
</script>

<style>
body {
    height: 100%;
}

body {
    padding-bottom: 40px;
    background-color: #f5f5f5;
}

.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    padding-top: 50px;
    margin: auto;
}

.form-signin .checkbox {
    font-weight: 400;
}

.form-signin .form-floating:focus-within {
    z-index: 2;
}

.form-sign input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: -1px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>