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
            <!-- <List
                type="fb"
                :searchEnable="true"
                :filterEnable="true"
                :_loading="loading"
                :_data="data"
                :_total="total"
                :_pages="pages"
                @changePage="loadData(i)"
                @appendPage="loadData(i,true)"
                @filterMark="loadData()"
            /> -->
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
            data : [],
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
