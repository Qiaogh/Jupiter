import schema2component from "../../../../utils/schema2component";
import {enable_options} from "@/utils/commonContants";
import {warehouse_area_id} from "@/pages/wms/constants/select_search_api_contant";

const form = {
    "type": "form",
    "api": {
        url: "post:/wms/warehouseLogic/createOrUpdate",
        requestAdaptor: function (api: { data: any; }) {
            return {
                ...api,
                data: {
                    ...api.data, // 获取暴露的 api 中的 data 变量
                    "warehouseCode": "123" // 新添加数据
                }
            };
        }
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
        name: "warehouseCode",
        label: "仓库编码",
    },
    {
        name: "warehouseAreaId",
        label: "库区ID",
    },
    {
        name: "warehouseLogicCode",
        label: "逻辑区编码",
    },
    {
        name: "warehouseLogicName",
        label: "逻辑区名称",
    },
    {
        name: "remark",
        label: "备注",
    },
    {
        name: "enable",
        label: "状态",
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

const searchIdentity = "WWarehouseLogic";
const showColumns = columns;

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "库区编码",
                    "type": "input-text",
                    "name": "warehouseAreaCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "逻辑区编码",
                    "type": "input-text",
                    "name": "warehouseLogicCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "状态",
                    "type": "input-text",
                    "name": "enable",
                    "clearable": true,
                    "options": enable_options,
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
