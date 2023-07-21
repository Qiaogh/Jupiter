import schema2component from "../../../../utils/schema2component";
import {owner_search_api} from "@/pages/mdm/main_data/constants/select_search_api_contant";
import {true_false_options} from "@/utils/commonContants";
import {
    api_dictionary_add,
    api_dictionary_get,
    api_dictionary_update
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
        "label": "枚举编码",
        "type": "input-text",
        "name": "code",
        "required": true
    },
    {
        "label": "枚举名称",
        "type": "input-text",
        "name": "name",
        "required": true
    },
    {
        "type": "switch",
        "name": "editable",
        "label": "是否允许编辑",

    },
    {
        "label": "描述",
        "type": "input-text",
        "name": "description"
    },
    {
        "type": "input-table",
        "name": "items",
        "addable": true,
        "editable": true,
        "columns": [
            {
                "name": "value",
                "label": "编码",
                "type": "input-text"
            },
            {
                "name": "showContext",
                "label": "显示内容",
                "type": "input-text"

            },
            {
                "name": "order",
                "label": "显示顺序",
                "type": "input-number"
            },
            {
                "name": "defaultItem",
                "label": "是否默认",
                "type": "select",
                "options": true_false_options
            },
            {
                "name": "description",
                "label": "描述",
                "type": "input-text"
            }
        ]
    }
]

const add = {
    "type": "button",
    "actionType": "dialog",
    "icon": "fa fa-plus",
    "label": "新增",
    "closeOnOutside": true,
    "dialog": {
        "title": "新增",
        "size": "lg",
        "body": {
            "type": "form",
            "api": api_dictionary_add,
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
        label: "枚举编码",
    },
    {
        name: "name",
        label: "枚举名称",
    },
    {
        name: "editable",
        label: "是否默认",
    },
    {
        name: "description",
        label: "描述",
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

const searchIdentity = "MDictionary";
const showColumns = columns;

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "枚举编码",
                    "type": "input-text",
                    "name": "code",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "枚举名称",
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

const searchFilter =
    filter.body[0].body.map(value => {
        return value.name + "-op=" + value.op;
    }).join("&");

const schema = {
    type: 'page',
    title: '字典管理',
    toolbar: [],
    initApi: "/mdm/dictionary/getAll",
    body: [
        {
            type: "crud",
            name: "dictionaryTable",
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
                                    "initApi": api_dictionary_get,
                                    "api": api_dictionary_update,
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
