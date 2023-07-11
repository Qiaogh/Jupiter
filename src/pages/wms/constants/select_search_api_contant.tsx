export const warehouse_area_group = {
    "method": "post",
    "url": "/search/search/searchSelectResult?perPage=1000&activePage=1",
    "data": {
        "searchIdentity": "SearchWarehouseAreaGroup",
        "searchObject": {
            "tables": "warehouse_area_group"
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
