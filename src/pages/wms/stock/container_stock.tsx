import schema2component from "../../../utils/schema2component";

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
        "label": "数量",
        "type": "input-number",
        "name": "qty"
    }
]

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
        hidden: true,
        dbField: "k.id"
    },
    {
        name: "version",
        label: "Version",
        hidden: true,
        dbField: "k.version"
    },
    {
        name: "ownerCode",
        label: "货主编码",
        dbField: "a.owner_code"
    },
    {
        name: "brand",
        label: "品牌",
        dbField: "a.brand"
    },
    {
        name: "skuCode",
        label: "商品编码",
        dbField: "a.sku_code"
    },
    {
        name: "style",
        label: "款号",
        dbField: "a.style"
    },
    {
        name: "color",
        label: "色号",
        dbField: "a.color"
    },
    {
        name: "size",
        label: "尺码",
        dbField: "a.size"
    },
    {
        name: "skuFirstCategory",
        label: "一级分类",
        dbField: "a.sku_first_category"
    },
    {
        name: "skuAttributeCategory",
        label: "一级属性",
        dbField: "a.sku_attribute_category"
    },
    {
        name: "skuAttributes",
        label: "批次属性",
        dbField: "e.sku_attributes"
    },
    {
        name: "warehouseAreaCode",
        label: "库区",
        dbField: "k.warehouse_area_code"
    },
    {
        name: "containerCode",
        label: "储位编码",
        dbField: "k.container_code"
    },
    {
        name: "boxNo",
        label: "箱号",
        dbField: "k.box_no"
    },
    {
        name: "totalQty",
        label: "库存数量",
        dbField: "k.total_qty"
    },
    {
        name: "availableQty",
        label: "可用数量",
        dbField: "k.available_qty"
    },
    {
        name: "noOutboundLockedQty",
        label: "库内占用",
        dbField: "k.no_outbound_locked_qty"
    },
    {
        name: "outboundLockedQty",
        label: "拣货占用",
        dbField: "k.outbound_locked_qty"
    },
    {
        name: "frozenQty",
        label: "冻结数量",
        dbField: "k.frozen_qty"
    },
    {
        name: "createTime",
        label: "创建时间",
        dbField: "k.create_time"
    },
    {
        name: "updateTime",
        label: "更新时间",
        dbField: "k.update_time"
    }
]

const searchIdentity = "ContainerStock";
const showColumns = columns;

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "货主",
                    "type": "input-text",
                    "name": "ownerCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "商品编码",
                    "type": "input-text",
                    "name": "skuCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "容器",
                    "type": "input-text",
                    "name": "containerCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "品牌",
                    "type": "input-text",
                    "name": "brand",
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
                    "op": "bt"
                }
            ]
        }
    ],
    actions: actions
}

const searchFilter = filter.body[0].body.map(value => {
    return value.name + "-op=" + value.op;
}).join("&");

const filterSettingSource = filter.body[0].body.map(value => {
    return value.name;
}).join(",");

const schema = {
    type: 'page',
    title: '库存明细',
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
                "showColumns": showColumns,
                "searchObject": {
                    "tables": "container_stock k, sku_batch_attribute e, sku_main_data a",
                    "where": "k.sku_batch_attribute_id = e.id and e.sku_id = a.id"
                }
            },
            headerToolbar: [
                "reload",
                {
                    "type": "export-excel",
                    "label": "导出",
                    "api": "/search/search?page=${1}&perPage=${100000}&" + searchFilter,
                    "fileName": "container_stock"
                }
            ],
            autoGenerateFilter: true,
            filterSettingSource: filterSettingSource,
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
                            "label": "冻结",
                            "type": "button",
                            "actionType": "dialog",
                            "dialog": {
                                "title": "冻结",
                                "size": "sm",
                                "body": {
                                    "type": "form",
                                    "api": "post:/wms/containerStock/freezeContainerStock",
                                    "controls": form
                                }
                            }
                        },
                        {
                            "label": "解冻",
                            "type": "button",
                            "actionType": "dialog",
                            "dialog": {
                                "title": "解冻",
                                "size": "sm",
                                "body": {
                                    "type": "form",
                                    "api": "post:/wms/containerStock/unFreezeContainerStock",
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
