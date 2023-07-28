import schema2component from "../../../../utils/schema2component";
import {enable_options} from "@/utils/commonContants";
import {warehouse_area_id, warehouse_logic_id, warehouseFilter} from "@/pages/wms/constants/select_search_api_contant";

const form = {
    "type": "form",
    "api": {
        url: "/wms/warehouseLogic/createOrUpdate"
    },
    body: [
        {
            "type": "hidden",
            "name": "id"
        },
        {
            "type": "hidden",
            "name": "version"
        },
        {
            "label": "库区编码",
            "name": "warehouseAreaCode",
            "type": "select",
            "source": warehouse_area_id
        },
        {
            "label": "逻辑区编码",
            "name": "warehouseLogicCode",
            "type": "input-text"
        },
        {
            "label": "逻辑区名称",
            "name": "warehouseLogicName",
            "type": "input-text"
        },
        {
            "label": "备注",
            "name": "remark",
            "type": "input-text"
        },
        {
            "label": "状态",
            "name": "enable",
            "type": "switch"
        }
    ]
}
const add = {
    "type": "button",
    "actionType": "drawer",
    "icon": "fa fa-plus",
    "label": "新增",
    "target": "role",
    "closeOnOutside": true,
    "drawer": {
        "title": "新增",
        "body": form
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
        dbField: "l.id",
        name: "id",
        label: "ID",
        hidden: true
    },
    {
        dbField: "l.version",
        name: "version",
        label: "Version",
        hidden: true
    },
    {
        name: "warehouseAreaCode",
        label: "库区ID",
    },
    {
        name: "warehouseLogicCode",
        label: "逻辑区编码",
    },
    {
        name: "aisleCode",
        label: "巷道编码",
    },
    {
        name: "shelfCode",
        label: "货架编码",
    },
    {
        name: "locationCode",
        label: "库位编码",
    },
    {
        name: "locationType",
        label: "库位类型",
    },
    {
        name: "heat",
        label: "库位热度",
    },
    {
        name: "occupied",
        label: "占用",
    },
    {
        name: "locationStatus",
        label: "库位状态",
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

const searchIdentity = "WLocation";
const showColumns = columns;

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "库区",
                    "type": "select",
                    "name": "warehouseAreaId",
                    "source": warehouse_area_id,
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "逻辑区",
                    "type": "select",
                    "source": warehouse_logic_id,
                    "name": "warehouseLogicId",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "巷道",
                    "type": "input-text",
                    "name": "aisleCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "库位",
                    "type": "input-text",
                    "name": "locationCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "状态",
                    "type": "select",
                    "name": "enable",
                    "clearable": true,
                    "source": "${LocationStatus}",
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
    title: '库位管理',
    toolbar: [],
    initApi: "/mdm/dictionary/getAll",
    body: [
        {
            type: "crud",
            name: "role",
            api: {
                method: "POST",
                url: "/search/search?page=${page}&perPage=${perPage}&" + searchFilter + warehouseFilter,
                dataType: "application/json"
            },
            defaultParams: {
                "searchIdentity": searchIdentity,
                "showColumns": showColumns,
                "searchObject": {
                    "tables":"w_location l , w_warehouse_logic c where l.warehouse_logic_id = c.id"
                }
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
                                "body": form
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
