import schema2component from "../../../../utils/schema2component";
import {owner_search_api} from "@/pages/mdm/main_data/constants/select_search_api_contant";
import {true_false_options} from "@/utils/commonContants";
import {volume} from "@/pages/mdm/main_data/constants/form_constants";
import {container_spec} from "@/pages/wms/constants/select_search_api_contant";

const fromBody = [
    {
        "type": "hidden",
        "name": "id"
    },
    {
        "type": "hidden",
        "name": "version"
    },
    {
        "label": "容器类型",
        "type": "select",
        "name": "containerType",
        "source": "${ContainerType}",
        "required": true
    },
    {
        "label": "容器规格",
        "type": "select",
        "name": "containerSpecCode",
        "source": container_spec,
        "required": true
    },
    {
        "label": "编号位数",
        "type": "input-text",
        "name": "indexNumber",
        "required": true
    },
    {
        "label": "编号前缀",
        "type": "input-text",
        "name": "containerCodePrefix",
        "required": true
    },
    {
        "label": "起始编号",
        "type": "input-number",
        "name": "startIndex",
        "required": true
    },
    {
        "label": "创建容器数",
        "type": "input-text",
        "name": "createNumber",
        "required": true
    },
]

const form = {
    "type": "form",
    "api": {
        url: "post:/wms/container/create",
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
    body: fromBody
}

const add = {
    "type": "button",
    "actionType": "drawer",
    "icon": "fa fa-plus",
    "label": "批量创建",
    "target": "ContainerTable",
    "closeOnOutside": true,
    "drawer": {
        "size": "lg",
        "title": "批量创建",
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
        name: "containerCode",
        label: "容器编码",
    },
    {
        name: "containerSpecCode",
        label: "容器规格编码",
    },
    {
        name: "containerStatus",
        label: "容器状态",
    },
    {
        name: "emptyContainer",
        label: "空容器",
    },
    {
        name: "locked",
        label: "锁定",
    },
    {
        name: "locationCode",
        label: "库位编码",
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

const searchIdentity = "Container";
const showColumns = columns;

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "容器规格编码",
                    "type": "input-text",
                    "name": "containerSpecCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "容器编码",
                    "type": "input-text",
                    "name": "containerCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "容器类型",
                    "type": "select",
                    "name": "containerType",
                    "clearable": true,
                    "source": "${ContainerType}",
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "容器状态",
                    "type": "select",
                    "name": "containerStatus",
                    "clearable": true,
                    "source": "${ContainerStatus}",
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
    title: '容器管理',
    toolbar: [],
    initApi: "/mdm/dictionary/getAll",
    body: [
        {
            type: "crud",
            name: "ContainerTable",
            api: {
                method: "POST",
                url: "/search/search?page=${page}&perPage=${perPage}&" + searchFilter,
                dataType: "application/json"
            },
            defaultParams: {
                "searchIdentity": searchIdentity,
                "showColumns": showColumns
            },
            headerToolbar: [
                add,
                "reload",
                {
                    "type": "export-excel",
                    "label": "导出",
                    "api": "/search/search?page=${1}&perPage=${100000}&" + searchFilter,
                    "fileName": "container"
                }
            ],
            filter: filter,
            footerToolbar: ["switch-per-page", "statistics", "pagination"],
            columns: [
                ...columns,
                {
                    type: "operation",
                    label: "操作",
                    width: 100,
                    buttons: [
                    ],
                    toggled: true
                }
            ]
        }
    ]
};

export default schema2component(schema);
