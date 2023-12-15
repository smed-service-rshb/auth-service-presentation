import React from 'react';

import {
    compose,
    PropTypes,
    withActions,
    withAuthContext,
    withModals,
    withPageRouter,
} from '@efr/medservice-web-presentation-core';
import {
    Button,
    Checkbox,
    Form,
    Panel,
    Spreadsheet,
} from '@efr/medservice-web-presentation-ui';

import permissions from '../../../../permissions'
import {GetServicesListAction, GetRoleAction, SaveRoleAction} from "../../../../actions/index";
import {PopupKeys} from "../../../modal/index";
import {ROLES_LIST_PAGE_KEY} from '../../page-keys'


const rightsComparator = (first, second) => {
    if (first.description < second.description) {
        return -1;
    }
    if (first.description > second.description) {
        return 1;
    }
    return 0;
};

class RolesEdit extends React.Component {
    state = {};

    constructor(props) {
        super(props);

        this.columns = [
            {
                key: 'description',
                name: 'Функциональное право',
            },
            {
                key: 'checked',
                name: 'Доступ',
                data: row => <Checkbox onChange={selected => this.checkedDataOnChange(row, selected)}
                                       checked={this.isRightChecked(row)} dataId='data-checkbox'/>,
                headerStyle: {'width': '20px'},
                cellStyle: {textAlign: 'center'}
            },
        ];
    }

    checkedDataOnChange = ({externalId}, selected) => {
        const {selectedRights} = this.state;
        this.setState({selectedRights: [...selectedRights, externalId].filter((value, index, self) => (selected || value !== externalId) && (self.indexOf(value) === index))});
    };

    isRightChecked = right => (this.state.selectedRights || []).some(selectedRight => (selectedRight === right.externalId));

    componentDidMount = () => {
        const {getServicesList, getRole} = this.props.actions;

        if (this.props.authContext.checkPermission(permissions.GET_RIGHTS)) {
            getServicesList()
                .then(data => ({
                    rights: data.rights.sort(rightsComparator),
                }))
                .then(data => {
                    this.setState(data);
                });
        }
        getRole(this.props.id)
            .then(role => {
                this.setState({
                    role,
                    selectedRights: role.rights,
                });
            })
            .catch(() => {
                this.props.modals.alert({message: 'Ошибка получения данных роли'});
            })
    };

    handleSave = () => {
        const change = this.getChange();
        this.props.modals.confirmDiff({change}).on('success', this.save);
    };

    save = () => {
        const {role} = this.state;
        role.rights = this.state.selectedRights;
        this.props.actions.saveRole(role)
            .then(() => {
                this.props.pageRouter.open(ROLES_LIST_PAGE_KEY);
            });
    };

    getRight = key => this.state.rights.find(right => right.externalId === key);

    getChange = () => {
        const originalRoleRights = this.state.role.rights;
        const newRoleRights = this.state.selectedRights;

        const addedRights = newRoleRights.filter(right => !originalRoleRights.includes(right)).map(this.getRight);
        const removedRights = originalRoleRights.filter(right => !newRoleRights.includes(right)).map(this.getRight);

        return ({
            addedRights,
            removedRights,
            hasModify: addedRights.length > 0 || removedRights.length > 0,
        });
    };

    handleCancel = () => {
        const change = this.getChange();
        change.hasModify && this.props.modals.confirm({
            title: 'Редактирование роли',
            message: 'В роль были внесены изменения, выйти без сохранения?',
        }).on('success', this.cancel);

        !change.hasModify && this.cancel();
    };

    cancel = () => {
        this.props.pageRouter.open(ROLES_LIST_PAGE_KEY);
    };

    render = () => {
        const Buttons = [
            <Button key="save"
                    name="Сохранить"
                    dataId="button-save"
                    disabled={!this.props.authContext.checkPermission(permissions.UPDATE_ROLE)}
                    onClick={this.handleSave}
            />,
            <Button key="cancel"
                    name="Отменить"
                    dataId="button-cancel"
                    onClick={this.handleCancel}
                    type={Button.buttonTypes.secondary}
            />
        ];
        return (
            <div>
                <Panel labelSecondary={(this.state.role || {}).desc} label="Редактирование роли"
                       dataId="role-edit-panel">
                    <Form buttons={Buttons} dataId="role-edit-form">
                        {
                            this.state.rights &&
                            <Spreadsheet columns={this.columns} rows={this.state.rights} dataId="role-edit-rights"/>
                        }
                    </Form>
                </Panel>
            </div>
        )
    };

    static propTypes = {
        id: PropTypes.number,
    };
}

export default compose(
    withPageRouter,
    withActions({
        getServicesList: GetServicesListAction.name,
        getRole: GetRoleAction.name,
        saveRole: SaveRoleAction.name
    }),
    withModals({
        confirmDiff: PopupKeys.ROLES_DIFF_POPUP_KEY,
    }),
    withAuthContext,
)(RolesEdit)