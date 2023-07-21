import schema2component from "../../../../utils/schema2component";
import {owner_search_api} from "@/pages/mdm/main_data/constants/select_search_api_contant";
import {
    api_barcode_parse_rule_add,
    api_barcode_parse_rule_get, api_barcode_parse_rule_update
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
        "label": "规则编码",
        "type": "input-text",
        "name": "code"
    },
    {
        "label": "规则名称",
        "type": "input-text",
        "name": "name"
    },
    {
        "label": "货主编码",
        "type": "select",
        "name": "ownerCode",
        "source": owner_search_api
    },
    {
        "label": "埋点",
        "type": "select",
        "name": "executeTime",
        "source": "${ExecuteTime}",
    },
    {
        "label": "业务模块",
        "type": "select",
        "name": "businessFlow",
        "source": "${BusinessFlow}",
    },
    {
        "label": "品牌",
        "type": "select",
        "name": "brand"
    },
    {
        "label": "拼接位置",
        "type": "select",
        "name": "unionLocation",
        "source": "${UnionLocation}",
    },
    {
        "type": "input-text",
        "name": "unionStr",
        "placeholder": "请输入拼接内容"
    },
    {
        "label": "解析规则",
        "type": "textarea",
        "name": "regularExpression"
    },
    {
        "name": "resultFields",
        "label": "解析对象",
        "type": "input-array",
        "inline": true,
        "items": {
            "type": "select",
            "clearable": false,
            "source": "${ParserObject}"
        }
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
            "api": api_barcode_parse_rule_add,
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
        label: "规则编码",
    },
    {
        name: "name",
        label: "规则名称",
    },
    {
        name: "ownerCode",
        label: "货主",
    },
    {
        name: "executeTime",
        label: "埋点",
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

const searchIdentity = "MBarcodeParseRule";
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
                    "label": "货主",
                    "type": "select",
                    "name": "ownerCode",
                    "clearable": true,
                    "source": owner_search_api,
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
    title: '条码解析管理',
    toolbar: [],
    initApi: "/mdm/dictionary/getAll",
    body: [
        {
            type: "crud",
            name: "barcodeParseRule",
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
                                    initApi: api_barcode_parse_rule_get,
                                    "api": api_barcode_parse_rule_update,
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
