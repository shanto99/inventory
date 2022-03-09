import React from "react";
import {getRolesWithPermissions} from "../../API/rolePermission";
import {getPermissions} from "../../API/permission";

class RolePermission extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roles: [],
            permissions: []
        }
    }

    componentDidMount() {
        Promise.all([getRolesWithPermissions(), getPermissions()]).then(responses => {
            const roles = responses[0].roles || [];
            const permissions = responses[1].permissions || [];

            this.setState(preState => {
                const newState = {...preState};
                newState.roles = roles;
                newState.permissions = permissions;

                return newState;
            });
        })
    }

    render()
    {
        const {roles, permissions} = this.state;
        return (
            <div className="overflow-x-auto box">
                <table className="table border-collapse border border-slate-400 ">
                    <thead>
                        <tr>
                            <th className="border-b-2 dark:border-dark-5 whitespace-nowrap">
                                Permissions
                            </th>
                            {roles.map(role => {
                                return (
                                    <td className="border-b dark:border-dark-5">
                                        {role.name}
                                    </td>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map(permission => {
                            return (
                                <tr>
                                    <td className="border-b dark:border-dark-5">{permission.name}</td>
                                    {roles.map(role => (
                                        <td className="border-b dark:border-dark-5">
                                            <input type="checkbox"
                                            checked={role.permissionIds.includes(permission.id)}
                                             className="form-check-input"/>
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default RolePermission;
