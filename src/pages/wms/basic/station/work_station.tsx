import schema2component from "../../../../utils/schema2component";
import {warehouse_area} from "@/pages/wms/constants/select_search_api_contant";

const form = {
    "type": "form",
    "api": {
        url: "post:/wms/workStation/createOrUpdate",
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
            "label": "工作站编码",
            "name": "stationCode",
            "type": "input-text",
            "required": true
        },
        {
            "label": "工作站名称",
            "name": "stationName",
            "type": "input-text",
            "required": true
        },
        {
            "label": "工作台类型",
            "name": "workLocationType",
            "type": "select",
            "source": "${WorkLocationType}",
            "required": true
        },
        {
            "label": "终端类型",
            "name": "terminalType",
            "type": "select",
            "source": "${TerminalType}",
            "required": true
        },
        {
            "label": "所属库区",
            "name": "warehouseAreaCode",
            "type": "select",
            "source": warehouse_area,
            "required": true
        },
        {
            "label": "任务规则",
            "name": "stationRuleId",
            "type": "select"
        },
        {
            "label": "可操作业务",
            "name": "allowOperationTypes",
            "type": "select",
            "multiple": true,
            "source": "${WorkStationOperationType}"
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
        name: "warehouseAreaCode",
        label: "所属库区",
    },
    {
        name: "stationCode",
        label: "工作站编码",
    },
    {
        name: "stationName",
        label: "工作站名称",
    },
    {
        name: "operationType",
        label: "当前操作类型",
    },
    {
        name: "workStationStatus",
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

const searchIdentity = "WorkStation";
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
                    "label": "工作站编码",
                    "type": "input-text",
                    "name": "stationCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "状态",
                    "type": "select",
                    "name": "workStationStatus",
                    "clearable": true,
                    "source": "${WorkStationStatus}",
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
    title: '工作站管理',
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
            headerToolbar: [add],
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
                        },
                        {
                            "label": "工作站配置",
                            "type": "button",
                            "actionType": "drawer",
                            "drawer": {
                                "title": "工作站配置",
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
