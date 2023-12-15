import React from 'react';

import {
    compose,
    withActions,
    withAuthContext,
    withModals,
    withPageRouter,
} from '@efr/medservice-web-presentation-core';
import {
    Button,
    Checkbox,
    Panel,
    Spreadsheet,
} from '@efr/medservice-web-presentation-ui'

import {ROLES_EDIT_PAGE_KEY} from '../../page-keys'
import {PopupKeys} from '../../../modal/index'
import {
    CreateRoleAction,
    GetRolesListAction,
    GetRoleAction,
} from "../../../../actions/index";
import permissions from '../../../../permissions'

const rolesComparator = (first, second) => {
    if (first.desc < second.desc) {
        return -1;
    }
    if (first.desc > second.desc) {
        return 1;
    }
    return 0;
};

class RolesList extends React.Component {
    state = {
        roles: [],
    };

    componentDidMount = () => {
        this.fetchRoles();
    };

    fetchRoles = () => {
        return this.props.actions.getRolesList()
            .then(data => data.roles.sort(rolesComparator))
            .then(roles => this.setState({roles}));
    };

    roleRow = role => {
        const checked = this.state.selectedRole && this.state.selectedRole.id === role.id;
        return (
            <div>
                <Checkbox checked={checked}
                          onChange={() => this.setState({selectedRole: checked ? undefined : role})}
                          description={role.desc}
                          dataId={`role-selector-${role.id}`}
                />
                <div className="float-right">
                    {
                        this.props.authContext.checkPermission(permissions.UPDATE_ROLE) &&
                        <Button onClick={this.handleRename(role)} type={Button.buttonTypes.secondary}
                                name="Переименовать"
                                dataId="rename-role-button"/>
                    }
                    {
                        this.props.authContext.checkPermission(permissions.UPDATE_ROLE) &&
                        <Button onClick={this.handleEdit(role.id)} type={Button.buttonTypes.secondary}
                                name="Редактировать"
                                dataId="edit-role-button"/>
                    }
                </div>
            </div>
        );
    };

    columns = [
        {
            key: 'role',
            name: 'Профиль',
            data: this.roleRow,
        },
    ];

    handleCreate = () => {
        if (!this.state.selectedRole) {
            this.props.modals.alert({message: 'Выберите одну роль для копирования'});
            return;
        }
        this.props.modals.confirm({
            title: 'Создание роли',
            message: `Скопировать роль "${this.state.selectedRole.desc}"?`,
        })
            .on('success', this.createRole(this.state.selectedRole.id));
    };

    createRole = roleId => () => {
        const {getRole, createRole} = this.props.actions;
        getRole(roleId)
            .then(role => {
                const name = `${role.name}_копия ${Math.random().toString(36).substring(7)}`;
                return createRole({...role, name, desc: name});
            })
            .then(this.fetchRoles);
    };

    handleRename = role => () => {
        this.props.modals.startRename({role})
            .on('success', this.fetchRoles);
    };

    handleEdit = id => () => {
        this.props.pageRouter.open(ROLES_EDIT_PAGE_KEY, {id});
    };

    render = () => {
        return (
            <Panel labelSecondary="Роли пользователей" dataId="roles-list-panel">
                <div className="float-right grid-buttons">
                    {
                        this.props.authContext.checkPermission(permissions.CREATE_ROLE) &&
                        <Button onClick={this.handleCreate} type={Button.buttonTypes.specialOrange} name="Создать"
                                dataId="create-role-button"/>
                    }
                </div>
                <Spreadsheet columns={this.columns} rows={this.state.roles} dataId="roles-list"/>
            </Panel>
        )
    }
}

export default compose(
    withPageRouter,
    withActions({
        createRole: CreateRoleAction.name,
        getRolesList: GetRolesListAction.name,
        getRole: GetRoleAction.name,
    }),
    withModals({
        startRename: PopupKeys.ROLE_RENAME_POPUP_KEY,
    }),
    withAuthContext
)(RolesList)