export const warehouse_search_api = {
    "method": "post",
    "url": "/search/search/searchSelectResult?perPage=1000&activePage=1",
    "data": {
        "searchIdentity": "SearchWarehouse",
        "searchObject": {
            "tables": "m_warehouse"
        },
        "showColumns": [
            {
                "dbField": "warehouse_code",
                "name": "value",
                "javaType": "java.lang.String"
            },
            {
                "dbField": "warehouse_name",
                "name": "label",
                "javaType": "java.lang.String"
            }
        ]
    }
}


export const owner_search_api = {
    "method": "post",
    "url": "/search/search/searchSelectResult?perPage=1000&activePage=1",
    "data": {
        "searchIdentity": "SearchOwner",
        "searchObject": {
            "tables": "m_owner_main_data"
        },
        "showColumns": [
            {
                "dbField": "owner_code",
                "name": "value",
                "javaType": "java.lang.String"
            },
            {
                "dbField": "owner_name",
                "name": "label",
                "javaType": "java.lang.String"
            }
        ]
    }
}
