import React from 'react';

import {
    compose,
    modal,
    withActions,
} from '@efr/medservice-web-presentation-core';
import {
    Button,
    Field,
    Input,
    Notification,
} from '@efr/medservice-web-presentation-ui';

import {
    GetRoleAction,
    SaveRoleAction,
} from "../../../../actions/index";


class RenameRoleComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {roleName: props.role.name};
        this.fromButtons = [
            <Button key="save"
                    name="Сохранить"
                    dataId="button-save"
                    onClick={this._handleSave}/>,
            <Button key="cancel"
                    dataId="button-cancel"
                    name="Отмена"
                    onClick={this._handleCancel}
                    type={Button.buttonTypes.secondary}
            />,
        ];
    }

    _handleCancel = () => {
        this.props.modal.close();
    };

    _handleSave = () => {
        this.renameRole({name: this.state.roleName})
            .then(() => this.props.modal.close('success', {name: this.state.roleName}))
            .catch(e => {
                const {response = {}} = e || {};
                const {body = {}} = response || {};
                const {errors = []} = body || {};
                this.setState({errors});
            });
    };

    _handleRoleNameChange = roleName => {
        this.setState({roleName})
    };

    renameRole = ({name}) => (
        this.props.actions.getRole(this.props.role.id)
            .then(role => this.props.actions.updateRole({...role, name, desc: name}))
    );

    _getRoleNameError = () => this.state.errors && this.state.errors[0].errorMessage;

    render = () => {
        const {errors = []} = this.state;
        const globalErrors = errors.filter(error => error.fieldName !== 'name').map(error => error.errorMessage);
        const roleNameError = (errors.find(error => error.fieldName === 'name') || {}).errorMessage;
        return (
            <modal.window title="Переименование роли" buttons={this.fromButtons}>
                {
                    globalErrors.length > 0 &&
                    <Notification type="error">
                        <ul>
                            {globalErrors.map(items => (
                                <li key={items}>
                                    {items}
                                </li>
                            ))}
                        </ul>
                    </Notification>
                }
                <Field title="Название" error={roleNameError}>
                    <Input value={this.state.roleName}
                           onChange={this._handleRoleNameChange}
                           dataId="input-role-name"
                           placeholder={this.props.role.name}
                           maxLength={1024}
                           error={!!roleNameError}
                    />
                </Field>
            </modal.window>
        );
    }
}

export default compose(
    modal(true),
    withActions({
        getRole: GetRoleAction.name,
        updateRole: SaveRoleAction.name,
    }),
)(RenameRoleComponent);