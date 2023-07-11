import schema2component from "../../../../utils/schema2component";
import {address, contactor} from "@/pages/mdm/main_data/constants/form_constants";

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
        "name": "warehouseCode",
        "type": "hidden"
    },
    {
        "label": "需要收货",
        "name": "disableReceiving",
        "type": "switch"
    },
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
        name: "warehouseName",
        label: "仓库名称",
    },
    {
        name: "warehouseType",
        label: "仓库类型",
    },
    {
        name: "warehouseAttrType",
        label: "仓库属性",
    },
    {
        name: "warehouseLevel",
        label: "仓库等级",
    },
    {
        name: "warehouseLabel",
        label: "仓库标签",
    },
    {
        name: "businessType",
        label: "主营业务",
    },
    {
        name: "structureType",
        label: "仓库结构",
    },
    {
        name: "virtualWarehouse",
        label: "是否虚拟仓",
    },
    {
        name: "country",
        label: "国家",
    },
    {
        name: "province",
        label: "省",
    },
    {
        name: "city",
        label: "市",
    },
    {
        name: "district",
        label: "区/县",
    },
    {
        name: "name",
        label: "联系人",
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

const searchIdentity = "WarehouseMainData";
const showColumns = columns;

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "仓库编码",
                    "type": "input-text",
                    "name": "warehouseCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "仓库名称",
                    "type": "input-text",
                    "name": "warehouseName",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "仓库类型",
                    "type": "input-text",
                    "name": "warehouseType",
                    "clearable": true,
                    "source": "${WarehouseType}",
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
                            "label": "参数配置",
                            "type": "button",
                            "actionType": "drawer",
                            "drawer": {
                                "title": "修改",
                                "body": {
                                    "type": "form",
                                    "initApi": "get:/wms/warehouseConfig/${warehouseCode}",
                                    "api": "post:/wms/warehouseConfig/createOrUpdate",
                                    "body": form
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
