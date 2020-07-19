<template>
    <div class="m-single-box">
        
        <!-- 头部 -->
        <single-header :post="post" :author="author" :stat="stat">
            <slot name="single-header"></slot>
        </single-header>

        <!-- 文章前 -->
        <div class="m-single-prepend">
            <slot></slot>
        </div>

        <!-- 文章内容 -->
        <div class="m-single-post">
            <el-divider content-position="left">JX3BOX</el-divider>
            <div class="m-single-content">
                <Article :content="content" :directorybox="directorybox"/>
            </div>
        </div>

        <!-- 文章后 -->
        <div class="m-single-append">
            <single-panel :post="post" :author="author"></single-panel>
            <slot name="single-append"></slot>
        </div>

        <!-- 评论 -->
        <div class="m-single-comment" v-if="id">
            <el-divider content-position="left">评论</el-divider>
            <Comment :post-id="id"/>
        </div>

        <!-- 底部 -->
        <footer class="m-single-footer">
            <slot name="single-footer"></slot>
        </footer>
    </div>
</template>

<script>
import _ from "lodash";

import SingleHeader from './components/single-header.vue';
import Article from '@jx3box/jx3box-editor/src/Article.vue'
import SinglePanel from './components/single-panel.vue'
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue"

export default {
    name: "cms-single",
    props: ['post','author','stat','directory'],
    data: function() {
        return {
            directorybox : this.directory || '#directory',
        };
    },
    computed: {
        data() {
            return `${this.post},${this.author},${this.stat}`;
        },
        content : function (){
            return _.get(this.post,'post_content') || ''
        },
        id : function (){
            return ~~_.get(this.post, "ID") || 0
        },
    },
    watch : {
        data(){
            this.$forceUpdate()
        }
    },
    methods: {
        
    },
    filters: {},
    created: function() {
    },
    components: {
        Article,
        Comment,
        'single-header':SingleHeader,
        'single-panel':SinglePanel,
    },
};
</script>

<style lang="less">
@import "./assets/css/cms-single.less";
</style>
