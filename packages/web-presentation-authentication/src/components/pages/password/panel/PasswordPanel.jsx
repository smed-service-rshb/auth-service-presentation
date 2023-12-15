import React from 'react';

import {
    compose, withActions, withAuthContext, withModals, withPageRouter, withFormData,
} from '@efr/medservice-web-presentation-core';
import {
    Button,
    Panel,
    Form,
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn
} from '@efr/medservice-web-presentation-ui';
import * as fields from "./fields";
import * as Messages from '../../../../Messages.json';
import './style.css';
import {columnBodyCategory, columnHeadCategory, settingPasswordData} from "./constant"

import {
    PutSettingsPasswordAction,
    GetSettingsPasswordAction,
} from "../../../../actions/index";

const validationForm = () => {
    const field = [
        fields.checkEnabledField,
        fields.minLengthField,
        fields.maxLengthField,
        fields.numberCharactersField,
        fields.specialCharsetsField
    ];
    let count = 0;
    if (columnBodyCategory) {
        columnBodyCategory.forEach(row => {
            field.push(fields.allowedIsActiveField(count, row.type));
            field.push(fields.requiredIsActiveField(count, row.type));
            count++;
        });
    }

    return withFormData.createValidationForm(field);
};

const styleForTable = {
    width: '67%'
};

class PasswordPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            viewMode: true
        };
    }

    componentDidMount = () => {
        this.getData();
    };


    create = (data) => {
        let allowedCharsets = [];
        let requiredCharsets = [];
        for (let i = 0; i <= 4; i++) {
            allowedCharsets.push(data[settingPasswordData.allowedIsActive + i]);
            requiredCharsets.push(data[settingPasswordData.requiredIsActive + i]);
        }
        allowedCharsets = allowedCharsets.filter(item => item !== undefined);
        requiredCharsets = requiredCharsets.filter(item => item !== undefined);

        let array = {};
        array.checkEnabled = data.checkEnabled;
        array.maxLength = Number(data.maxLength);
        array.minLength = Number(data.minLength);
        array.numberOfDifferentCharacters = data.numberOfDifferentCharacters;
        array.specialCharsets = data.specialCharsets;
        array.enabledCharsets = allowedCharsets;
        array.requiredCharsets = requiredCharsets;

        this.props.actions.putSettings(array)
            .then(result => {
                this.getData();
                this.setState({
                    viewMode: false
                });
            }).catch(e => {
            this.props.modals.alert({message: "Не удалось сохранить настройки"});
            console.log(e);
        });
    };

    getData = () => {
        this.props.actions.getSettingsData()
            .then(document => {
                let checkboxData = {};
                columnBodyCategory.forEach(
                    (item, index) => {
                        checkboxData[settingPasswordData.allowedIsActive + index] = document.enabledCharsets.indexOf(item.type) > -1 ? item.type : undefined;
                        checkboxData[settingPasswordData.requiredIsActive + index] = document.requiredCharsets.indexOf(item.type) > -1 ? item.type : undefined;
                    });
                this.props.formData.init({...document, ...checkboxData});
            }).catch(e => {
            console.log(e);
        });
    };

    getButtons = () => {
        const {validate} = this.props.formData;

        const edit = [<Button key="edit" dataId={'editButton'} name={Messages.PasswordPanel.buttons.edit} onClick={() => {
            this.setState({viewMode: false})
        }}/>];

        const save = [<Button key="save"dataId={'saveButton'} name={Messages.PasswordPanel.buttons.save} onClick={() => {
            validate(validationForm(), this.create, data => {
            })();
        }}/>];

        return !this.state.viewMode ? save : edit;
    };

    render = () => {
        const {renderField} = this.props.formData;

        return <div>
            <Panel labelSecondary={Messages.PasswordPanel.panel} dataId={"passwordPanel"}>
                <Form dataId={"contractForm"} buttons={this.getButtons()} errors={this.state.formErrors}>
                    <div>
                        {renderField(fields.checkEnabledField, {viewMode: this.state.viewMode})}
                        {renderField(fields.minLengthField, {viewMode: this.state.viewMode})}
                        {renderField(fields.maxLengthField, {viewMode: this.state.viewMode})}
                        {renderField(fields.numberCharactersField, {viewMode: this.state.viewMode})}
                        {renderField(fields.specialCharsetsField, {viewMode: this.state.viewMode})}
                    </div>
                    <div>
                        <Table>
                            <TableHeader>
                                {columnHeadCategory.map((row) =>
                                    <TableHeaderColumn dataId={'table-header-column- '+ row.key + 1}
                                        style={row.name === Messages.PasswordPanel.groupSymbols ? styleForTable : null}>
                                        {row.name}
                                    </TableHeaderColumn>
                                )}
                            </TableHeader>
                            <TableBody>
                                {columnBodyCategory.map((row, rowIndex) => (
                                    <TableRow dataId={"table-row"+ row.key + rowIndex}>
                                        <TableRowColumn dataId={'table-body-column- '+ rowIndex}>
                                            {row.name}
                                        </TableRowColumn>
                                        <TableRowColumn dataId={'table-body-column- '+ rowIndex + 1}>
                                            {renderField(fields.allowedIsActiveField(rowIndex, row.type), {viewMode: this.state.viewMode})}
                                        </TableRowColumn>
                                        <TableRowColumn dataId={'table-body-column- '+ rowIndex + 2}>
                                            {renderField(fields.requiredIsActiveField(rowIndex, row.type),
                                            {viewMode: this.state.viewMode, allowed: this.props.formData.rawValues[settingPasswordData.allowedIsActive+rowIndex]})}
                                        </TableRowColumn>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Form>
            </Panel>
        </div>
    }
}

export default compose(
    withPageRouter,
    withActions({
        putSettings: PutSettingsPasswordAction.name,
        getSettingsData: GetSettingsPasswordAction.name
    }),
    withModals(),
    withAuthContext,
    withFormData
)(PasswordPanel)