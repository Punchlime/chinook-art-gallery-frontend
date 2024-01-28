<template>
    <div class="row my-5">
        <h2 class="col-md-3 py-1">Items</h2>
        <div class="col-md-3 py-1">
            <!-- <router-link class="btn btn-outline-secondary" to="/item/list">Create Listing</router-link> -->
            <router-link class="btn btn-outline-secondary" to="/item/create">Create Item</router-link>
        </div>
        <div class="col-md-6 py-1">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Coming Soon">
                <button class="input-group-text">
                    Search
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListedHeader'
}
</script>