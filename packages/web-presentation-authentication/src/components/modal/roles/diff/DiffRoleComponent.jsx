import React from 'react';

import {
    compose,
    modal,
} from '@efr/medservice-web-presentation-core';
import {
    Button,
    Spreadsheet,
} from '@efr/medservice-web-presentation-ui';


const KEY_FIELD = 'description';

const EMPTY_CHANGE = [{
    [KEY_FIELD]: 'Без изменений',
}];

class DiffRoleComponent extends React.Component {
    constructor(props) {
        super(props);

        this.addedRightsColumns = [
            {
                key: KEY_FIELD,
                name: 'Включенные права',
            },
        ];
        this.removedRightsColumns = [
            {
                key: KEY_FIELD,
                name: 'Отключенные права',
            },
        ];
    }

    _handleCancel = () => {
        this.props.modal.close();
    };

    _handleSave = () => {
        this.props.modal.close('success', {change: this.props.change});
    };

    formatChange = change => change.length > 0 ? change : EMPTY_CHANGE;

    render = () => (
        <modal.window title="Редактирование роли" buttons={[
            <Button key="save"
                    name="Да"
                    dataId="button-save"
                    disabled={!this.props.change.hasModify}
                    onClick={this._handleSave}/>,
            <Button key="cancel"
                    dataId="button-cancel"
                    name="Нет"
                    onClick={this._handleCancel}
                    type={Button.buttonTypes.secondary}
            />,
        ]}>
            <Spreadsheet columns={this.addedRightsColumns}
                         rows={this.formatChange(this.props.change.addedRights)}
                         dataId="role-edit-rights-added"/>
            <Spreadsheet columns={this.removedRightsColumns}
                         rows={this.formatChange(this.props.change.removedRights)}
                         dataId="role-edit-rights-removed"/>
        </modal.window>
    );
}

export default compose(
    modal(true),
)(DiffRoleComponent);