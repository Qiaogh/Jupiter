import schema2component from "../../../utils/schema2component";
import {api_menu_add, api_menu_delete, api_menu_update} from "@/pages/user/constants/api_constant";
import {create_update_columns} from "@/utils/commonContants";
import {menu_search_api} from "@/pages/user/constants/select_search_api_constant";

const form = [
    {
        "type": "hidden",
        "name": "id"
    },
    {
        "label": "系统编码",
        "type": "select",
        "name": "systemCode",
        "source": "${SystemCode}",
        required: true
    },
    {
        "label": "上级菜单",
        "type": "select",
        "name": "parentId",
        "searchable": true,
        "source": menu_search_api
    },
    {
        "label": "菜单类型",
        "type": "select",
        "name": "type",
        "source": "${MenuType}",
        required: true
    },
    {
        "label": "名称",
        "type": "input-text",
        "name": "title",
        required: true
    },
    {
        "label": "描述",
        "type": "input-text",
        "name": "description"
    },
    {
        "label": "权限",
        "type": "input-text",
        "name": "permissions"
    },
    {
        "label": "排序",
        "type": "input-number",
        "name": "orderNum",
        required: true
    },
    {
        "label": "图标",
        "type": "input-text",
        "name": "icon"
    },
    {
        "label": "路径地址",
        "type": "input-text",
        "name": "path"
    },
    {
        "label": "状态",
        "type": "switch",
        "name": "enable",
        "value": 1,
        "trueValue": 1,
        "falseValue": 0,
        required: true
    }
]

const add = {
    "type": "button",
    "actionType": "drawer",
    "icon": "fa fa-plus",
    "label": "新增",
    "target": "MenuTable",
    "closeOnOutside": true,
    "drawer": {
        "size": "lg",
        "title": "新增",
        "body": {
            "type": "form",
            "api": api_menu_add,
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
                    "label": "菜单名称",
                    "type": "input-text",
                    "name": "title",
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
        hidden: true,
        name: "id",
        label: "ID",
    },
    {
        hidden: true,
        name: "parentId",
        label: "parentId",
    },
    {
        name: "title",
        label: "菜单名称",
    },
    {
        name: "systemCode",
        label: "所属系统",
    },
    {
        name: "type",
        label: "类型",
    },
    {
        name: "description",
        label: "描述",
    },
    {
        name: "permissions",
        label: "权限标识",
    },
    {
        name: "orderNum",
        label: "排序",
    },
    {
        name: "icon",
        label: "图标",
    },
    {
        name: "path",
        label: "路径地址",
    },
    {
        name: 'enable',
        label: '状态'
    },
    ...create_update_columns
]

const searchIdentity = "UMenu";
const showColumns = columns;

const searchFilter =
    filter.body[0].body.map(value => {
        return value.name + "-op=" + value.op;
    }).join("&");


const schema = {
    type: 'page',
    title: '菜单管理',
    toolbar: [],
    initApi: "/mdm/dictionary/getAll",
    body: [
        {
            type: "crud",
            name: "MenuTable",
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
                                    "api": api_menu_update,
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
                            "api": api_menu_delete
                        }
                    ],
                    toggled: true
                }
            ]
        }
    ]
};

export default schema2component(schema);
