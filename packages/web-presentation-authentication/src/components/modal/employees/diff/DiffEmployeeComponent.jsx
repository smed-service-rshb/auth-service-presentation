import React from 'react';

import {compose, modal,} from '@efr/medservice-web-presentation-core';
import {Button, Spreadsheet} from '@efr/medservice-web-presentation-ui';

const columns = [
    {
        key: 'fieldName',
        name: 'Поле',
        data: this.prepareData
    },
    {
        key: 'current',
        name: 'Текущие данные сотрудника',
        data: this.prepareData
    },
    {
        key: 'modified',
        name: 'Измененные данные сотрудника'
    },
];


class DiffEmployeeComponent extends React.Component {

    _handleCancel = () => {
        this.props.modal.close();
    };

    _handleSave = () => {
        this.props.modal.close('success', {change: this.props.change});
    };

    formatChange = change => {
        return change.length > 0
            ? change.map(item => {
                return {fieldName: item.fieldName, current: item.oldValue, modified: item.newValue}
            })
            : []
    };

    prepareData = data => {
        return (
            <div>
                {
                    data
                }
            </div>
        );
    };

    render = () => (
        <modal.window title="Редактирование сотрудника" buttons={[
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
            <Spreadsheet rows={this.formatChange(this.props.change.diffFields)}
                         columns={this.props.change.diffFields.length > 0 ? columns : [{
                             key: 'description',
                             name: 'Изменений нет'
                         }]}
                         dataId="employee-edit-added"/>
        </modal.window>
    );
}

export default compose(
    modal(true),
)(DiffEmployeeComponent);