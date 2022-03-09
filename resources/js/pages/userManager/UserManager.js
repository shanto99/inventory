import React from "react";
import * as Icon from "react-feather";
import { NavLink } from "react-router-dom";
import {getUserWithPagination} from "../../API/userManager";
import Paginator from "../../components/paginator/Paginator";

class UserManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            totalPage: 1,
            currentPage: 1
        }
    }

    getUsers = async (page) => {
        const res = await getUserWithPagination(page);
        return {
            data: res.users,
            totalPage: res.totalPage,
        };
    }

    editUser = (userId) => {
        console.log("Edit user: ", userId);
    }

    deleteUser = (userId) => {
        console.log('Delete user: ', userId);
    }

    render() {
        return (
            <>
                <div className="intro-y flex items-center mt-8">
                    <h2 className="text-lg font-medium mr-auto">
                        All users
                    </h2>
                </div>
                <NavLink to="/add-user" className="btn btn-primary mt-5">Add user</NavLink>
                <div className="pos intro-y grid-cols-12 gap-5 mt-5">
                    <div className="col-span-12 md:col-span-12 lg:col-span-8">
                        <Paginator
                            dataSrc={this.getUsers}
                            columns = {[
                                {field: 'UserName', name: 'User name'},
                                {field: 'Designation', name: 'Designation'},
                                {field: 'Email', name: 'Email'},
                                {field: 'UserID', name: 'Actions', render: (id) => {
                                    return (
                                        <div className="flex justify-center items-center">
                                            <a className="flex items-center mr-3" onClick={() => this.editUser(id)}
                                            href="#"> <Icon.CheckSquare class="w-4 h-4 mr-1"/> Edit </a>
                                            <a className="flex items-center text-theme-6"
                                            href="#" data-id="{{ $user->UserID }}">
                                            <Icon.Trash2 className="w-4 h-4 mr-1"/> Delete </a>
                                        </div>
                                    );
                                }}
                            ]}
                        />
                    </div>
                </div>
            </>

        )
    }

}

export default UserManager;
