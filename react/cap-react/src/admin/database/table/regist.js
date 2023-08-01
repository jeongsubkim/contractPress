import React, { useEffect, useState } from "react";
import * as $ from "../../CommonFunction";
import * as B from "../../common/BeanCollector";
import * as E from "../../common/ErrorCollector";

const DatabaseRegist = () => {
    const [formData, setFormData] = useState({'MTable' : B.BeanCollector.get('MTable')});
    const [rows, initRow] = useState([B.BeanCollector.get('MTableColumn')]);
    const [errorData, setErrorData] = useState({'MTable' : B.BeanCollector.get('MTable')});
    const error = E.ErrorCollector.init(['MTable']);

    useEffect(() => {
        var newData = $.CommonValidate.validateInstant(JSON.parse(JSON.stringify(formData)), error);
        console.log(newData);
        setErrorData(newData);
    },[formData]);

    useEffect(() => {
        setFormData((prevState) => {
            var prevObj = {...prevState};
            prevObj['MTable']['MTableColumn'] = rows;
            return prevObj;
        });
    },[rows]);

    const addRowTable = () => {
        const data = B.BeanCollector.get('MTableColumn');
        initRow([...rows, data]);
        observeColumnIndex([...rows, data]);
    }

    const tableRowRemove = () => {
        const dataRow = [...rows];
        var newData = [];
        for(var i = 0; i < dataRow.length; i++){
            if(!dataRow[i].tableColumnIndex.value){
                newData.push(dataRow[i]);
            }
        }
        initRow(newData);
        observeColumnIndex(newData);
    }

    const onTableValueUpdate = (event) => {
        var name = event.target.name;
        setFormData((prevState) => {
            var prevObj = {...prevState};
            prevObj['MTable'][name].value = event.target.value;
            prevObj['MTable'][name].isUpdate = true;
            return prevObj;
        })
    }

    const onRowValueUpdate = (i, event) => {
        const name = event.target.name;
        var value;
        if(event.target.type === 'checkbox'){
            value = event.target.checked;
        }else{
            value = event.target.value;
        }
        const data = [...rows];
        data[i][name].value = value;
        data[i][name].isUpdate = true;
        if(name === 'tableColumnType'){
            if(value === 'datetime'){
                data[i].tableColumnDigits.required = false;
            }else{
                data[i].tableColumnDigits.required = true;
            }
        }
        observeColumnIndex(data);
        initRow(data);
    }

    const checkAll = (event) => {
        const data = [...rows];
        for(var i = 0;i < data.length;i++){
            data[i]['tableColumnIndex'].value = event.target.checked;
        }
        initRow(data);
    }

    const observeColumnIndex = (data) => {
        var allCheckbox = document.getElementById('checkAll').checked;
        var isCheckAll = true;
        if(data.length === 0){
            isCheckAll = false;
        }
        for(var i = 0;i < data.length;i++){
            if(data[i]['tableColumnIndex'].value === false){
                isCheckAll = false;
            }
            if(!isCheckAll) break;
        }

        if(allCheckbox && !isCheckAll){
            document.getElementById('checkAll').checked = isCheckAll;
        }else if(!allCheckbox && isCheckAll){
            document.getElementById('checkAll').checked = isCheckAll;
        }
    }

    const registDatabase = () => {
        var data = $.CommonValidate.beforeSubmit(JSON.parse(JSON.stringify(formData)), error);
        setFormData(data);
        initRow(data.MTable.MTableColumn)
        console.log(data)
    }

    return (
        <>
            <div className="title-area">
                データベース管理 - 新規登録
            </div>
            <div className="content-box">
                <div className="content-area">
                    <form id="databaseRegistForm">
                    <div className="input-table">
                        <div className="column-tr">
                            <div className="column-th">テーブル名 - 論理名<span className="required"></span></div>
                            <div className="column-td">
                                <input type="text" className="w-80" value={formData.MTable.tableName.value} name="tableName" onChange={(event) => onTableValueUpdate(event)}/>
                                {errorData.MTable.tableName.isUpdate ? <span className="error-txt">{errorData.MTable.tableName.errMsg}</span> : <></>}
                            </div>
                        </div>
                        <div className="column-tr">
                            <div className="column-th">テーブル名 - 物理名<span className="required"></span></div>
                            <div className="column-td">
                                <input type="text" className="w-80" value={formData.MTable.tableNameJp.value} name="tableNameJp" onChange={(event) => onTableValueUpdate(event)}/>
                                {errorData.MTable.tableNameJp.isUpdate ? <span className="error-txt">{errorData.MTable.tableNameJp.errMsg}</span> : <></>}
                            </div>
                        </div>
                        <div className="column-tr">
                            <div className="column-th">コメント</div>
                            <div className="column-td">
                                <input type="text" className="w-80" value={formData.MTable.tableComment.value} name="tableComment" onChange={(event) => onTableValueUpdate(event)}/>
                                {errorData.MTable.tableComment.isUpdate ? <span className="error-txt">{errorData.MTable.tableComment.errMsg}</span> : <></>}
                            </div>
                        </div>
                        <div className="column-tr">
                            <div className="column-th">コラム</div>
                            <div className="column-td">
                                <div className="inner-table-th">
                                    <span className="w-5 ta-middle"><input type="checkbox" id="checkAll" onChange={(event) => checkAll(event)}/></span>
                                    <span className="w-15">論理名</span>
                                    <span className="w-15">物理名</span>
                                    <span className="w-10">タイプ</span>
                                    <span className="w-10">桁数</span>
                                    <span className="w-5">PK</span>
                                    <span className="w-5">FK</span>
                                    <span className="w-5">NN</span>
                                    <span className="w-5">AI</span>
                                    <span className="w-15">Default</span>
                                </div>
                                <div className="inner-table">
                                    <ColumnTr
                                        rows={errorData.MTable.MTableColumn}
                                        tableRowRemove={tableRowRemove}
                                        onRowValueUpdate={onRowValueUpdate}
                                    />
                                </div>
                                <input type="button" value="追加" className="f-right ml-5" onClick={() => addRowTable()}/>
                                <input type="button" value="削除" className="f-right" onClick={() => tableRowRemove()}/>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            <div className="bottom-btn-area">
                <input type="button" value="登録" onClick={() => registDatabase()}/>
                <input type="button" value="戻る"/>
            </div>
        </>
    );
}

const ColumnTr = ({rows, tableRowRemove, onRowValueUpdate, errorData}) => {
    return rows.map((rowsData, index) => {
        const {tableColumnIndex,tableColumnName,tableColumnNameJp,tableColumnType,
            tableColumnDigits,tableColumnIsPk,tableColumnIsFk,tableColumnIsNn,tableColumnIsAi,tableColumnDefault} = rowsData;
        return (
            <div className="inner-table-tr" key={index}>
                <span className="w-5">
                    <input type="checkBox"  checked={tableColumnIndex.value} name="tableColumnIndex" onChange={(event) => onRowValueUpdate(index, event)}/>
                    {tableColumnIndex.isUpdate ? <span className="error-txt">{tableColumnIndex.errMsg}</span> : <></>}
                </span>
                <span className="w-15">
                    <input type="text" name="tableColumnName" value={tableColumnName.value} onChange={(event) => onRowValueUpdate(index, event)}/>
                    {tableColumnName.isUpdate ? <span className="error-txt">{tableColumnName.errMsg}</span> : <></>}
                </span>
                <span className="w-15">
                    <input type="text" name="tableColumnNameJp" value={tableColumnNameJp.value} onChange={(event) => onRowValueUpdate(index, event)}/>
                    {tableColumnNameJp.isUpdate ? <span className="error-txt">{tableColumnNameJp.errMsg}</span> : <></>}
                </span>
                <span className="w-10">
                    <select className="w-80" name="tableColumnType" value={tableColumnType.value} onChange={(event) => onRowValueUpdate(index, event)}>
                        <option></option>
                        <option>int</option>
                        <option>varchar</option>
                        <option>datetime</option>
                    </select>
                    {tableColumnType.isUpdate ? <span className="error-txt">{tableColumnType.errMsg}</span> : <></>}
                </span>
                <span className="w-10">
                    <input type="text" name="tableColumnDigits" value={tableColumnDigits.value} onChange={(event) => onRowValueUpdate(index, event)}/>
                    {tableColumnDigits.isUpdate ? <span className="error-txt">{tableColumnDigits.errMsg}</span> : <></>}
                </span>
                <span className="w-5">
                    <input type="checkbox" checked={tableColumnIsPk.value} name="tableColumnIsPk" value={tableColumnIsPk} onChange={(event) => onRowValueUpdate(index, event)}/>
                    {tableColumnIsPk.isUpdate ? <span className="error-txt">{tableColumnIsPk.errMsg}</span> : <></>}
                </span>
                <span className="w-5">
                    <input type="checkbox" checked={tableColumnIsFk.value} name="tableColumnIsFk" value={tableColumnIsFk} onChange={(event) => onRowValueUpdate(index, event)}/>
                    {tableColumnIsFk.isUpdate ? <span className="error-txt">{tableColumnIsFk.errMsg}</span> : <></>}
                </span>
                <span className="w-5">
                    <input type="checkbox" checked={tableColumnIsNn.value} name="tableColumnIsNn" value={tableColumnIsNn} onChange={(event) => onRowValueUpdate(index, event)}/>
                    {tableColumnIsNn.isUpdate ? <span className="error-txt">{tableColumnIsNn.errMsg}</span> : <></>}
                </span>
                <span className="w-5">
                    <input type="checkbox" checked={tableColumnIsAi.value} name="tableColumnIsAi" value={tableColumnIsAi} onChange={(event) => onRowValueUpdate(index, event)}/>
                    {tableColumnIsAi.isUpdate ? <span className="error-txt">{tableColumnIsAi.errMsg}</span> : <></>}
                </span>
                <span className="w-15">
                    <input type="text" name="tableColumnDefault" value={tableColumnDefault.value} onChange={(event) => onRowValueUpdate(index, event)}/>
                    {tableColumnDefault.isUpdate ? <span className="error-txt">{tableColumnDefault.errMsg}</span> : <></>}
                </span>
            </div>
        );
    });
}

export default DatabaseRegist;