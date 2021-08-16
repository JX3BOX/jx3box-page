<template>
    <div class="m-single-panel">
        <div class="u-minigroup">
            <Print class="u-fn" :title="title" :authorID="authorID" />
            <QRcode class="u-fn" />
            <Share class="u-fn u-share" :meta="meta" :simple="true"/>
        </div>
        <div class="u-btngroup">
            <Fav class="u-fav" :postType="post.post_type" :postId="post.ID" />
            <Feed class="u-feed" :postType="post.post_type" :postId="post.ID" />
            <Adminbutton class="u-admin" size="mini" />
        </div>
    </div>
</template>

<script>
import Adminbutton from "@jx3box/jx3box-common-ui/src/bread/Adminbutton.vue";
import Share from '@jx3box/jx3box-common-ui/src/interact/Share2.vue'
export default {
    name: "single-panel",
    props: ["post"],
    data() {
        return {};
    },
    computed: {
        title: function () {
            return _.get(this.post, "post_title") || "无标题";
        },
        authorID: function () {
            return _.get(this.post, "post_author");
        },
        banner: function () {
            return _.get(this.post, "post_banner") || "";
        },
        meta : function (){
            return {
                title : this.title,
                banner : this.banner,
                desc : "",
                summary : `作者：${this.post?.author || '匿名'}，来自：JX3BOX魔盒`
            }
        }
    },
    methods: {},
    mounted() {},
    components: {
        Adminbutton,
        Share
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/single-panel.less";
.u-share{
    .fz(13px);
}
</style>