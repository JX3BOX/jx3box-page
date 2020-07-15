<template>
    <div class="m-archive-box" v-loading="loading">
        <!-- 搜索 -->
        <div class="m-archive-search" v-if="searchEnable">
            <el-input
                placeholder="请输入关键词"
                v-model="search"
                class="input-with-select"
                @change="loadData"
            >
                <el-select
                    v-model="searchType"
                    slot="prepend"
                    placeholder="请选择"
                >
                    <el-option label="标题" value="title"></el-option>
                    <el-option label="作者" value="authorname"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        <!-- 排序 -->
        <div class="m-archive-order" v-if="filterEnable">
            <!-- 发布按钮 -->
            <a
                :href="publish_link"
                class="u-publish el-button el-button--primary el-button--small"
            >
                + 发布作品
            </a>

            <!-- 角标过滤 -->
            <div class="u-filter" :class="{ on: filter_visible }">
                <span class="u-label" @click="showFilter">
                    <span class="u-current-filter"
                        >筛选 : {{ currentMark || "全部" }}</span
                    >
                    <span class="u-toggle">
                        <i class="el-icon-arrow-down"></i>
                        <i class="el-icon-arrow-up"></i>
                    </span>
                </span>
                <span class="u-options">
                    <span
                        class="u-mode u-all"
                        :class="{ on: mark == '' }"
                        @click="filterMark('')"
                        ><i class="el-icon-s-operation"></i> 全部</span
                    >
                    <span
                        class="u-mode u-newbie"
                        :class="{ on: mark == 'newbie' }"
                        @click="filterMark('newbie')"
                        ><i class="el-icon-user"></i> 新手易用</span
                    >
                    <span
                        class="u-mode u-advanced"
                        :class="{ on: mark == 'advanced' }"
                        @click="filterMark('advanced')"
                        ><i class="el-icon-data-line"></i> 进阶推荐</span
                    >
                    <span
                        class="u-mode u-recommended"
                        :class="{ on: mark == 'recommended' }"
                        @click="filterMark('recommended')"
                        ><i class="el-icon-star-off"></i> 编辑精选</span
                    >
                    <span
                        class="u-mode u-geek"
                        :class="{ on: mark == 'geek' }"
                        plain
                        @click="filterMark('geek')"
                        ><i class="el-icon-medal-1"></i> 骨灰必备</span
                    >
                </span>
            </div>

            <!-- 排序模式 -->
            <div class="u-modes" :class="{ on: order_visible }">
                <span class="u-label" @click="showOrder">
                    <span class="u-current-order"
                        >排序 : {{ currentOrder || "最后更新" }}</span
                    >
                    <span class="u-toggle">
                        <i class="el-icon-arrow-down"></i>
                        <i class="el-icon-arrow-up"></i>
                    </span>
                </span>
                <span class="u-options">
                    <span
                        class="u-mode u-update"
                        :class="{ on: order == 'update' }"
                        @click="reorder('update')"
                        ><i class="el-icon-refresh"></i> 最后更新</span
                    >
                    <span
                        class="u-mode u-podate"
                        :class="{ on: order == 'podate' }"
                        @click="reorder('podate')"
                        ><i class="el-icon-sort"></i> 最早发布</span
                    >
                </span>
            </div>
        </div>

        <!-- 列表 -->
        <div class="m-archive-list">
            <ul class="u-list" v-if="data.length">
                <slot v-bind="data"></slot>
            </ul>
            <el-alert
                v-else
                class="m-archive-null"
                title="没有找到相关条目"
                type="info"
                center
                show-icon
            >
            </el-alert>
            <el-button
                class="m-archive-more"
                type="primary"
                :class="{ show: hasNextPage }"
                v-loading="loading"
                @click="appendPage(++page)"
                >加载更多</el-button
            >
            <el-pagination
                class="m-archive-pages"
                layout="prev, pager, next"
                background
                hide-on-single-page
                :page-size.sync="per"
                :total="total"
                :current-page="page"
                @current-change="changePage"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { publishLink } from "@jx3box/jx3box-common/js/utils";
const mark_map = {
    newbie: "新手易用",
    advanced: "进阶推荐",
    recommended: "编辑精选",
    geek: "骨灰必备",
};
const order_map = {
    update: "最后更新",
    podate: "最早发布",
    favs: "收藏最多",
    likes: "点赞最多",
    downs: "下载最多",
};
export default {
    name: "cms-list",
    props: ["type", "_per", "searchEnable", "filterEnable","_total","_pages","_data",'_loading'],
    data: function() {
        return {
            loading : this._loading,
            per: this._per || 10, //每页条目

            data: this._data || [], //数据列表
            total: this._total || 1, //总条目数
            pages: this._pages || 1, //总页数

            page: 1, //当前页数
            search: "",
            searchType: "title",
            order: "", //排序模式
            mark: "", //筛选模式

            filter_visible: false,
            order_visible: false,
        };
    },
    computed: {
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
        publish_link: function(val) {
            return publishLink(this.type);
        },
    },
    filters: {},
    methods: {
        changePage: function(i) {
            this.$emit("changePage", i);
        },
        appendPage: function(i) {
            this.$emit("appendPage", i);
        },
        filterMark: function(val) {
            this.mark = val;
            this.filter_visible = false;
            this.$emit("filterMark",val);
        },
        reorder: function(val) {
            this.order = val;
            this.order_visible = false;
            this.$emit("filterReload");
        },
        showFilter: function() {
            this.filter_visible = !this.filter_visible;
        },
        showOrder: function() {
            this.order_visible = !this.order_visible;
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "./assets/css/cms-list.less";
</style>
