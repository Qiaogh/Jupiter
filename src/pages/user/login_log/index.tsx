import schema2component from "../../../utils/schema2component";

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

const filter = {
    "title": "条件搜索",
    "body": [
        {
            "type": "group",
            "body": [
                {
                    "label": "登录用户名称",
                    "type": "input-text",
                    "name": "username",
                    "clearable": true,
                    "size": "sm"
                }
            ]
        }
    ],
    actions: actions
}

const schema = {
    type: 'page',
    title: '登录日志',
    toolbar: [],
    body: [
        {
            type: "crud",
            name: "role",
            api: {
                method: "POST",
                url: "/user/api/loginLog/search?page=${page}&perPage=${perPage}",
                dataType: "application/json"
            },
            filter: filter,
            footerToolbar: ["switch-per-page", "statistics", "pagination"],
            columns: [
                {
                    name: "id",
                    label: "ID",
                },
                {
                    name: "username",
                    label: "用户登录名称",
                },
                {
                    name: "gmtLoginTime",
                    label: "登录时间",
                },
                {
                    name: 'loginResult',
                    label: '登录结果'
                },
                {
                    name: 'loginAddress',
                    label: '登录地址'
                },
                {
                    name: 'loginFailureMsg',
                    label: '登录失败原因'
                }
            ]
        }
    ]
};

export default schema2component(schema);
