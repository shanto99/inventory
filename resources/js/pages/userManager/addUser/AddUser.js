import React from "react";
import Select from "react-select";

import {getRoles} from "../../../API/role";
import {getPermissions} from "../../../API/permission";
import {createUser} from "../../../API/userManager";

class AddUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            name: '',
            designation: '',
            email: '',
            password: '',
            roles: props.roles || [],
            permissions: props.permissions || [],
            selectedRoles: [],
            selectedPermissions: []
        }
    }

    componentDidMount() {

        Promise.all([getRoles(), getPermissions()]).then(responses => {
            let roles = responses[0].roles || [];
            let permissions = responses[1].permissions || [];

            roles = roles.map(role => {
                return {
                    value: role.id,
                    label: role.name
                }
            });

            permissions = permissions.map(function(permission) {
                return {
                    value: permission.id,
                    label: permission.name
                }
            });

            this.setState({
                roles: roles,
                permissions: permissions
            });
        });
    }

    handleRoleSelect = (roles) => {
        this.setState({
            selectedRoles: roles
        })
    }

    handlePermissionSelect = (permissions) => {
        this.setState({
            selectedPermissions: permissions
        });
    }

    handleUserFormSubmit = (e) => {
        e.preventDefault();
        const {userId, name, email, designation, password} = this.state;
        const roleIds = this.state.selectedRoles.map(role => {
            return role.value;
        });
        const permissionIds = this.state.selectedPermissions.map(permission => {
            return permission.value;
        });

        createUser(userId, name, email, designation, password, roleIds, permissionIds).then(res => {

        }).catch(err => {

        });

    }

    render() {
        const {userId, name, email, designation, password,
            roles, permissions, selectedRoles, selectedPermissions} = this.state;
        return (
            <form onSubmit={this.handleUserFormSubmit}>
                <div className="mt-3">
                    <label className="form-label">User ID</label>
                    <input type="text"
                        required
                        value={userId}
                        name="UserID" className="form-control"
                        placeholder="User ID"
                        onChange={(e) => this.setState({ userId: e.target.value })}
                    />
                </div>
                <div class="mt-3">
                    <label className="form-label">Name</label>
                    <input type="text" required
                    value={name}
                    onChange={(e) => this.setState({
                        name: e.target.value
                    })}
                    className="form-control" placeholder="User name"/>
                </div>
                <div class="mt-3">
                    <label className="form-label">Designation</label>
                    <input type="text" required
                    value={designation}
                    onChange={(e) => this.setState({
                        designation: e.target.value
                    })}
                    className="form-control" placeholder="User designation"/>
                </div>
                <div class="mt-3">
                    <label className="form-label">Email</label>
                    <input type="text" required value={email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    className="form-control" placeholder="User email"/>
                </div>
                <div className="mt-3">
                    <label class="form-label">Roles</label>
                    <Select
                        options={roles}
                        value={selectedRoles}
                        isMulti
                        onChange={this.handleRoleSelect}
                    />
                </div>
                <div className="mt-3">
                    <label class="form-label">permissions</label>
                    <Select
                        options={permissions}
                        value={selectedPermissions}
                        isMulti
                        onChange={this.handlePermissionSelect}
                    />
                </div>
                <div class="mt-3">
                    <label class="form-label">Password</label>
                    <input type="text" required value={password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                     class="form-control" placeholder="Password"/>
                </div>
                <div class="flex space-x-4">
                    <button type="submit" className="btn btn-primary mt-5">
                        Add
                    </button>
                </div>
            </form>
        )
    }
}

export default AddUser;

