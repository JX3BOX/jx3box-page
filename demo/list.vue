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
                <template slot="filter">
                    <a
                        :href="publish_link"
                        class="u-publish el-button el-button--primary el-button--small"
                    >
                        + 发布作品
                    </a>
                    <!-- 角标过滤 -->
                    <markBy @filter="filter"></markBy>
                    <!-- 排序过滤 -->
                    <orderBy @filter="filter"></orderBy>
                </template>

                <!-- 搜索 -->
                <div class="m-archive-search" slot="search-before">
                    <el-input
                        placeholder="请输入关键词"
                        v-model="search"
                        class="input-with-select"
                        @change="loadPosts"
                    >
                        <el-select
                            v-model="searchType"
                            slot="prepend"
                            placeholder="请选择"
                            @change="loadPosts"
                        >
                            <el-option label="标题" value="title"></el-option>
                            <el-option
                                label="作者"
                                value="authorname"
                            ></el-option>
                        </el-select>
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                        ></el-button>
                    </el-input>
                </div>

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
export default {
    name: "App",
    props: [],
    data: function() {
        return {
            data: [],
        };
    },
    computed: {
        subtype: function() {
            return this.$store.state.subtype;
        },
        params: function() {
            let params = {
                per: this.per,
                subtype: this.subtype,
            };
            if (this.search) {
                params[this.searchType] = this.search;
            }
            if (this.order) {
                params.order = this.order;
            }
            if (this.mark) {
                params.mark = this.mark;
            }
            return params;
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
    },
    created: function() {},
    components: {
        // List,
    },
};
</script>
