import { $ } from "./axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";
const API_SINGLE = "post/find";
import failCallback from "../utils/fail";

function getPost(pid, vm) {
    return $.get(API_SINGLE, {
        params: {
            id: pid,
        },
    }).catch((err) => {
        failCallback(err, vm);
    });
}

export { getPost };
