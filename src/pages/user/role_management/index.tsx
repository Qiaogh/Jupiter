import schema2component from "../../../utils/schema2component";
import {
    api_role_add, api_role_delete,
    api_role_get_role_menu,
    api_role_update,
    api_role_update_role_menu
} from "@/pages/user/constants/api_constant";
import {create_update_columns} from "@/utils/commonContants";

const form = [
    {
        "type": "hidden",
        "name": "id"
    },
    {
        "label": "角色编码",
        "type": "input-text",
        "name": "code"
    },
    {
        "label": "角色名称",
        "type": "input-text",
        "name": "name"
    },
    {
        "label": "描述",
        "type": "input-text",
        "name": "description"
    },
    {
        "label": "状态",
        "type": "switch",
        "name": "status",
        "value": 1,
        "trueValue": 1,
        "falseValue": 0
    }
]

const add = {
    "type": "button",
    "actionType": "drawer",
    "icon": "fa fa-plus",
    "label": "新增",
    "target": "RoleTable",
    "closeOnOutside": true,
    "drawer": {
        "size": "lg",
        "title": "新增",
        "body": {
            "type": "form",
            "api": api_role_add,
            "body": form
        }
    }
}

const actions = [
    {
        "type": "reset",
        "label": "重置"
    },
    {
        "type": "submit",
        "level": "primary",
        "label": "查询"
    }
]

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "角色名称",
                    "type": "input-text",
                    "name": "name",
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
    actions: actions
}

const columns = [
    {
        name: "id",
        label: "ID",
    },
    {
        name: "name",
        label: "角色名称",
    },
    {
        name: "code",
        label: "角色编码",
    },
    {
        name: 'status',
        label: '状态'
    },
    ...create_update_columns
]

const menuTree = [
    {
        "type": "input-tree",
        "name": "menus",
        "label": "菜单权限",
        "labelField": "title",
        "valueField": "id",
        "multiple": true,
        "initiallyOpen": false,
        "withChildren": true,
        "pathSeparator": "/",
        "source": api_role_get_role_menu
    }];

const searchIdentity = "URole";
const showColumns = columns;

const searchFilter =
    filter.body[0].body.map(value => {
        return value.name + "-op=" + value.op;
    }).join("&");


const schema = {
    type: 'page',
    title: '角色管理',
    toolbar: [],
    body: [
        {
            type: "crud",
            name: "RoleTable",
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
                    "fileName": "container"
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
                                    // "initApi": "get:/user/api/user/${id}",
                                    "api": api_role_update,
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
                            "api": api_role_delete
                        },
                        {
                            "label": "分配权限",
                            "type": "button",
                            "actionType": "drawer",
                            "drawer": {
                                "title": "分配权限",
                                "body": {
                                    "type": "form",
                                    "api": api_role_update_role_menu,
                                    "body": menuTree
                                }
                            }
                        },
                    ],
                    toggled: true
                }
            ]
        }
    ]
};

export default schema2component(schema);
