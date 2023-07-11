import schema2component from "../../../../utils/schema2component";
import {owner_search_api} from "@/pages/mdm/main_data/constants/select_search_api_contant";
import {true_false_options} from "@/utils/commonContants";

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
        "name": "code",
        "required": true
    },
    {
        "label": "规则名称",
        "type": "input-text",
        "name": "name",
        "required": true
    },
    {
        "type": "select",
        "name": "ownerCode",
        "label": "货主",
        "source": owner_search_api

    },
    {
        "label": "商品大类",
        "type": "select",
        "name": "skuFirstCategory",
        "options": "${SkuFirstCategory}",
    },
    {
        "type": "input-table",
        "name": "batchAttributeFieldConfigs",
        "addable": true,
        "copyable": true,
        "editable": true,
        "showFooterAddBtn": false,
        "value": [
            {
                "fieldCode": "inboundDate",
                "fieldName": "入库日期"
            },
            {
                "fieldCode": "productDate",
                "fieldName": "生产日期"
            },
            {
                "fieldCode": "expiredDate",
                "fieldName": "到期日期"
            }
        ],
        "columns": [
            {
                "name": "fieldCode",
                "label": "批次属性编码",
                "type": "input-text"
            },
            {
                "name": "fieldName",
                "label": "批次属性",
                "type": "input-text"

            },
            {
                "name": "required",
                "label": "是否必填",
                "type": "select",
                "options": true_false_options
            },
            {
                "name": "keyAttribute",
                "label": "关键属性",
                "type": "select",
                "options": true_false_options
            },
            // {
            //     "name": "format",
            //     "label": "给是",
            //     "type": "select",
            // },
            {
                "name": "enable",
                "label": "启用",
                "type": "select",
                "options": true_false_options
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
            "api": "post:/mdm/batchAttributeConfig/createOrUpdate",
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
        name: "skuFirstCategory",
        label: "商品大类",
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

const searchIdentity = "BatchAttributeConfig";
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
    title: '批次管理',
    toolbar: [],
    initApi: "/mdm/dictionary/getAll",
    body: [
        {
            type: "crud",
            name: "batchAttributeTable",
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
                                    "initApi": {
                                        "url": "/mdm/batchAttributeConfig/${id}",
                                        "method": "get"
                                    },
                                    "api": "post:/mdm/batchAttributeConfig/createOrUpdate",
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
