import schema2component from "../../../../utils/schema2component";
import {container_spec, work_station} from "@/pages/wms/constants/select_search_api_contant";

const form = {
    "type": "form",
    "api": {
        url: "post:/wms/putWall/createOrUpdate",
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
            "label": "播种墙编码",
            "name": "putWallCode",
            "type": "input-text",
            "required": true
        },
        {
            "label": "播种墙名称",
            "name": "putWallName",
            "type": "input-text",
            "required": true
        },
        {
            "label": "所属工作站",
            "name": "workStationId",
            "type": "select",
            "source": work_station,
            "required": true
        },
        {
            "label": "规格编码",
            "name": "containerSpecCode",
            "type": "select",
            "source": container_spec,
            "required": true
        }
    ]
}
const add = {
    "type": "button",
    "actionType": "drawer",
    "icon": "fa fa-plus",
    "label": "新增",
    "target": "PutWallTable",
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
        name: "workStationId",
        label: "工作站ID",
    },
    {
        name: "putWallCode",
        label: "播种墙编码",
    },
    {
        name: "putWallName",
        label: "播种墙名称",
    },
    {
        name: "containerSpecCode",
        label: "容器规格编码",
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

const searchIdentity = "WPutWall";
const showColumns = columns;

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "工作站编码",
                    "type": "input-text",
                    "name": "stationCode",
                    "clearable": true,
                    "size": "sm",
                    "op": "eq"
                },
                {
                    "label": "播种墙编码",
                    "type": "input-text",
                    "name": "putWallCode",
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

const searchFilter =
    filter.body[0].body.map(value => {
        return value.name + "-op=" + value.op;
    }).join("&");

const schema = {
    type: 'page',
    title: '播种墙管理',
    toolbar: [],
    initApi: "/mdm/dictionary/getAll",
    body: [
        {
            type: "crud",
            name: "PutWallTable",
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
                        }
                    ],
                    toggled: true
                }
            ]
        }
    ]
};

export default schema2component(schema);
