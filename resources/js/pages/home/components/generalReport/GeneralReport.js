import { RefreshCcw } from "react-feather";

import ReportCard from "./reportCard/ReportCard";

const GeneralReport = () => {
    return (
        <div className="col-span-12 mt-8">
            <div className="intro-y flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                    General Report
                </h2>
                <span className="ml-auto flex items-center text-theme-1 dark:text-theme-10">
                    <RefreshCcw className="w-4 h-4 mr-3"/> Reload Data
                </span>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
                <ReportCard/>
                <ReportCard/>
                <ReportCard/>
                <ReportCard/>
            </div>
        </div>
    )
}

export default GeneralReport;
