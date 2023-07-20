import schema2component from "../../../utils/schema2component";
import {role_search_api} from "@/pages/user/constants/select_search_api_constant";
import {
    api_user_add,
    api_user_delete,
    api_user_get,
    api_user_reset_password,
    api_user_update
} from "@/pages/user/constants/api_constant";
import {create_update_columns} from "@/utils/commonContants";

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
    "type": "button",
    "actionType": "drawer",
    "icon": "fa fa-plus",
    "label": "新增",
    "target": "UserTable",
    "closeOnOutside": true,
    "drawer": {
        "size": "lg",
        "title": "新增",
        "body": {
            "type": "form",
            "api": api_user_add,
            "body": form
        }
    }
}

const columns = [
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
        name: "email",
        label: "邮箱"
    },
    {
        name: "phone",
        label: "手机号"
    },
    {
        name: 'status',
        label: '状态'
    },
    {
        name: 'lastLoginIp',
        label: '登录ip'
    },
    ...create_update_columns
]
const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "用户名称",
                    "type": "input-text",
                    "name": "username",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "创建人",
                    "type": "input-text",
                    "name": "createUser",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "type": "input-date-range",
                    "name": "createTime",
                    "label": "创建时间",
                    "clearable": true,
                    "op": "bt"
                }
            ]
        }
    ],
}

const searchIdentity = "User";
const showColumns = columns;

const searchFilter =
    filter.body[0].body.map(value => {
        return value.name + "-op=" + value.op;
    }).join("&");

const schema = {
    type: 'page',
    title: '用户管理',
    toolbar: [],
    body: [
        {
            type: "crud",
            name: "UserTable",
            api: {
                method: "POST",
                url: "/search/search?page=${page}&perPage=${perPage}&" + searchFilter,
                dataType: "application/json"
            },
            defaultParams: {
                "searchIdentity": searchIdentity,
                "showColumns": showColumns
            },
            filter: filter,
            headerToolbar: [
                add,
                "reload",
                {
                    "type": "export-excel",
                    "label": "导出",
                    "api": "/search/search?page=${1}&perPage=${100000}&" + searchFilter,
                    "fileName": "user"
                }
            ],
            footerToolbar: ["switch-per-page", "statistics", "pagination"],
            columns: [
                ...columns,
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
                                    "initApi": api_user_get,
                                    "api": api_user_update,
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
                            "api": api_user_delete
                        },
                        {
                            "label": "重置密码",
                            "type": "button",
                            "actionType": "ajax",
                            "confirmText": "确认要重置密码？",
                            "api": api_user_reset_password
                        }
                    ],
                    toggled: true
                }
            ]
        }
    ]
};

export default schema2component(schema);
