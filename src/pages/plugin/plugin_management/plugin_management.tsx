import schema2component from "../../../utils/schema2component";
import {api_plugin_add} from "@/pages/plugin/constants/api_constant";

const fromBody = [
    {
        "type": "hidden",
        "name": "id"
    },
    {
        "type": "hidden",
        "name": "version"
    },
    {
        "type": "input-file",
        "name": "jarFile",
        "label": "plugin jar file",
        "accept": ".jar",
        "asBlob": true,
        "drag": true,
        "required": true
    }
]

const form = {
    "type": "form",
    "api": api_plugin_add,
    body: fromBody
}

const add = {
    "type": "button",
    "actionType": "drawer",
    "icon": "fa fa-plus",
    "label": "上传插件",
    "target": "PluginTable",
    "closeOnOutside": true,
    "drawer": {
        "size": "lg",
        "title": "上传插件",
        "body": form
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

const columns = [
    {
        name: "id",
        label: "ID",
        hidden: true
    },
    {
        name: "version",
        label: "Version",
        hidden: true
    },
    {
        name: "code",
        label: "插件编码",
    },
    {
        name: "name",
        label: "插件名称",
    },
    {
        name: "developer",
        label: "开发者",
    },
    {
        name: "pluginVersion",
        label: "插件版本",
    },
    // {
    //     name: "所属系统",
    //     label: "applySystem",
    // },
    // {
    //     name: "所属模块",
    //     label: "applyModule",
    // },
    {
        name: "createUser",
        label: "创建人",
    },
    {
        name: "createTime",
        label: "创建时间",
    },
    {
        name: "updateTime",
        label: "更新时间",
    }
]

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "插件编码",
                    "type": "input-text",
                    "name": "code",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "插件名称",
                    "type": "input-text",
                    "name": "name",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "开发者",
                    "type": "input-text",
                    "name": "developer",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                // {
                //     "label": "所属系统",
                //     "type": "input-text",
                //     "name": "applySystem",
                //     "clearable": true,
                //     "size": "sm",
                //     "op": "eq"
                // },
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

const schema = {
    type: 'page',
    title: '插件管理',
    toolbar: [],
    body: [
        {
            type: "crud",
            name: "PluginTable",
            api: {
                method: "GET",
                url: "/plugin/pluginManage/listAll"
            },
            headerToolbar: [
                add
            ],
            filter: filter,
            footerToolbar: ["switch-per-page", "statistics", "pagination"],
            columns: [
                ...columns,
                {
                    type: "operation",
                    label: "操作",
                    width: 100,
                    buttons: [],
                    toggled: true
                }
            ]
        }
    ]
};

export default schema2component(schema);
