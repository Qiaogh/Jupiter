import schema2component from "../../../../utils/schema2component";
import {volume, weight} from "@/pages/mdm/main_data/constants/form_constants";
import {owner_search_api} from "@/pages/mdm/main_data/constants/select_search_api_contant";
import {api_sku_add, api_sku_get, api_sku_update} from "@/pages/mdm/main_data/constants/api_constant";

const form = [
    {
        "type": "tabs",
        "tabs": [
            {
                "title": "基础信息",
                "controls": [
                    {
                        "type": "input-text",
                        "name": "skuCode",
                        "label": "商品编码",
                        "required": true
                    },
                    {
                        "type": "input-text",
                        "name": "skuName",
                        "label": "商品名称",
                        "required": true
                    },
                    {
                        "type": "input-text",
                        "name": "style",
                        "label": "款式"
                    },
                    {
                        "type": "input-text",
                        "name": "color",
                        "label": "颜色"
                    },
                    {
                        "type": "input-text",
                        "name": "size",
                        "label": "码"
                    },
                    {
                        "type": "input-text",
                        "name": "brand",
                        "label": "品牌"
                    },
                    {
                        "type": "select",
                        "name": "ownerCode",
                        "label": "货主",
                        "source": owner_search_api,
                        "required": true
                    },
                    {
                        "type": "switch",
                        "name": "suit",
                        "label": "是否套装"
                    },
                    ...volume,
                    ...weight,
                    {
                        "type": "input-text",
                        "name": "imageUrl",
                        "label": "图片地址"
                    },
                    {
                        "type": "input-text",
                        "name": "unit",
                        "label": "单位"
                    },
                    {
                        "type": "select",
                        "name": "skuFirstCategory",
                        "label": "一级分类"
                    },
                    {
                        "type": "select",
                        "name": "skuSecondCategory",
                        "label": "二级分类"
                    },
                    {
                        "type": "select",
                        "name": "skuThirdCategory",
                        "label": "三级分类"
                    },
                    {
                        "type": "select",
                        "name": "skuAttributeCategory",
                        "label": "商品属性大类"
                    },
                    {
                        "type": "select",
                        "name": "skuAttributeSubCategory",
                        "label": "商品属性子类"
                    }
                ]
            },
            {
                "title": "配置信息",
                "controls": [
                    {
                        "type": "switch",
                        "name": "enableSn",
                        "label": "唯一码管理"
                    },
                    {
                        "type": "switch",
                        "name": "enableEffective",
                        "label": "效期管理"
                    },
                    {
                        "type": "input-text",
                        "name": "shelfLife",
                        "label": "保质期"
                    },
                    {
                        "type": "input-text",
                        "name": "effectiveDays",
                        "label": "效期限制"
                    },
                    {
                        "type": "select",
                        "name": "barcodeRuleCode",
                        "label": "条码解析规则"
                    },
                    {
                        "type": "select",
                        "name": "heat",
                        "label": "商品热度"
                    },
                    {
                        "type": "switch",
                        "name": "calculateHeat",
                        "label": "计算热度"
                    },
                    {
                        "type": "switch",
                        "name": "noBarcode",
                        "label": "无码商品"
                    },
                    {
                        "name": "barcode",
                        "label": "商品条码",
                        "mode": "horizontal",
                        "type": "input-array",
                        "inline": true,
                        "items": {
                            "type": "input-text",
                            "clearable": false
                        }
                    }
                ]
            }
        ]
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
            "api": api_sku_add,
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
        name: "skuCode",
        label: "商品编码",
    },
    {
        name: "skuName",
        label: "商品名称",
    },
    {
        name: "style",
        label: "款式",
    },
    {
        name: "color",
        label: "颜色",
    },
    {
        name: "size",
        label: "尺码",
    },
    {
        name: "brand",
        label: "品牌",
    },
    {
        name: "skuFirstCategory",
        label: "一级分类",
    },
    {
        name: "skuSecondCategory",
        label: "二级分类",
    },
    {
        name: "skuThirdCategory",
        label: "三级分类",
    },
    {
        name: "skuAttributeCategory",
        label: "一级属性",
    },
    {
        name: "skuAttributeSubCategory",
        label: "二级属性",
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

const searchIdentity = "MSkuMainData";
const showColumns = columns;

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "商品编码",
                    "type": "input-text",
                    "name": "skuCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "商品名称",
                    "type": "input-text",
                    "name": "skuName",
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
    title: '仓库管理',
    toolbar: [],
    initApi: "/mdm/dictionary/getAll",
    body: [
        {
            type: "crud",
            name: "role",
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
                            "actionType": "drawer",
                            "drawer": {
                                "title": "修改",
                                "body": {
                                    "type": "form",
                                    initApi: api_sku_get,
                                    "api": api_sku_update,
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
