export const CommonFunction = {
    changeTheme : function(color = null){
        if(color === 'black'){
            document.getElementById('theme').setAttribute('theme','black');
            document.getElementById('themeBtn').checked = true;
        }else if(color === 'white'){
            document.getElementById('theme').setAttribute('theme','white');
            document.getElementById('themeBtn').checked = false;
        }else{
            var theme = document.getElementById('theme').getAttribute('theme');
            if(theme === 'white'){
                document.getElementById('theme').setAttribute('theme','black');
            }else{
                document.getElementById('theme').setAttribute('theme','white');
            }
        }
    },
    showLoading : function(){
        document.getElementById("loading").style.display = 'block';
    },
    hideLoading : function(){
        document.getElementById("loading").style.display = 'none';
    }
}
export const CommonValidate = {
    regex : {
        eng : /^[a-zA-Z]*$/,
        number : /^[0-9]*$/,

    },
    regexText : function(value, regex){
        return new RegExp(CommonValidate.regex[regex]).test(value);
    },
    validateInstant : function(data, error){
        console.log(data, error);
        Object.keys(error).forEach(function(key){
            if(error['isChild']){
                if(key !== 'isChild'){
                    for(var i = 0; i < data.length; i++){
                        if(data[i][key]['value'] !== undefined){
                            data[i][key].isError = false;
                            data[i][key].errMsg = '';
                        }
                        var validObj = CommonValidate.validateInstant(data[i][key], error[key]);
                        data[i][key] = validObj;
                    }
                }
            }else if(typeof data[key] === 'object' && data[key]){
                console.log(data[key]);
                if(data['value'] !== undefined){
                    data[key].isError = false;
                    data[key].errMsg = '';
                }
                var validObj = CommonValidate.validateInstant(data[key],error[key]);
                data[key] = validObj;
            }else{
                var value = data.value;
                if(key === 'required' && value === ''){
                    if(error[key]){
                        data['isError'] = true;
                        data['errMsg'] = error['nullMsg'];
                    }else if(error[key] === 'condition' && data['required']){
                        data['isError'] = true;
                        data['errMsg'] = error['nullMsg'];
                    }
                }else if(key === 'type'){
                    if(!CommonValidate.regexText(value, error[key])){
                        data['isError'] = true;
                        data['errMsg'] = error['typeErrMsg']
                    };
                }else if(key === 'digits'){
                    if(value.length > error[key]){
                        data['isError'] = true;
                        data['errMsg'] = error['digitsErrMsg']
                    }
                }
            }
        })
        return data;
    },
    beforeSubmit : function(data, error){
        var newData = this.validateInstant(data, error);
        return newData = CommonValidate.makeErrorTxt(newData);
    },
    makeErrorTxt : function(newData){
        Object.keys(newData).forEach(function(key){
            if(typeof newData[key] === 'object'){
                CommonValidate.makeErrorTxt(newData[key]);
            }else{
                if(newData['isUpdate'] !== undefined){
                    newData['isUpdate'] = true
                }
            }
        })
        return newData
    }
}