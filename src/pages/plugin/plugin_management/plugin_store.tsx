import schema2component from "../../../utils/schema2component";
import {
    api_plugin_config,
    api_plugin_install,
    api_plugin_tenant_config,
    api_plugin_uninstall
} from "@/pages/plugin/constants/api_constant";


const configForm = {
    "type": "form",
    "api": api_plugin_config,
    "body": [
        {
            "type": "hidden",
            "name": "id"
        },
        {
            "type": "hidden",
            "name": "version"
        },
        {
            "label": "插件配置",
            "type": "textarea",
            "name": "configInfo",
            "required": true
        }]
}

const schema = {
    "type": 'page',
    "title": '插件商店',
    "toolbar": [],
    "initApi": "/plugin/pluginManage/storeQuery",
    "body": {
        "type": "cards",
        "source": "$pluginStore",
        "card": {
            "body": [
                {
                    "hidden": true,
                    "label": "插件id",
                    "name": "id"
                },
                {
                    "hidden": true,
                    "label": "插件编码",
                    "name": "code"
                },
                {
                    "label": "插件名称",
                    "name": "name"
                },
                {
                    "label": "开发者",
                    "name": "developer"
                },
                {
                    "label": "版本",
                    "name": "pluginVersion"
                }
            ],
            "actions": [
                {
                    "label": "安装",
                    "type": "button",
                    "level": "link",
                    "icon": "arrow-down",
                    "actionType": "ajax",
                    "confirmText": "确认安装？",
                    "api": api_plugin_install
                },
                {
                    "label": "卸载",
                    "type": "button",
                    "level": "link",
                    "icon": "arrow-up",
                    "actionType": "ajax",
                    "confirmText": "确认卸载？",
                    "api": api_plugin_uninstall
                },
                {
                    "label": "参数设置",
                    "type": "button",
                    "level": "link",
                    "icon": "arrow-up",
                    "actionType": "drawer",
                    "drawer": {
                        "title": "修改",
                        "body": {
                            "type": "form",
                            "initApi": api_plugin_tenant_config,
                            "api": api_plugin_config,
                            "body": [
                                {
                                    "type": "hidden",
                                    "name": "id"
                                },
                                {
                                    "type": "hidden",
                                    "name": "version"
                                },
                                {
                                    "label": "插件配置",
                                    "type": "textarea",
                                    "name": "configInfo",
                                    "required": true
                                }]
                        }
                    }
                }
            ]
        }
    }
};

export default schema2component(schema);
