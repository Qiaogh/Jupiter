export const role_search_api = {
    "method": "post",
    "url": "/search/search/searchSelectResult?perPage=1000&activePage=1",
    "data": {
        "searchIdentity": "SearchRole",
        "searchObject": {
            "tables": "role",
            "where": "status = 1"
        },
        "showColumns": [
            {
                "dbField": "id",
                "name": "value",
                "javaType": "java.lang.String"
            },
            {
                "dbField": "name",
                "name": "label",
                "javaType": "java.lang.String"
            }
        ]
    }
}
