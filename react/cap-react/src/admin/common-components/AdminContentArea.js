import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminHome from "../AdminHome";
import * as $ from "../CommonFunction";
import DatabaseTableList from "../database/table/list";
import DatabaseTableRegist from "../database/table/regist";

const AdminContentArea = (props) => {
    const location = useLocation();

    useEffect(() => {
        $.CommonFunction.showLoading();
        setTimeout(() => {
            $.CommonFunction.hideLoading();
        }, 500);
        return () => {
            
        };
    }, [location]);

    return (
        
            <div id="container">
                <Routes>
                    <Route path="/" element={<AdminHome/>} />
                    <Route path="/database/table/list" element={<DatabaseTableList/>} />
                    <Route path="/database/table/regist" element={<DatabaseTableRegist/>}/>
                </Routes>
            </div>
            
        
    )
    
}

export default AdminContentArea;