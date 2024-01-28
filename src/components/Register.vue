<template>
    <div class="form-signin">
        <form>
            <div class="row" style="margin-bottom: 20px;">
                <button class="col-6 btn btn-primary" @click.prevent="$emit('showLogin')">Sign in</button>
                <button class="col-6 btn btn-primary" @click.prevent="$emit('showRegister')">Register</button>
            </div>

            <div class="form-floating">
                <input type="username" class="form-control" id="floatingUsername" placeholder="username" v-model="username"/>
                <label for="floatingUsername">Username</label>
            </div>
            <div class="form-floating">
                <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" v-model="email"/>
                <label for="floatingEmail">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password"/>
                <label for="floatingPassword">Password</label>
                <div class="invalid-feedback">
                    Must contain at least one upper case letter, one lower case letter, and be at least 8 characters long.
                </div>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingConfirmPassword" placeholder="Confirm Password" v-model="confirmPassword"/>
                <label for="floatingConfirmPassword">Confirm Password</label>
                <div class="invalid-feedback">
                    Must match password.
                </div>
            </div>
            <div class="form-floating">
                <input type="mobile" class="form-control" id="floatingMobile" placeholder="1234567890" v-model="mobile"/>
                <label for="floatingMobile">Mobile</label>
            </div>
            <div class="form-floating">
                <input type="credit" class="form-control" id="floatingCredit" placeholder="1234567812345678" v-model="credit"/>
                <label for="floatingCredit">Credit Card Number</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" style="margin-top: 15px" :disabled="isFormValid" @click.prevent="submitRegister">Register</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    emits: {
        registerUser(registerObj) {
            if (!registerObj.username || !registerObj.email || !registerObj.password || !registerObj.mobile || !registerObj.credit) {
                return false;
            }
            return true;
        },
        showLogin: null,
        showRegister: null
    },
    computed: {
        isFormValid() {
            return !this.username || !this.email || !this.password || !this.confirmPassword || !this.mobile || !this.credit
        }
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            mobile: '',
            credit: ''
        }
    },
    methods: {
        submitRegister() {
            if (!this.username || !this.email || !this.password || !this.confirmPassword || !this.mobile || !this.credit) {
                alert('Please fill the form');
                return;
            }

            if (this.password != this.confirmPassword) {
                alert('Password does not match confirmation');
                return;
            }

            if (!/[A-Z]/.test(this.password) || !/[a-z]/.test(this.password) || this.password.length < 8) {
                alert('Must contain at least one upper case letter, one lower case letter, and be at least 8 characters long.');
                return;
            }

            if (this.mobile.length != 10) {
                console.log('credit error');
                alert('Please enter a 10 digit phone number');
                return;
            }

            if (this.credit.length != 16) {
                console.log('credit error');
                alert('Please enter a 16 digit credit card number');
                return;
            }

            this.$emit('registerUser', {
                username: this.username,
                email: this.email,
                password: this.password,
                mobile: this.mobile,
                credit: this.credit
            })
        }
    }
}
</script>