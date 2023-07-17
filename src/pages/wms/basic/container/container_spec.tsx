import schema2component from "../../../../utils/schema2component";
import {owner_search_api} from "@/pages/mdm/main_data/constants/select_search_api_contant";
import {true_false_options} from "@/utils/commonContants";
import {volume} from "@/pages/mdm/main_data/constants/form_constants";

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
        "label": "规格编码",
        "type": "input-text",
        "name": "containerSpecCode",
        "required": true
    },
    {
        "label": "规格名称",
        "type": "input-text",
        "name": "containerSpecName",
        "required": true
    },
    {
        "label": "容器类型",
        "type": "select",
        "name": "containerType",
        "source": "${ContainerType}",
        "required": true
    },
    {
        "label": "行",
        "type": "input-number",
        "name": "level",
        "required": true
    },
    {
        "label": "列",
        "type": "input-number",
        "name": "bay",
        "required": true
    },
    ...volume,
    {
        "type": "input-table",
        "name": "containerSlotSpecs",
        "addable": true,
        "copyable": true,
        "editable": true,
        "columns": [
            ...volume,
            {
                "name": "containerSlotSpecCode",
                "label": "格口编码",
                "type": "input-text"
            },
            {
                "name": "face",
                "label": "朝向",
                "type": "input-text"

            }
        ]
    }
]

const form = {
    "type": "form",
    "api": {
        url: "post:/wms/containerSpec/createOrUpdate",
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
    "actionType": "dialog",
    "icon": "fa fa-plus",
    "label": "新增",
    "target": "role",
    "closeOnOutside": true,
    "dialog": {
        "size": "lg",
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
        name: "containerSpecCode",
        label: "规格编码",
    },
    {
        name: "containerSpecName",
        label: "规格名称",
    },
    {
        name: "containerType",
        label: "容器类型",
    },
    {
        "label": "体积",
        "name": "volume"
    },
    {
        "label": "长",
        "name": "length"
    },
    {
        "label": "宽",
        "name": "width"
    },
    {
        "label": "高",
        "name": "height"
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

const searchIdentity = "ContainerSpec";
const showColumns = columns;

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "规格编码",
                    "type": "input-text",
                    "name": "containerSpecCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "规格名称",
                    "type": "input-text",
                    "name": "containerSpecName",
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
    title: '容器规格管理',
    toolbar: [],
    initApi: "/mdm/dictionary/getAll",
    body: [
        {
            type: "crud",
            name: "ContainerSpecTable",
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
                    "fileName": "container_spec"
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
                        {
                            "label": "修改",
                            "type": "button",
                            "actionType": "dialog",
                            "dialog":
                                {
                                    "title": "修改",
                                    "size": "lg",
                                    "body": {
                                        "type": "form",
                                        "initApi": {
                                            "url": "/wms/containerSpec/${id}",
                                            "method": "get"
                                        },
                                        "api": "post:/wms/containerSpec/createOrUpdate",
                                        "controls": fromBody
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
