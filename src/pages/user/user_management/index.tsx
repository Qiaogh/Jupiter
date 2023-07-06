import schema2component from "../../../utils/schema2component";
import {role_search_api} from "@/pages/user/constants/select_search_api_contant";

const form = [
    {
        "type": "hidden",
        "name": "id"
    },
    {
        "label": "登录用户名称",
        "type": "input-text",
        "name": "username"
    },
    {
        "label": "姓名",
        "type": "input-text",
        "name": "name"
    },
    {
        "label": "角色",
        "type": "select",
        "name": "roleIds",
        "multiple": true,
        "source": role_search_api
    },
    {
        "label": "密码",
        "type": "input-password",
        "name": "password"
    },
    {
        "label": "联系电话",
        "type": "input-text",
        "name": "phone"
    },
    {
        "label": "邮箱",
        "type": "input-text",
        "name": "email"
    },
    {
        "label": "状态",
        "type": "switch",
        "name": "status",
        "value": true,
        "trueValue": 1,
        "falseValue": 0
    }
]

const add = {
    "label": "新增",
    "type": "button",
    "actionType": "dialog",
    "level": "primary",
    "className": "m-b-sm",
    "dialog": {
        "title": "新增",
        "body": {
            "type": "form",
            "api": "post:/user/api/user/add",
            "body": form
        }
    }
};

const schema = {
    type: 'page',
    title: '用户管理',
    toolbar: [],
    body: [
        {
            type: "crud",
            api: {
                method: "POST",
                url: "/user/api/user/search?page=${page}&perPage=${perPage}",
                dataType: "application/json"
            },
            filter: {
                title: "",
                submitText: "",
                controls: [
                    {
                        type: "text",
                        name: "username",
                        placeholder: "用户名称",
                        addOn: {
                            label: "搜索",
                            type: "submit"
                        }
                    }
                ]
            },
            add,
            footerToolbar: ["switch-per-page", "statistics", "pagination"],
            columns: [
                {
                    name: "id",
                    label: "ID",
                },
                {
                    name: "name",
                    label: "姓名",
                },
                {
                    name: "username",
                    label: "登录用户名称",
                },
                {
                    name: "roleNames",
                    label: "角色"
                },
                {
                    name: 'status',
                    label: '状态'
                },
                {
                    name: 'lastLoginIp',
                    label: '登录ip'
                },
                {
                    type: "operation",
                    label: "操作",
                    width: 100,
                    buttons: [
                        {
                            "label": "修改",
                            "type": "button",
                            "actionType": "drawer",
                            "drawer": {
                                "title": "修改",
                                "body": {
                                    "type": "form",
                                    "initApi": "get:/user/api/user/${id}",
                                    "api": "post:/user/api/user/update",
                                    "body": form
                                }
                            }
                        },
                        {
                            "label": "删除",
                            "type": "button",
                            "actionType": "ajax",
                            "level": "danger",
                            "confirmText": "确认要删除？",
                            "api": "delete:/user/api/user/${id}"
                        },
                        {
                            "label": "重置密码",
                            "type": "button",
                            "actionType": "ajax",
                            "confirmText": "确认要重置密码？",
                            "api": "post:/user/api/user/resetPassword/${id}"
                        }
                    ],
                    toggled: true
                }
            ]
        },
        add
    ]
};

export default schema2component(schema);
