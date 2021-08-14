<template>
    <div class="m-single-panel">
        <div class="u-minigroup">
            <Print class="u-fn" :title="title" :authorID="authorID" />
            <QRcode class="u-fn" />
            <Sharing class="u-fn" :title="title" :pic="banner"/>
        </div>
        <div class="u-btngroup">
            <Fav class="u-fav" :postType="post.post_type" :postId="post.ID"/>
            <Feed class="u-feed" :postType="post.post_type" :postId="post.ID"/>
            <Adminbutton class="u-admin" size="mini"/>
        </div>
    </div>
</template>

<script>
import Adminbutton from '@jx3box/jx3box-common-ui/src/bread/Adminbutton.vue'
    export default {
        name : 'single-panel',
        props:['post'],
        data() {
            return {}
        },
        computed:{
            title: function() {
                return _.get(this.post, "post_title") || "无标题";
            },
            authorID : function (){
                return _.get(this.post, "post_author")
            },
            banner : function (){
                return _.get(this.post, "post_banner") || "";
            }
        },
        methods:{},
        mounted() {
        },
        components : {
            Adminbutton
        }
    }
</script>

<style scoped lang="less">
    @import '../assets/css/single-panel.less';
</style>