import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DatabaseList = () => {

    const [listData, setListData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/list/table")
            .then(res => {
                setListData(res.data);
                console.log(res.data);
                console.log(listData);
            })
            .catch(res => console.log(res));
        return () => {
            
        };
      }, []);
    
    return (
        <>
            <div className="title-area">
                テーブル管理 - リスト
            </div>
            <div className="content-box">
                <div className="content-area">
                    <div className="table-btn-area">
                        <Link to="/database/table/regist" className="register-btn">
                            新規登録
                        </Link>
                    </div>
                    <table className="content-table">
                        <colgroup>
                            <col width="10%"/>
                            <col width="10%"/>
                            <col width="30%"/>
                            <col width="30%"/>
                            <col width="20%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th><input type="checkbox"/></th>
                                <th>id</th>	
                                <th>テーブル名(物理名)</th>
                                <th>テーブル名(論理名)</th>
                                <th>作成日</th>	
                            </tr>
                        </thead>
                        <tbody>
                            {listData.map(function(contents){
                                return (
                                    <tr>
                                        <td></td>
                                        <td>{contents.tableId}</td>
                                        <td>{contents.tableName}</td>
                                        <td>{contents.tableNameJp}</td>
                                        <td>{contents.createDate}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DatabaseList;