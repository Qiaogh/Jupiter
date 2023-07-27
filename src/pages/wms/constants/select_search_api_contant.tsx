export const warehouse_area_group = {
    "method": "post",
    "url": "/search/search/searchSelectResult?perPage=1000&activePage=1",
    "data": {
        "searchIdentity": "SearchWarehouseAreaGroup",
        "searchObject": {
            "tables": "w_warehouse_area_group"
        },
        "showColumns": [
            {
                "dbField": "warehouse_area_group_code",
                "name": "value",
                "javaType": "java.lang.String"
            },
            {
                "dbField": "warehouse_area_group_name",
                "name": "label",
                "javaType": "java.lang.String"
            }
        ]
    }
}

export const warehouse_area_code = {
    "method": "post",
    "url": "/search/search/searchSelectResult?perPage=1000&activePage=1",
    "data": {
        "searchIdentity": "SearchWarehouseArea",
        "searchObject": {
            "tables": "w_warehouse_area"
        },
        "showColumns": [
            {
                "dbField": "warehouse_area_code",
                "name": "value",
                "javaType": "java.lang.String"
            },
            {
                "dbField": "warehouse_area_name",
                "name": "label",
                "javaType": "java.lang.String"
            }
        ]
    }
}

export const warehouse_area_id = {
    "method": "post",
    "url": "/search/search/searchSelectResult?perPage=1000&activePage=1",
    "data": {
        "searchIdentity": "SearchWarehouseArea",
        "searchObject": {
            "tables": "w_warehouse_area"
        },
        "showColumns": [
            {
                "dbField": "id",
                "name": "value",
                "javaType": "java.lang.String"
            },
            {
                "dbField": "warehouse_area_name",
                "name": "label",
                "javaType": "java.lang.String"
            }
        ]
    }
}

export const container_spec = {
    "method": "post",
    "url": "/search/search/searchSelectResult?perPage=1000&activePage=1",
    "data": {
        "searchIdentity": "SearchContainerSpec",
        "searchObject": {
            "tables": "container_spec"
        },
        "showColumns": [
            {
                "dbField": "container_spec_code",
                "name": "value",
                "javaType": "java.lang.String"
            },
            {
                "dbField": "container_spec_name",
                "name": "label",
                "javaType": "java.lang.String"
            }
        ]
    }
}

export const work_station = {
    "method": "post",
    "url": "/search/search/searchSelectResult?perPage=1000&activePage=1",
    "data": {
        "searchIdentity": "SearchWorksStation",
        "searchObject": {
            "tables": "work_station"
        },
        "showColumns": [
            {
                "dbField": "id",
                "name": "value",
                "javaType": "java.lang.String"
            },
            {
                "dbField": "station_code",
                "name": "label",
                "javaType": "java.lang.String"
            }
        ]
    }
}
