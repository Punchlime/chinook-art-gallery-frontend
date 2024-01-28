<template>
    <div class="loginPadding" style="height: 75px;"></div>
    <Login v-if="displayLogin" @login-user="loginUser" @show-login="showLogin" @show-register="showRegister"></Login>
    <Register v-if="displayRegister" @register-user="registerUser" @show-login="showLogin" @show-register="showRegister"></Register>
    <RegisterSuccess v-if="displayRegisterSuccess" @return-to-login="returnToLogin"></RegisterSuccess>
</template>

<script>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import RegisterSuccess from '@/components/RegisterSuccess.vue';
import axios from 'axios';
export default {
    name: 'LoginView',
    emits: {
        loginSuccess(userInfo) {
            if (!userInfo.token) {
                return false;
            }
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
                username: ""
            }
        }
    },
    components: {
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
                credit: registerObj.credit
            })
            .then((res) => {
                console.log(res.data);
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
                console.log(res.data);
                this.userInfo.token = res.data.token;
                this.userInfo.isAdmin = res.data.isAdmin;
                this.userInfo.username = res.data.username;
                this.displayLogin = false;
                this.$emit('loginSuccess', this.userInfo);
            })
            .catch(err => {
                console.log(err);
            })
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