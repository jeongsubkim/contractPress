var nullText = {
    value : '',
    isError : false,
    isUpdate : false,
    errMsg : ''
}
var nullCheck = {
    value : false,
    isError : false,
    isUpdate : false
}
export var BeanCollector = {
    get : function(beanName){
        return JSON.parse(JSON.stringify(BeanCollector[beanName]));
    },
    MTable : {
        tableName : JSON.parse(JSON.stringify(nullText)),
        tableNameJp : JSON.parse(JSON.stringify(nullText)),
        tableComment : JSON.parse(JSON.stringify(nullText)),
        MTableColumn : []
    },
    MTableColumn : {
        tableColumnIndex: JSON.parse(JSON.stringify(nullCheck)),
        tableColumnName: JSON.parse(JSON.stringify(nullText)),
        tableColumnNameJp: JSON.parse(JSON.stringify(nullText)),
        tableColumnType: JSON.parse(JSON.stringify(nullText)),
        tableColumnDigits: JSON.parse(JSON.stringify(nullText)),
        tableColumnIsPk: JSON.parse(JSON.stringify(nullCheck)),
        tableColumnIsFk: JSON.parse(JSON.stringify(nullCheck)),
        tableColumnIsNn: JSON.parse(JSON.stringify(nullCheck)),
        tableColumnIsAi: JSON.parse(JSON.stringify(nullCheck)),
        tableColumnDefault: JSON.parse(JSON.stringify(nullText))
    }
    
}