import React from "react";
import {CheckSquare, Delete as DeleteIcon} from "react-feather";
import swal from "sweetalert";
import { getPermissions, createPermission, deletePermission } from "../../API/permission";
import "./style.css";

class Permissioin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            permissions: [],
            permission: ''
        }
    }

    componentDidMount()
    {
        getPermissions().then(res => {
            this.setState(preState => {
                const newState = {...preState};
                newState.permissions = res.permissions || [];
                return newState;
            });
        })
    }

    handlePermissionSubmit = (e) => {
        e.preventDefault();
        const {permission} = this.state;
        createPermission(permission).then(res => {
            const permission = res.permission;
            this.setState(preState => {
                const newState = {...preState};
                newState.permissions.push(permission);
                return newState;
            });
        }).catch(err => {
            swal("Opps!", "Could not create permission", "error");
        })
    }

    deletePermission = (permissionId) => {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this permission!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                        deletePermission(permissionId).then(res => {
                            this.setState(preState => {
                            const newState = {...preState};
                            let permissions = newState.permissions;
                            permissions = permissions.filter(permission => permission.id !== permissionId);
                            newState.permissions = permissions;
                            return newState;
                        });
                    }).catch(err => {
                        swal("Error")
                    });

                } else {
                    swal("Permission is safe!");
                }
        });
    }

    render()
    {
        const {permissions, permission} = this.state;

        return (
            <>
                <div className="intro-y flex items-center mt-8">
                    <h2 className="text-lg font-medium mr-auto">
                        Permissions
                    </h2>
                </div>
                <div className="pos intro-y grid grid-cols-12 gap-5 mt-5">
                    <div className="col-span-6 lg:col-span-4">
                        <div className="intro-y box p-5">
                            <table className="table table-report mt-2">
                                <thead>
                                    <tr>
                                        <th className="whitespace-nowrap">Permission</th>
                                        <th className="text-center whitespace-nowrap">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {permissions.map(permission => {
                                        return (
                                            <tr className="intro-x">
                                                <td>
                                                    <div className="font-medium whitespace-nowrap">
                                                        {permission.name}
                                                    </div>
                                                </td>
                                                <td class="table-report__action w-56">
                                                    <div className="flex justify-center items-center">
                                                        <a className="flex items-center mr-3"
                                                        href="#"><CheckSquare className="w-4 h-4 mr-1"/> Edit </a>
                                                        <a className="flex items-center text-theme-6"
                                                        onClick={(e) => this.deletePermission(permission.id)}
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
                    </div>
                    <div className="col-span-6 lg:col-span-4">
                        <div className="intro-y box p-5">
                            <form method="POST" onSubmit={this.handlePermissionSubmit}>
                                <div>
                                    <label class="form-label">Permission name</label>
                                    <input type="text" value={permission}
                                    onChange={(e) => this.setState({
                                        permission: e.target.value
                                    })}
                                    className="form-control" placeholder="Permission name"/>
                                </div>
                                <div className="flex space-x-4 permission-form-button-panel">
                                    <button className="btn btn-warning mt-5 invisible">
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary mt-5">
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default Permissioin;
