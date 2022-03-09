import React from "react";
import { CheckSquare, Delete as DeleteIcon } from "react-feather";
import {getMenus} from "../../API/menu";
import { getSubMenus, createSubMenu } from "../../API/subMenu";
import {getPermissions} from "../../API/permission";

class SubMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: [],
            subMenus: [],
            permissions: [],
            title: '',
            name: '',
            menu: '',
            permission: ''
        }
    }

    componentDidMount() {
        Promise.all([getMenus(), getPermissions(), getSubMenus()]).then(responses => {
            const menus = responses[0].menus || [];
            const permissions = responses[1].permissions || [];
            const subMenus = responses[2].subMenus || [];

            this.setState({
                menus: menus,
                subMenus: subMenus,
                permissions: permissions
            });
        });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        const {title, name, menu, permission} = this.state;
        createSubMenu(title, name, menu, permission)
        console.log({title, name, menu, permission});
    }

    render() {
        const {menus, subMenus, permissions, title, name, menu, permission} = this.state;
        return (
            <>
                <div className="intro-y flex items-center mt-8">
                    <h2 className="text-lg font-medium mr-auto">
                        Sub menus
                    </h2>
                </div>
                <div className="pos intro-y grid grid-cols-12 gap-5 mt-5">
                    <div className="col-span-12 lg:col-span-4">
                        <div className="intro-y box p-5">
                            <form onSubmit={this.handleFormSubmit}>
                                <div className="mt-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" className="form-control"
                                    value={title}
                                    onChange={e => {
                                        this.setState({
                                            title: e.target.value
                                        });
                                    }}
                                    placeholder="Sub menu title"/>
                                </div>
                                <div className="mt-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control"
                                     value={name}
                                     onChange={e => {
                                         this.setState({ name: e.target.value })
                                     }}
                                     placeholder="Sub menu name"/>
                                </div>
                                <div className="mt-3">
                                    <label className="form-label">Menu</label>
                                    <select value={menu} className="form-select sm:mr-2" onChange={e => {
                                        this.setState({
                                            menu: e.target.value
                                        })
                                    }}>
                                        <option value='' disabled>Select menu</option>
                                        {menus.map(menu => (
                                            <option value={menu.MenuID}>{menu.Title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <label className="form-label">Permission</label>
                                    <select value={permission}
                                    className="form-select sm:mr-2"
                                    onChange={e => {
                                        this.setState({ permission: e.target.value })
                                    }}
                                    >
                                        <option value='' disabled>Select permission</option>
                                        {permissions.map(permission => (
                                            <option value={permission.id}>{permission.name}</option>
                                        ))}
                                    </select>
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
                                        <th className="text-center whitespace-nowrap">Menu</th>
                                        <th className="text-center whitespace-nowrap">Route</th>
                                        <th className="text-center whitespace-nowrap">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subMenus.map(subMenu => {
                                        return (
                                            <tr>
                                                <td>
                                                    <div className="font-medium whitespace-nowrap">{subMenu.Title}</div>
                                                </td>
                                                <td className="text-center">{subMenu.Name}</td>
                                                <td className="text-center">
                                                    {subMenu.menu.Title}
                                                </td>
                                                <td className="text-center">{ subMenu.RouteName }</td>
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
                    </div>
                </div>
            </>
        )
    }
}

export default SubMenu;
