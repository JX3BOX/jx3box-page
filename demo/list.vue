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
            <List />
            <RightSidebar></RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import List from "../src/cms-list.vue";
import { getPosts } from "../src/service/post";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function () {
        return {
            loading : false
        };
    },
    computed: {},
    methods: {},
    created: function () {
    },
    components: {
        List,
    },
};
</script>
