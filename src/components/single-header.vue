<template>
    <header class="m-single-header">

        <!-- 标题 -->
        <div class="m-single-title">
            <a class="u-title u-sub-block" :href="url">
                <i v-if="isOriginal" class="u-original">原创</i> 
                <img v-if="isPrivate" class="u-private" svg-inline src="../assets/img/single/lock.svg" title="仅自己可见"/>
                <span class="u-title-text">{{ title }}</span>
            </a>
        </div>

        <!-- 信息 -->
        <div class="m-single-info">

            <!-- 用户名 -->
            <div class="u-author u-sub-block">
                <i class="u-author-icon"><img svg-inline src="../assets/img/single/author.svg"/></i>
                <a class="u-name" :href="author_link">{{ author_name }}</a>
            </div>

            <!-- 自定义字段 -->
            <!-- <template v-if="metas && metas.length">
            <div class="u-meta u-sub-block" v-for="(meta_value,meta_key) in metas" :key="meta_key">
                <em class="u-label">{{meta_key}}</em>
                <span class="u-value">{{meta_value}}</span>
            </div>
            </template> -->
            <slot></slot>

            <!-- 发布日期 -->
            <span class="u-podate u-sub-block" title="发布日期">
                <i class="u-icon-podate"><img svg-inline src="../assets/img/single/podate.svg"/></i>
                <time>{{ post_date }}</time>
            </span>

            <!-- 最后更新 -->
            <span class="u-modate u-sub-block" title="最后更新">
                <i class="u-icon-modate"><img svg-inline src="../assets/img/single/modate.svg"/></i>
                <time>{{ update_date }}</time>
            </span>

            <!-- 查看次数 -->
            <span class="u-views u-sub-block">
                <i class="el-icon-view"></i>
                {{ views }}
            </span>

            <!-- 编辑 -->
            <a class="u-edit u-sub-block" :href="edit_link" v-if="canEdit">
                <i class="u-icon-edit el-icon-edit-outline"></i>
                <span>编辑</span>
            </a>
        </div>

    </header>
</template>

<script>
import _ from 'lodash'
import {__Root} from '@jx3box/jx3box-common/js/jx3box.json'
import dateFormat from "../utils/dateFormat";
import { editLink,authorLink } from "@jx3box/jx3box-common/js/utils.js";
import User from "@jx3box/jx3box-common/js/user.js";
export default {
    name: "single-header",
    props: ['post','author','stat'],
    data: function() {
        return {};
    },
    computed: {
        url: function() {
            return location.href;
        },
        isOriginal:function (){
            return !!~~_.get(this.post, "original")
        },
        isPrivate : function (){
            let status = _.get(this.post, "post_status")
            return status == 'draft' || status == 'pending'
        },
        title: function() {
            return _.get(this.post, "post_title") || "无标题";
        },
        author_link: function() {
            return authorLink(_.get(this.author, "uid"))
        },
        author_name: function() {
            return _.get(this.author, "name") || "匿名";
        },
        post_date: function() {
            return dateFormat(new Date(_.get(this.post, "post_date")));
        },
        update_date: function() {
            return dateFormat(new Date(_.get(this.post, "post_modified")));
        },
        views : function (){
            return _.get(this.stat, "views") || "-";
        },
        edit_link: function() {
            return editLink(
                _.get(this.post, "post_type"),
                _.get(this.post, "ID")
            );
        },
        canEdit: function() {
            return (
                _.get(this.post, "post_author") == User.getInfo().uid ||
                User.getInfo().group > 60
            )
        }
    },
    methods: {},
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/single-header.less";
</style>
