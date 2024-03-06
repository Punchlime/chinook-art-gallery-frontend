<template>
    <div class="form-signin">
        <form>
            <div class="row" style="margin-bottom: 20px;">
                <button class="col-6 btn btn-primary" @click.prevent="$emit('showLogin')">Sign in</button>
                <button class="col-6 btn btn-primary" @click.prevent="$emit('showRegister')">Register</button>
            </div>

            <div class="form-floating">
                <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" v-model="email"/>
                <label for="floatingEmail">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password"/>
                <label for="floatingPassword">Password</label>
            </div>

            <!-- <div class="checkbox mb-3" style="padding-top: 16px">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div> -->
            <button class="w-100 btn btn-lg btn-primary" style="margin-top: 15px" :disabled="isFormValid" @click.prevent="submitLogin">Sign in</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    emits: {
        loginUser(loginObj) {
            if (!loginObj.email || !loginObj.password) {
                return false;
            }
            return true;
        },
        showLogin: null,
        showRegister: null
    },
    computed: {
        isFormValid() {
            return !this.email || !this.password
        }
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        submitLogin() {
            if (!this.email || !this.password) {
                alert('Please enter your email and password.');
                return;
            }

            this.$emit('loginUser', {
                email: this.email,
                password: this.password
            })
        }
    }
}
</script>