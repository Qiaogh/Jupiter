import * as React from "react";
import Login from '../pages/Login';
import Register from '../pages/Register';
import User from '../pages/user/user_management';
import Role from '../pages/user/role_management';
import Menu from '../pages/user/menu_management';
import LoginLog from '../pages/user/login_log'

import WarehouseMainData from '../pages/mdm/main_data/warehouse'
import OwnerMainData from '../pages/mdm/main_data/owner'
import SkuMainData from '../pages/mdm/main_data/sku'
import BatchAttribute from '../pages/mdm/config_management/batch_attribute'
import BarcodeParseRule from '../pages/mdm/config_management/barcode_parse_rule'
import ParameterConfig from '../pages/mdm/config_management/param_config'
import Dictionary from '../pages/mdm/config_management/dictionary'

import WarehouseManage from '../pages/wms/basic/warehouse/warehouse_management'
import WarehouseAreaGroupManage from '../pages/wms/basic/warehouse/warehouse_area_group'
import WarehouseAreaManage from '../pages/wms/basic/warehouse/warehouse_area'
import WarehouseLogicManage from '../pages/wms/basic/warehouse/warehouse_logic'
import ContainerSpecManage from '../pages/wms/basic/container/container_spec'
import ContainerManage from '../pages/wms/basic/container/container'
import WorkStationManage from '../pages/wms/basic/station/work_station'
import PutWallManage from '../pages/wms/basic/station/put_wall'
import ContainerStock from '../pages/wms/stock/container_stock'

import PluginManagement from '../pages/plugin/plugin_management/plugin_management'
import PluginStore from '../pages/plugin/plugin_management/plugin_store'

const path2components = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/user/user-manage',
        component: User
    },
    {
        path: '/user/role-manage',
        component: Role
    },
    {
        path: '/menu/menu-manage',
        component: Menu
    },
    {
        path: '/user/login-log-manage',
        component: LoginLog
    },

    //MDM System
    {
        path: '/mdm/main-data/warehouse',
        component: WarehouseMainData
    },
    {
        path: '/mdm/main-data/owner',
        component: OwnerMainData
    },
    {
        path: '/mdm/main-data/sku',
        component: SkuMainData
    },
    {
        path: '/mdm/config-center/batch-attribute',
        component: BatchAttribute
    },
    {
        path: '/mdm/config-center/barcode-parse-rule',
        component: BarcodeParseRule
    },
    {
        path: '/mdm/config-center/parameter-config',
        component: ParameterConfig
    },
    {
        path: '/mdm/config-center/dictionary',
        component: Dictionary
    },

    //WMS System
    {
        path: '/wms/basic-info/warehouse-manage',
        component: WarehouseManage
    },
    {
        path: '/wms/basic-info/warehouse-area-group-manage',
        component: WarehouseAreaGroupManage
    },
    {
        path: '/wms/basic-info/warehouse-area-manage',
        component: WarehouseAreaManage
    },
    {
        path: '/wms/basic-info/logical-area-manage',
        component: WarehouseLogicManage
    },

    {
        path: '/wms/basic-info/work-station-manage',
        component: WorkStationManage
    },
    {
        path: '/wms/basic-info/put-wall-manage',
        component: PutWallManage
    },

    {
        path: '/wms/basic-info/container-spec-manage',
        component: ContainerSpecManage
    },
    {
        path: '/wms/basic-info/container-manage',
        component: ContainerManage
    },

    {
        path: '/wms/stock/container-stock',
        component: ContainerStock
    },

    //Plugin System
    {
        path: '/plugin/plugin-management/plugin-management',
        component: PluginManagement
    },
    {
        path: '/plugin/plugin-management/plugin-store',
        component: PluginStore
    },

]

export default path2components;
