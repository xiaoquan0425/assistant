import service from "@/utils/request";

export function login(data) {
    return service.post('/user/login', data)
}
export function catagoryTree() {//根据文档里他没有参数只需要传一个token所以这里就不填参数了
    return service.post('knowledge/category/tree')
}