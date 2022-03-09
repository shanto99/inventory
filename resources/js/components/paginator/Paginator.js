import React from "react";
import * as Icon from "react-feather";

class Paginator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            columns: props.columns,
            data: [],
            totalPage: 1
        }
    }

    componentDidMount() {
        this.getRecords(this.state.currentPage);
    }

    getRecords(page) {
        this.props.dataSrc(page).then(res => {
            const {data, totalPage} = res;
            this.setState({
                data: data,
                totalPage: totalPage,
                currentPage: page
            });
        })
    }

    generatePageLinks = () => {
        const {totalPage, currentPage} = this.state;
        const pageLinks = [];
        for(let i=1; i <= totalPage; i++) {
            pageLinks.push(
                <li>
                    <a className={`pagination__link ${i===currentPage ? "pagination__link--active" : ""}`} href="#" onClick={this.getRecords.bind(this, i)}>{i}</a>
                </li>
            );

        }

        return pageLinks;
    }

    getColumnValue = (value, render) => {
        if(render && typeof render === 'function') {
            return render(value)
        }
        return value;
    }

    render() {
        const {columns, data} = this.state;
        return (
            <>
                <div className="intro-y box col-span-12 overflow-auto lg:overflow-visible">
                    <table className="table table-report mt-2">
                        <thead>
                            <tr>
                                {columns.map(column => (
                                    <th className="text-center whitespace-nowrap">{column.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(row => {
                                return (
                                    <tr>
                                        {columns.map(column => {
                                            return (
                                                <td className="text-center">
                                                    {this.getColumnValue(row[column.field], column.render)}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="intro-y mt-2 col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                    <ul className="pagination">
                        <li>
                            <a className="pagination__link" href="#"> <Icon.ChevronsLeft className="w-4 h-4"/></a>
                        </li>
                        <li>
                            <a className="pagination__link" href="#"> <Icon.ChevronLeft className="w-4 h-4"/> </a>
                        </li>
                        {this.generatePageLinks()}
                        <li>
                            <a className="pagination__link" href=""> <Icon.ChevronRight className="w-4 h-4" /> </a>
                        </li>
                        <li>
                            <a className="pagination__link" href=""> <Icon.ChevronsRight className="w-4 h-4" /> </a>
                        </li>
                    </ul>
                    <select className="w-20 form-select box mt-3 sm:mt-0">
                        <option>10</option>
                        <option>25</option>
                        <option>35</option>
                        <option>50</option>
                    </select>
                </div>
            </>
        );
    }
}

export default Paginator;
