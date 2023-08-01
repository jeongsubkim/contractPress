import React from "react";
import { Link } from "react-router-dom";
const AdminGnb = (props) => {

    return (
        <div id="gnb">
            <ul>
                <li onClick={() => props.tempFunction('template/list')}>
                    <i className="template-master"></i>
                    <span>テンプレート管理</span>
                </li>
                <li onClick={() => props.tempFunction('dom/list')}>
                    <i className="dom-master"></i>
                    <span>ドーム管理</span>
                </li>
                <li onClick={() => props.tempFunction('page/list')}>
                    <i className="page-master"></i>
                    <span>ページ管理</span>
                </li>
                <li onClick={() => props.tempFunction('auth/list')}>
                    <i className="auth-master"></i>
                    <span>権限管理</span>
                </li>
                
                <li>
                    <Link to="/database/table/list">
                        <i className="database-master"></i>
                        <span>データベース管理</span>
                    </Link>
                    <ul>
                        <Link to="/database/table/list">
                            <li>テーブル管理</li>
                        </Link>
                        <Link to="/database/data/list">
                            <li>データ管理</li>
                        </Link>
                    </ul>
                </li>
                
                <li onClick={() => props.tempFunction('code/list')}>
                    <i className="code-master"></i>
                    <span>コード管理</span>
                </li>
            </ul>
        </div>
    )
}

export default AdminGnb;