<template>
    <div class="m-single-box">
        <!-- 头部 -->
        <single-header :post="post" :stat="stat">
            <slot name="single-header"></slot>
        </single-header>

        <!-- 文章前 -->
        <div class="m-single-prepend">
            <slot></slot>
        </div>

        <!-- 文章内容 -->
        <div class="m-single-post" v-if="post._check">
            <el-divider content-position="left">JX3BOX</el-divider>
            <div class="m-single-content">
                <Article :content="content" :directorybox="directorybox" />
            </div>
        </div>
        <div class="m-single-null" v-else>
            <el-alert :title="null_tip" type="warning" show-icon></el-alert>
        </div>

        <!-- 文章后 -->
        <div class="m-single-append">
            <slot name="single-append"></slot>
        </div>

        <!-- 评论 -->
        <div class="m-single-comment">
            <el-divider content-position="left">评论</el-divider>
            <Comment :id="id" category="post" v-if="id && !post.comment"/>
            <el-alert title="作者没有开启评论功能" type="warning" show-icon v-else></el-alert>
        </div>

        <!-- 底部 -->
        <footer class="m-single-footer">
            <slot name="single-footer"></slot>
        </footer>
    </div>
</template>

<script>
import _ from "lodash";

import SingleHeader from "./components/single-header.vue";
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import {__visibleMap} from '@jx3box/jx3box-common/data/jx3box.json'
export default {
    name: "cms-single",
    props: ["post", "stat", "directory"],
    data: function () {
        return {
            directorybox: this.directory || "#directory",
        };
    },
    computed: {
        data() {
            return `${this.post},${this.stat}`;
        },
        id: function () {
            return ~~_.get(this.post, "ID") || 0;
        },
        title : function (){
            return this.post.post_title || '无标题'
        },
        content: function () {
            return _.get(this.post, "post_content") || "";
        },
        null_tip : function (){
            let str = '作者设置了【'
            str += __visibleMap[this.post.visible]
            str += '】'
            return str
        },
    },
    watch: {
        data() {
            this.$forceUpdate();
        },
    },
    methods: {
    },
    filters: {},
    created: function () {
    },
    components: {
        Article,
        Comment,
        "single-header": SingleHeader,
    },
};
</script>

<style lang="less">
@import "./assets/css/cms-single.less";
</style>
