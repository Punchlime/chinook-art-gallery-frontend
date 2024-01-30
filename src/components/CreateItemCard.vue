<template>
    <div class="container-fluid mx-auto" style="max-width: 1200px;">
        <div class="row g-5">
            <div class="col-4"></div>
            <div class="col-4">
                <form>
                    <div class="row g-3 mb-3">
                        <div class="col-sm-12" style="text-align: left;">
                            <label for="thumb" class="form-label">Upload Thumbnail</label>
                            <div class="input-group">
                                <input type="file" class="form-control" id="thumb" ref="thumb">
                            </div>
                        </div>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-sm-12" style="text-align: left;">
                            <label for="images" class="form-label">Upload Images</label>
                            <div class="input-group">
                                <input type="file" class="form-control" id="images" ref="images" multiple>
                            </div>
                        </div>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-sm-12" style="text-align: left;">
                            <label for="title" class="form-label">Title</label>
                            <input type="text" class="form-control" id="title" placeholder="Insert title" v-model="title">
                            <div class="invalid-feedback">
                                Please enter title.
                            </div>
                        </div>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-sm-12" style="text-align: left;">
                            <label for="content" class="form-label">Content</label>
                            <textarea type="text" class="form-control" id="content" placeholder="Insert content" rows="8" v-model="content"></textarea>
                            <div class="invalid-feedback">
                                Please enter content.
                            </div>
                        </div>
                    </div>
                    <div class="row g-3 mb-3">
                        <div class="col-12">
                            <button type="submit" class="btn btn-outline-secondary" style="width: 100%;" @click.prevent="submitCreateItem">Post</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-4"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CreateItemCard',
    emits: {
        createItemSuccess: null
    },
    data() {
        return {
            thumb: '',
            files: '',
            title: '',
            content: ''
        }
    },
    methods: {
        async submitCreateItem() {
            this.thumb = this.$refs.thumb.files;
            this.files = this.$refs.images.files;
            const data = new FormData();
            data.append('name', this.title)
            data.append('description', this.content)
            data.append('thumb', this.thumb[0]);
            var iCount = 0;
            for (const i in this.files) {
                data.append('file', this.files[i]);
                iCount ++;
            }
            data.append('iCount', iCount);
            axios.post(`${process.env.VUE_APP_SERVERURL}/items`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                this.$router.replace({name: 'items'});
                this.$emit('createItemSuccess');
            })
            .catch(err => console.log(err))
        }
    }
}
</script>