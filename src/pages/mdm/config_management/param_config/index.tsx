import schema2component from "../../../../utils/schema2component";
import {
    api_param_config_add,
    api_param_config_get,
    api_param_config_update
} from "@/pages/mdm/config_management/constants/api_constant";

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
        "label": "参数编码",
        "type": "input-text",
        "name": "code"
    },
    {
        "label": "参数名称",
        "type": "input-text",
        "name": "name"
    },
    {
        "label": "参数对象",
        "type": "select",
        "name": "configApplyObject",
        "source": "${ConfigApplyObject}",
    },
    {
        "label": "业务模块",
        "type": "select",
        "name": "configApplyModule",
        "source": "${ConfigApplyModule}",
    },
    {
        "label": "参数类型",
        "type": "select",
        "name": "configType",
        "source": "${ConfigType}",
    },
    {
        "label": "状态",
        "type": "switch",
        "name": "enable"
    },
    {
        "label": "默认值",
        "type": "input-text",
        "name": "defaultValue"
    },
    {
        "label": "描述",
        "type": "input-text",
        "name": "description"
    },
    {
        "label": "备注",
        "type": "input-text",
        "name": "remark"
    }
]

const add = {
    "type": "button",
    "actionType": "dialog",
    "icon": "fa fa-plus",
    "label": "新增",
    "closeOnOutside": true,
    "dialog": {
        "name": "addDialog",
        "title": "新增",
        "size": "lg",
        "body": {
            "type": "form",
            "api": api_param_config_add,
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
        label: "参数编码",
    },
    {
        name: "name",
        label: "参数名称",
    },
    {
        name: "configApplyObject",
        label: "参数对象",
    },
    {
        name: "configApplyModule",
        label: "业务模块",
    },
    {
        name: "configType",
        label: "参数类型",
    },
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

const searchIdentity = "ParameterConfig";
const showColumns = columns;

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "编码",
                    "type": "input-text",
                    "name": "code",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "名称",
                    "type": "input-text",
                    "name": "name",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "参数对象",
                    "type": "select",
                    "name": "configApplyObject",
                    "clearable": true,
                    "source": "${ConfigApplyObject}",
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
                    "op": "bt"
                }
            ]
        }
    ],
    actions: actions
}

const searchFilter =
    filter.body[0].body.map(value => {
        return value.name + "-op=" + value.op;
    }).join("&");

const schema = {
    type: 'page',
    title: '参数管理',
    toolbar: [],
    initApi: "/mdm/dictionary/getAll",
    body: [
        {
            type: "crud",
            name: "paramConfigTable",
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
                            "actionType": "dialog",
                            "dialog": {
                                "title": "修改",
                                "size": "lg",
                                "body": {
                                    "type": "form",
                                    initApi: api_param_config_get,
                                    "api": api_param_config_update,
                                    "controls": form
                                }
                            }
                        }
                    ],
                    toggled: true
                }
            ]
        }
    ]
};

export default schema2component(schema);
