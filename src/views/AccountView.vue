<template>
    <div class="container-fluid" style="max-width: 800px; text-align: left;">
        <div class="container-fluid px-5 py-3 my-5 border">
            <div class="row my-4">
                <h4 class="col py-1">Account Information</h4>
            </div>
            <div class="row my-4">
                <div class="col-3">Username</div>
                <div class="col-9">{{ user.username }}</div>
            </div>
            <div class="row my-4">
                <div class="col-3">Email</div>
                <div class="col-9">{{ user.email }}</div>
            </div>
            <!-- <div class="row my-4">
                <div class="col-3">Password</div>
                <div class="col-9">
                    <button class="btn btn-sm btn-outline-secondary">Change</button>
                </div>
            </div> -->
            <div class="row my-4">
                <div class="col-3">Mobile</div>
                <div class="col-9">{{ user.mobile }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['authToken'],
    data() {
        return {
            user: {
                username: "",
                email: "",
                mobile: ""
            },
        }
    },
    mounted() {
        axios.get(`${process.env.VUE_APP_SERVERURL}/users/me`, {
            headers: {
                'x-auth-token': this.authToken
            }
        })
        .then((res) => {
            this.user.username = res.data.name;
            this.user.email = res.data.email;
            this.user.mobile = res.data.mobile;
        })
        .catch(err => console.log(err))
    },
    name: 'AccountView',
    components: {
    }
}
</script>