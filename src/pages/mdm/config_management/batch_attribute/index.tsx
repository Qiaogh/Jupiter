import schema2component from "../../../../utils/schema2component";

const form = [
    {
        "type": "hidden",
        "name": "id"
    },
    {
        "type": "hidden",
        "name": "version"
    },
    {
        "label": "仓库编码",
        "type": "input-text",
        "name": "warehouseCode"
    },
    {
        "label": "仓库名称",
        "type": "input-text",
        "name": "warehouseName"
    },
    {
        "label": "仓库类型",
        "type": "select",
        "name": "warehouseType",
        "options": "${WarehouseType}",
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
    "target": "role",
    "closeOnOutside": true,
    "drawer": {
        "title": "新增",
        "body": {
            "type": "form",
            "api": "post:/user/api/role/add",
            "body": form
        }
    }
}

const actions = [
    add,
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
                    "size": "sm"
                }
            ]
        }
    ],
    actions: actions
}

const menuTree = [
    {
        "type": "input-tree",
        "name": "menus",
        "label": "菜单权限",
        "multiple": true,
        "initiallyOpen": false,
        "withChildren": true,
        "pathSeparator": "/",
        "source": "get:/user/api/role/getRoleMenu/${id}"
    }];

const schema = {
    type: 'page',
    title: '仓库管理',
    toolbar: [],
    initApi: "/mdm/dictionary/getAll",
    body: [
        {
            type: "crud",
            name: "role",
            api: {
                method: "POST",
                url: "/user/api/role/search?page=${page}&perPage=${perPage}",
                dataType: "application/json"
            },
            filter: filter,
            footerToolbar: ["switch-per-page", "statistics", "pagination"],
            columns: [
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
                                    "api": "post:/user/api/role/update",
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
                            "api": "delete:/user/api/role/${id}"
                        },
                        {
                            "label": "分配权限",
                            "type": "button",
                            "actionType": "drawer",
                            "drawer": {
                                "title": "分配权限",
                                "body": {
                                    "type": "form",
                                    "api": "post:/user/api/role/updateRoleMenu/${id}",
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
