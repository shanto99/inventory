import React from "react";
import {NavLink} from "react-router-dom";

import { CheckSquare, Delete as DeleteIcon } from "react-feather";

import { getCompanies } from "../../API/company";

class Company extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        }
    }

    componentDidMount()
    {
        getCompanies().then(res => {
            this.setState({
                companies: res.companies || []
            });
        });
    }

    render()
    {
        const {companies} = this.state;
        return(
            <>
                <div className="intro-y flex items-center mt-8">
                    <h2 className="text-lg font-medium mr-auto">
                        All company
                    </h2>
                </div>
                <NavLink to="/add-user" className="btn btn-primary mt-5">Add company</NavLink>
                <div className="intro-y box col-span-12 overflow-auto lg:overflow-visible">
                    <table className="table table-report mt-2">
                        <thead>
                            <tr>
                                <th className="whitespace-nowrap">Company code</th>
                                <th className="text-center whitespace-nowrap">Name</th>
                                <th className="text-center whitespace-nowrap">Address</th>
                                <th className="text-center whitespace-nowrap">Factory address</th>
                                <th className="text-center whitespace-nowrap">Contact person</th>
                                <th className="text-center whitespace-nowrap">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map(company => {
                                return (
                                    <tr>
                                        <td>
                                            <div className="font-medium whitespace-nowrap">{company.CompanyCode}</div>
                                        </td>
                                        <td className="text-center">{company.CompanyName}</td>
                                        <td className="text-center">
                                            {company.Address}
                                        </td>
                                        <td className="text-center">{ company.FactoryAddress }</td>
                                        <td className="text-center">{ company.ContactPerson }</td>
                                        <td className="table-report__action w-56">
                                            <div className="flex justify-center items-center">
                                                <a className="flex items-center mr-3"
                                                href="#"> <CheckSquare className="w-4 h-4 mr-1"/> Edit </a>
                                                <a className="flex items-center text-theme-6"
                                                href="#">
                                                <DeleteIcon className="w-4 h-4 mr-1"/> Delete </a>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default Company;
