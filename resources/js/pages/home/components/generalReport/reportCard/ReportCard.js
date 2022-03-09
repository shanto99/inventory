import { ChevronUp, ShoppingCart } from "react-feather";
const ReportCard = () => {
    return (
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
            <div className="report-box zoom-in">
                <div className="box p-5">
                    <div className="flex">
                        <ShoppingCart className="report-box__icon text-theme-10" />
                        <div className="ml-auto">
                            <div className="report-box__indicator bg-theme-9 tooltip cursor-pointer">
                                33% <ChevronUp className="w-4 h-4 ml-0.5" />
                            </div>
                        </div>
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                        4.710
                    </div>
                    <div className="text-base text-gray-600 mt-1">
                        Item Sales
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportCard;
