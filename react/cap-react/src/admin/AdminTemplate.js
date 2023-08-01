import React from "react";
import { BrowserRouter } from "react-router-dom";
import AdminContentArea from "./common-components/AdminContentArea";
import AdminGnb from "./common-components/AdminGnb";
import AdminHeader from "./common-components/AdminHeader";

const AdminTemplate = () => {

    return (
        <BrowserRouter>
            <div className="theme-division">
                <AdminHeader/>
                <AdminGnb/>
                <AdminContentArea/>
            </div>
        </BrowserRouter>
    )
}

export default AdminTemplate;