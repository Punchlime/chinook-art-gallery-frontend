<template>
    <div class="container">
        <div style="height: 5px;"></div>
        <div v-if="showMotto" class="row mt-2">
            <div class="col-3" style="text-align: center;">
                <img src="@/assets/logoAuctioner.png" style="height: 100px; width: auto;">
            </div>
            <div class="col-9" style="text-align: left;">
                <div style="height: 10px;"></div>
                <img src="@/assets/Motto.png" style="height: 80px;">
            </div>
        </div>
        <div v-if="!showMotto" class="row mt-2">
            <img src="@/assets/logoAuctioner.png" style="height: 100px; width: auto;">
        </div>
        <div style="height: 10px;"></div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'Header',
    computed: {
        screenWidth() {
            return ref(window.innerWidth);
        },
        showMotto() {
            return (ref(window.innerWidth).value > 1300)
        }
    }
}
</script>