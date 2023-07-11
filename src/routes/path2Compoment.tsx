import * as React from "react";
import Dashboard from "../pages/admin/Dashboard";
import Login from '../pages/Login';
import Register from '../pages/Register';
import User from '../pages/user/user_management';
import Role from '../pages/user/role_management';
import LoginLog from '../pages/user/login_log'

import WarehouseMainData from '../pages/mdm/main_data/warehouse'
import OwnerMainData from '../pages/mdm/main_data/owner'
import SkuMainData from '../pages/mdm/main_data/sku'
import BatchAttribute from '../pages/mdm/config_management/batch_attribute'
import BarcodeParseRule from '../pages/mdm/config_management/barcode_parse_rule'
import ParameterConfig from '../pages/mdm/config_management/param_config'


import WarehouseManage from '../pages/wms/basic/warehouse/warehouse_management'
import WarehouseAreaGroupManage from '../pages/wms/basic/warehouse/warehouse_area_group'
import WarehouseAreaManage from '../pages/wms/basic/warehouse/warehouse_area'
import WarehouseLogicManage from '../pages/wms/basic/warehouse/warehouse_logic'

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
        path: '/dashboard',
        component: Dashboard
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
    }

]

export default path2components;
