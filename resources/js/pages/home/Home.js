import React from "react";

import GeneralReport from "./components/generalReport/GeneralReport";

class Home extends React.Component {
    render() {
        return (
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 2xl:col-spn-9">
                    <div className="grid grid-cols-12 gap-6">
                        <GeneralReport/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
