import React, { useEffect } from "react";
import './css/cap-common.css';

const AdminHome = ({form, children}) => {

    useEffect(() => {
        getApi();
        return () => {
          console.log('컴포넌트가 화면에서 사라짐');
        };
      }, []);
    

    function getApi(){
        console.log('home');
    }

    return (
        <div className="content-box">
            <div className="title">
                <p>テンプレート管理</p>
                <span>more</span>
            </div>
            <div className="content-area">
                <table className="content-table">
                    <colgroup>
                        <col width="10%"/>
                        <col width="70%"/>
                        <col width="20%"/>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>テンプレート名</th>
                            <th>作成日</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminHome;