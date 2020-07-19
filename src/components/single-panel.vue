<template>
    <div class="m-single-panel">
        <div class="u-minigroup">
            <Print class="u-fn" :title="title" :authorID="authorID" />
            <QRcode class="u-fn" />
            <Sharing class="u-fn" :title="title" :pic="banner"/>
        </div>
        <div class="u-btngroup">
            <Fav class="u-fav"/>
            <Adminbutton class="u-admin" size="mini"/>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'single-panel',
        props:['post','author'],
        data : function(){
            return {
                
            }
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
        mounted:function(){},
        components : {
        }
    }
</script>

<style scoped lang="less">
    @import '../assets/css/single-panel.less';
</style>