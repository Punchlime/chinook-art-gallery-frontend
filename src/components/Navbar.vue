<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav mx-auto mx-md-2">
                    <!-- <li class="nav-item me-auto me-md-0">
                        <router-link class="nav-link"  to="/">Home</router-link>
                    </li> -->
                    <li class="nav-item me-auto me-md-0">
                        <!-- TODO link was /auctions -->  
                        <router-link class="nav-link"  to="/">Auctions</router-link>
                    </li>
                    <li class="nav-item me-auto me-md-0">
                        <router-link class="nav-link"  to="/contact">Contact</router-link>
                    </li>
                </ul>
                <form class="w-100 me-auto mx-md-1">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search auctions" aria-label="Search">
                        <button class="input-group-text" disabled>
                            Coming Soon
                        </button>
                    </div>
                </form>
                <ul class="navbar-nav mx-auto mx-md-2">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">Account</a>
                        <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdown">
                            <li>
                                <router-link v-if="userLoggedIn" class="dropdown-item" to="/account">My Account</router-link>
                            </li>
                            <li>
                                <router-link v-if="userLoggedIn && isAdmin" class="dropdown-item" to="/listed">Listed Items</router-link>
                            </li>
                            <li>
                                <a v-if="userLoggedIn" class="dropdown-item" @click.prevent="$emit('logOut')">Sign Out</a>
                            </li>
                            <li>
                                <router-link v-if="!userLoggedIn" class="dropdown-item" to="/login">Sign In</router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    props: [
        'userLoggedIn',
        'isAdmin'
    ],
    emits: {
        logOut: null
    },
    methods: {
    }
}
</script>