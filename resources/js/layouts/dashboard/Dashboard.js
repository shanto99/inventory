import React from "react";
import { Outlet } from "react-router-dom";
import Sidepanel from "../../components/sidepanel/Sidepanel";
import Topbar from "../../components/topBar/Topbar";

class Dashboard extends React.Component {
    adjustCssClass = () => {
        const body = document.querySelector('body');
        if(body) body.removeAttribute('style');
        const mainDiv = document.querySelector('div.main');
        if(mainDiv) {
            mainDiv.classList.remove('main');
            body.classList.add('main');
        }
    }
    componentDidMount() {
        this.adjustCssClass();
    }
    render() {
        return (
            <div className="main">
                <div className="flex">
                    <Sidepanel/>
                    <div className="content">
                        <Topbar/>
                        <Outlet/>
                    </div>
                </div>

            </div>
        )
    }

}

export default Dashboard;
