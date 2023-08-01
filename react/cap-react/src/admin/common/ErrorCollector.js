/**
 * {
 *  name : 日本語名
 *  required : 必須項目
 *  requiredCondition : 条件府必須項目の関数
 *  nullMsg : nullの場合のエラーメッセージ
 *  type : バリデーションタイプ
 *  typeErrMsg : typeエラーの場合のエラーメッセージ
 *  digits : 桁数
 *  digitsErrMsg : 桁数エラーの場合のエラーメッセージ
 *  element : 入力エレメント(select, text, checkbox, radio, textarea)
 *  isChild : 下部オブジェクト
 *  excludeBlank : 下部オブジェクトの値が何もない場合除外
 * }
 */

export const ErrorCollector = {
    init : function(structure){
        var result = {};
        for(var i = 0; i < structure.length; i++){
            result[structure[i]] = ErrorCollector.makeValidObject(structure[i]);
        }
        return result;
    },
    makeValidObject : function(beanName){
        var bean = this[beanName];
        Object.keys(bean).forEach(function(key){
            var newBean = bean[key];
            var endingWord = '';
            var typeWord = '';
            //set child bean
            if(newBean.isChild){
                var childBean = ErrorCollector.makeValidObject(newBean.isChild);
                Object.keys(childBean).forEach(function(childKey){
                    bean[key][childKey] = childBean[childKey];
                })
            }
            //set ending word
            if(newBean.element === 'text'){
                endingWord = '入力してください。';
            }else if(newBean.element === 'select' || newBean.element === 'radio'){
                endingWord = '選択してください。';
            }else if(newBean.element === 'checkbox'){
                endingWord = 'チェックしてください。';
            }
            //set nullMsg
            if(newBean.required || newBean.required === 'condition'){
                newBean.nullMsg = newBean.name + 'を' + endingWord;
            }
            //set typeErrMsg
            if(newBean.type){
                if(newBean.type === 'eng'){
                    typeWord = '英語で';
                }else if(newBean.type === 'number'){
                    typeWord = '数字で';
                }
                newBean.typeErrMsg = newBean.name + 'は' + typeWord + endingWord;
            }
            //set digitErrMsg
            if(newBean.digits){
                newBean.digitsErrMsg = newBean.name + 'は' + newBean.digits + '桁以内で' + endingWord;
            }
            bean[key] = newBean;
        })
        return bean;
    },
    MTable : {
        tableName : {
            name : '論理名',
            required : true,
            digits : 30,
            element : 'text'
        },
        tableNameJp : {
            name : '物理名',
            required : true,
            type : 'eng',
            digits : 30,
            element : 'text'
        },
        tableComment : {
            name : 'コメント',
            digits : 80,
            element : 'text'
        },
        MTableColumn : {
            isChild : 'MTableColumn'
        }
    },
    MTableColumn : {
        tableColumnName: {
            name : '論理名',
            required : true,
            digits : 30,
            element : 'text'
        },
        tableColumnNameJp: {
            name : '物理名',
            required : true,
            digits : 30,
            type : 'eng',
            element : 'text'
        },
        tableColumnType: {
            name : 'タイプ',
            required : true,
            element : 'select'
        },
        tableColumnDigits: {
            name : '桁数',
            required : 'condition',
            type : 'number',
            digits : 4,
            element : 'text'
        },
        tableColumnIsPk: {
            element : 'checkbox'
        },
        tableColumnIsFk: {
            element : 'checkbox'
        },
        tableColumnIsNn: {
            element : 'checkbox'
        },
        tableColumnIsAi: {
            element : 'checkbox'
        },
        tableColumnDefault: {
            name: 'デフォルト',
            digits : 40,
            element : 'text'
        }
    }
    
}