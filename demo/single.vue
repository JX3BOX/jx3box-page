<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="单页测试"
            slug="single"
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
            <Single :post="post_data" :stat="stat_data" />
            <RightSidebar></RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Single from "../src/cms-single.vue";
import { getPost } from "../src/service/post";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function () {
        return {
            id: "",
            post_data: "",
            author_data: "",
            stat_data: "",
            loading: false,
        };
    },
    computed: {},
    methods: {},
    created: function () {
        this.id = getRewrite("pid");
        if (this.id) {
            this.loading = true;
            getPost(this.id, this)
                .then((res) => {
                    this.post_data = res.data.data || {};
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },
    components: {
        Single,
    },
};
</script>
