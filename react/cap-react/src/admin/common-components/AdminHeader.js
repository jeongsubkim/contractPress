import React from "react";
import { Link } from "react-router-dom";
import * as $ from '../CommonFunction';
import '../css/cap-black.css';
import '../css/cap-white.css';

const AdminHeader = () => {

    return (
        <header>
            <Link to={"/"}>
                <div className="header-logo"></div>
            </Link>
            <div className="header-right">
                <input type="button" className="white-button" onClick={() => $.CommonFunction.changeTheme("white")} value={"WHITE"}/>
                <div className="mode-area">
                    <input id="themeBtn" type="checkbox" onChange={() => $.CommonFunction.changeTheme()}></input>
                    <label className="checkbox"></label>
                </div>
                <input type="button" className="dark-button" onClick={() => $.CommonFunction.changeTheme("black")} value={"DARK"}/>
            </div>
        </header>
    )
}

export default AdminHeader;