import React from "react";
import Select from "react-select";

import { CheckSquare, Delete as DeleteIcon } from "react-feather";

import {getPermissions} from "../../API/permission";
import {getMenus, createMenu, deleteMenu} from "../../API/menu";
import swal from "sweetalert";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            permissions: [],
            selectedPermission: '',
            name: '',
            title: '',
            icon: '',
            routeName: '',
        }
    }

    componentDidMount() {
        Promise.all([getMenus(), getPermissions()]).then(responses => {
            const menus = responses[0].menus || [];
            let permissions = responses[1].permissions || [];

            permissions = permissions.map(function(permission) {
                return {
                    label: permission.name,
                    value: permission.id
                }
            });

            this.setState(preState => {
                const newState = {...preState};
                newState.menus = menus;
                newState.permissions = permissions;

                return newState;
            })
        });
    }

    handlePermissionSelect = (permission) => {
        this.setState({
            selectedPermission: permission
        });
    }

    handleMenuSubmit = (e) => {
        e.preventDefault();
        let {name, title, icon, routeName, selectedPermission} = this.state;
        selectedPermission = selectedPermission.value;

        createMenu({name, title, icon, routeName, permission: selectedPermission}).then(res => {
            const newMenu = res.menu;
            this.setState(preState => {
                const newState = {...preState};
                newState.menus.push(newMenu);
                return newState;
            });
        }).catch(err => {
            swal("Error!", "Something went wrong", "error");
        })

    }

    deleteMenu = (menuId) => {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this menu!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    deleteMenu(menuId).then(res => {
                        swal("Menu has been deleted!", {
                            icon: "success",
                        });
                    });

                    this.setState(preState => {
                        const newState = {...preState};
                        let menus = newState.menus;
                        menus = menus.filter(menu => menu.MenuID !== menuId);
                        newState.menus = menus;
                        return newState;
                    })

                } else {
                    swal("Role is safe!");
                }
        });
    }

    render() {
        const {name, title, icon, routeName, menus, permissions, selectedPermission} = this.state;
        console.log("Menus: ", menus);
        return (
            <>
                <div className="intro-y flex items-center mt-8">
                    <h2 className="text-lg font-medium mr-auto">
                        Menus
                    </h2>
                </div>

                <div className="pos intro-y grid grid-cols-12 gap-5 mt-5">
                    <div className="col-span-12 lg:col-span-4">
                        <div className="intro-y box p-5">
                            <form onSubmit={this.handleMenuSubmit}>
                                <div class="mt-3">
                                    <label className="form-label">Menu name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Menu name"
                                        value={name}
                                        onChange={(e) => this.setState({ name: e.target.value })}
                                    />
                                </div>
                                <div class="mt-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Menu title"
                                        value={title}
                                        onChange={(e) => this.setState({ title: e.target.value })}
                                    />
                                </div>
                                <div class="mt-3">
                                    <label className="form-label">Icon</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Menu icon"
                                        value={icon}
                                        onChange={e => this.setState({ icon: e.target.value })}
                                    />
                                </div>
                                <div class="mt-3">
                                    <label className="form-label">Route name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Route name"
                                        value={routeName}
                                        onChange={e => this.setState({ routeName: e.target.value })}
                                    />
                                </div>
                                <div className="mt-3">
                                    <label className="form-label">Permission</label>
                                    <Select
                                        options={permissions}
                                        value={selectedPermission}
                                        onChange={this.handlePermissionSelect}
                                    />
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
                    <div className="col-span-12 lg:col-span-8">
                        <div className="intro-y box col-span-12 overflow-auto lg:overflow-visible">
                            <table className="table table-report mt-2">
                                <thead>
                                    <tr>
                                        <th className="whitespace-nowrap">Title</th>
                                        <th className="text-center whitespace-nowrap">Name</th>
                                        <th className="text-center whitespace-nowrap">Route name</th>
                                        <th className="text-center whitespace-nowrap">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menus.map(menu => (
                                        <tr className="intro-x">
                                            <td>
                                                <div>{menu.Title}</div>
                                            </td>
                                            <td className="text-center">{menu.Name}</td>
                                            <td className="text-center">{menu.RouteName}</td>
                                            <td className="table-report__action w-56">
                                                <div className="flex justify-center items-center">
                                                    <a className="flex items-center mr-3"
                                                    href="#"><CheckSquare className="w-4 h-4 mr-1"/> Edit </a>
                                                    <a class="flex items-center text-theme-6"
                                                    href="#" onClick={(e) => this.deleteMenu(menu.MenuID)}>
                                                    <DeleteIcon className="w-4 h-4 mr-1"/> Delete </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Menu;
