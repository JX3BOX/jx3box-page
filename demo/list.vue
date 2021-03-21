<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="列表页测试"
            slug="list"
            root="/"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
        >
            <img slot="logo" svg-inline src="../src/assets/img/logo.svg" />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="false">
            <listbox
                :data="data"
                :total="total"
                :pages="pages"
                :per="per"
                :page="page"
                @appendPage="appendPage"
                @changePage="changePage"
            >
                <!-- 搜索 -->
                <div class="m-archive-search" slot="search-before">
                    <a
                        :href="publish_link"
                        class="u-publish el-button el-button--primary "
                    >
                        + 发布作品
                    </a>
                    <el-input
                        placeholder="请输入搜索内容"
                        v-model="search"
                        class="input-with-select"
                    >
                        <span slot="prepend">关键词</span>
                        <!-- <el-select
                        v-model="searchType"
                        slot="prepend"
                        placeholder="请选择"
                    >
                        <el-option label="标题" value="title"></el-option>
                        <el-option label="作者" value="authorname"></el-option>
                    </el-select> -->
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                        ></el-button>
                    </el-input>
                </div>

                <template slot="filter">
                    <!-- 版本过滤 -->
                    <clientBy @filter="filter" type="std"></clientBy>
                    <!-- 角标过滤 -->
                    <markBy @filter="filter"></markBy>
                    <!-- 排序过滤 -->
                    <orderBy @filter="filter"></orderBy>
                </template>

                <!-- 列表 -->
                <div class="m-archive-list" v-if="data.length">
                    <ul class="u-list">
                        <li class="u-item" v-for="(item, i) in data" :key="i">
                            <!-- Banner -->
                            <a
                                class="u-banner"
                                :href="item.post.ID | postLink"
                                :target="target"
                                ><img
                                    :src="
                                        showBanner(
                                            item.post.post_banner,
                                            item.post.post_subtype
                                        )
                                    "
                            /></a>

                            <h2
                                class="u-post"
                                :class="{ isSticky: item.post.sticky }"
                            >
                                <img
                                    class="u-icon"
                                    svg-inline
                                    src="../src/assets/img/list/post.svg"
                                />

                                <!-- 标题文字 -->
                                <a
                                    class="u-title"
                                    :style="item.post.color | isHighlight"
                                    :href="item.post.ID | postLink"
                                    :target="target"
                                    >{{ item.post.post_title || "无标题" }}</a
                                >

                                <!-- 角标 -->
                                <span
                                    class="u-marks"
                                    v-if="
                                        item.post.mark && item.post.mark.length
                                    "
                                >
                                    <i
                                        v-for="mark in item.post.mark"
                                        class="u-mark"
                                        :class="mark | markcls"
                                        :key="mark"
                                        >{{ mark | showMark }}</i
                                    >
                                </span>
                            </h2>

                            <!-- 字段 -->
                            <div class="u-content u-desc">
                                {{
                                    item.post.post_excerpt ||
                                        item.post.post_title
                                }}
                            </div>

                            <!-- 作者 -->
                            <div class="u-misc">
                                <img
                                    class="u-author-avatar"
                                    :src="item.author.avatar | showAvatar"
                                    :alt="item.author.name"
                                />
                                <a
                                    class="u-author-name"
                                    :href="item.author.uid | authorLink"
                                    target="_blank"
                                    >{{ item.author.name }}</a
                                >
                                <span class="u-date">
                                    Updated on
                                    <time>{{
                                        item.post.post_modified | dateFormat
                                    }}</time>
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </listbox>
            <RightSidebar></RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import List from "../src/cms-list.vue";
import { getPosts } from "../src/service/post";
import {
    showAvatar,
    authorLink,
    showBanner,
    publishLink,
    buildTarget,
    getAppType,
} from "@jx3box/jx3box-common/js/utils";
import listbox from '../src/cms-list.vue'
export default {
    name: "App",
    props: [],
    data: function() {
        return {
            loading: false, //加载状态

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 10, //每页条目
            appendMode: false, //追加模式

            search: "",
            searchType: "title",

            order: "", //排序模式
            mark: "", //筛选模式
            client: "", //版本选择
        };
    },
    computed: {
        subtype: function() {
            // return this.$store.state.subtype;
            return this.$route.params.subtype;
        },
        params: function() {
            let params = {
                per: this.per,
                subtype: this.subtype,
                page: ~~this.page || 1,
            };
            if (this.search) {
                params.search = this.search;
            }
            if (this.order) {
                params.order = this.order;
            }
            if (this.mark) {
                params.mark = this.mark;
            }
            return params;
        },
        target: function() {
            return buildTarget();
        },
        // 根据栏目定义
        defaultBanner: function() {
            return __imgPath + "image/banner/null.png";
        },
        publish_link: function(val) {
            return publishLink("bbs");
        },
    },
    methods: {
        loadData: function(i = 1, append = false) {
            this.loading = true;
            getPosts(query)
                .then((res) => {
                    if (append) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        window.scrollTo(0, 0);
                        this.data = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changePage: function(i) {
            this.appendMode = false;
            this.page = i;
            window.scrollTo(0, 0);
        },
        appendPage: function(i) {
            this.appendMode = true;
            this.page = i;
        },
        filter: function(o) {
            this.appendMode = false;
            this[o["type"]] = o["val"];
        },
    },
    created: function() {},
    components: {
        listbox
    },
};
</script>
