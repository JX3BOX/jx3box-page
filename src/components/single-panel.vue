<template>
    <div class="m-single-panel">
        <div class="u-minigroup">
            <Print class="u-fn" :title="title" :authorID="authorID" />
            <QRcode class="u-fn" />
            <Sharing class="u-fn" :title="title" :pic="banner"/>
        </div>
        <div class="u-btngroup">
            <Fav class="u-fav" :post-type="post.post_type" :post-id="post.ID"/>
            <Like class="u-like" :post-type="post.post_type" :post-id="post.ID"/>
            <Adminbutton class="u-admin" size="mini"/>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'single-panel',
        props:['post','author'],
        data() {
            return {}
        },
        computed:{
            title: function() {
                return _.get(this.post, "post_title") || "无标题";
            },
            authorID : function (){
                return _.get(this.author, "uid")
            },
            banner : function (){
                return _.get(this.post, "post_banner") || "";
            }
        },
        methods:{},
        mounted() {},
        components : {
        }
    }
</script>

<style scoped lang="less">
    @import '../assets/css/single-panel.less';
</style>