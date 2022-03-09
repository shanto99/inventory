import React from "react";
import * as Icon from "react-feather";
import swal from 'sweetalert';

import {getRoles, createRole, deleteRole} from "../../API/role";

import "./style.css";

class Role extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            roles: []
        }
    }

    componentDidMount()
    {
        getRoles().then(res => {
            this.setState(preState => {
                const newState = {...preState};
                newState.roles = res.roles || [];

                return newState;
            });
        });
    }

    createRole = (e) => {
        e.preventDefault();
        const {name} = this.state;
        createRole({name}).then(res => {
            const newRole = res.data.role;
            this.setState(preState => {
                const newState = {...preState};
                newState.roles.push(newRole);
                newState.name = "";
                return newState;
            });
        });
    }

    editRole = (id) => {
        console.log("Editing role id: ", id);
    }

    deleteRole = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this role!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    deleteRole(id).then(res => {
                        swal("Role has been deleted!", {
                            icon: "success",
                        });
                    });

                    this.setState(preState => {
                        const newState = {...preState};
                        let roles = newState.roles;
                        roles = roles.filter(role => role.id !== id);
                        newState.roles = roles;
                        return newState;
                    })

                } else {
                    swal("Role is safe!");
                }
        });
    }

    render() {
        const {roles} = this.state;
        return (
            <>
                <div className="intro-y flex items-center mt-8">
                    <h2 className="text-lg font-medium mr-auto">
                        All roles
                    </h2>
                </div>
                <div className="pos intro-y grid grid-cols-12 gap-5 mt-5">
                    <div className="col-span-6 lg:col-span-4">
                        <div className="intro-y box col-span-6 overflow-auto lg:overflow-visible">
                            <table className="table table-report mt-2">
                                <thead>
                                    <tr>
                                        <th className="whitespace-nowrap">Role</th>
                                        <th className="text-center whitespace-nowrap">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map(role => {
                                        return (
                                            <tr className="intro-x">
                                                <td>
                                                    <div className="font-medium whitespace-nowrap">
                                                        {role.name}
                                                    </div>
                                                </td>
                                                <td className="table-report__action w-56">
                                                    <div className="flex justify-center items-center">
                                                        <a className="flex items-center mr-3" onClick={() => this.editRole(role.id)}
                                                        href="#"> <Icon.CheckSquare className="w-4 h-4 mr-1"/> Edit </a>
                                                        <a className="flex items-center text-theme-6"
                                                        href="#" onClick={() => this.deleteRole(role.id)}>
                                                        <Icon.Delete className="w-4 h-4 mr-1"/> Delete </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-span-6 lg:col-span-4">
                        <div className="intro-y box p-5">
                            <form method="POST" id="role-form" onSubmit={this.createRole}>
                                <input id="role-id" type="hidden" name="RoleId"/>
                                <div>
                                    <label className="form-label">Role name</label>
                                    <input type="text" className="form-control"
                                    required
                                    value={this.state.name}
                                    onChange={(e) => {
                                        this.setState({
                                            name: e.target.value
                                        });
                                    }}
                                    placeholder="Role name"/>
                                </div>
                                <div className="mt-5 role-form-button-panel">
                                    <button className="btn btn-warning">
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary ">
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Role;
