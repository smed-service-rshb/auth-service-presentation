import React from 'react';

import '../styles.css'

import {compose, withFormData, withModals, withActions} from '@efr/medservice-web-presentation-core';
import {Button, Panel, Form, Field, Input} from '@efr/medservice-web-presentation-ui'

import * as PopupKeys from "../../../modal/popup-keys";
import Select from "@efr/medservice-web-presentation-ui/src/select/index";

import {GetRolesListAction} from "../../../../actions";

const fields = ['firstName', 'secondName', 'middleName', 'personnelNumber', 'branches', 'orgUnitIdes', 'position', 'roleId', 'motivationCorrectStatus'];
const motivationConfirmOptions = [
    {value: 'CORRECT', label: 'Установлен'},
    {value: 'INCORRECT',  label: 'Не установлен'},
    {value: 'NOT_CHECKED',  label: 'Не проверено'}
]
export const mask15 = (value) => {
    let mask = [/\d/];
    for (let i = 1; i < value.length && i < 15; i++) mask.push(/\d/);
    return mask;
};

const firstNameField = withFormData.createField(
    'firstName',
    ({value, onChange, errorMessage}, {clearField}) => (
        <Field title="Имя" error={errorMessage} value={value}>
            <div className={'inline-block'}><Input type='text' value={value} onChange={onChange} error={!!errorMessage}
                                                   disabled={false}
                                                   width='300px'
                                                   dataId="field-firstName"/></div>
            {value &&
            <div onClick={() => clearField('firstName')} className={'inline-block popup-window-header-close'}/>}
        </Field>
    )
);

const secondNameField = withFormData.createField(
    'secondName',
    ({value, onChange, errorMessage}, {clearField}) => (
        <Field title="Фамилия" error={errorMessage} value={value}>
            <div className={'inline-block'}><Input type='text' value={value} onChange={onChange} error={!!errorMessage}
                                                   disabled={false}
                                                   width='300px'
                                                   dataId="field-secondName"/></div>
            {value &&
            <div onClick={() => clearField('secondName')} className={'inline-block popup-window-header-close'}/>}
        </Field>
    )
);

const middleNameField = withFormData.createField(
    'middleName',
    ({value, onChange, errorMessage}, {clearField}) => (
        <Field title="Отчество" error={errorMessage} value={value}>
            <div className={'inline-block'}><Input type='text' value={value} onChange={onChange} error={!!errorMessage}
                                                   disabled={false}
                                                   width='300px'
                                                   dataId="field-middleName"/></div>
            {value &&
            <div onClick={() => clearField('middleName')} className={'inline-block popup-window-header-close'}/>}
        </Field>
    )
);

const personnelNumberField = withFormData.createField(
    'personnelNumber',
    ({value, onChange, errorMessage}, {clearField}) => (
        <Field title="Табельный номер" value={value}>
            <div className={'inline-block'}><Input type='text'
                                                   value={value}
                                                   onChange={onChange}
                                                   mask={mask15}
                                                   disabled={false}
                                                   width='300px' dataId="field-personnelNumber"/></div>
            {value &&
            <div onClick={() => clearField('personnelNumber')} className={'inline-block popup-window-header-close'}/>}
        </Field>
    )
);

const branchField = withFormData.createField(
    'branches',
    ({value, onChange, errorMessage}, {clearField, handleSelectBranch}) => (
        <Field title="РФ">
            <div className={'inline-block'} onClick={handleSelectBranch} onFocus={handleSelectBranch}>
                <Input type='text'
                       value={value}
                       disabled={false}
                       width='300px'
                       dataId="field-branch"/></div>
            {value &&
            <div onClick={() => clearField('branches')} className={'inline-block popup-window-header-close'}/>}
        </Field>
    )
);

const officeField = withFormData.createField(
    'orgUnitIdes',
    ({value, onChange, errorMessage}, {clearField, handleSelectBranch}) => (
        <Field title="ВСП" error={errorMessage}>
            <div className={'inline-block'} onClick={handleSelectBranch} onFocus={handleSelectBranch}>
                <Input type='text'
                       value={value}
                       disabled={false}
                       width='300px'
                       dataId="field-orgUnitId"/></div>
            {value &&
            <div onClick={() => clearField('orgUnitIdes')} className={'inline-block popup-window-header-close'}/>}
        </Field>
    )
);

const positionField = withFormData.createField(
    'position',
    ({value, onChange, errorMessage}, {clearField}) => (
        <Field title="Должность" error={errorMessage} value={value}>
            <div className={'inline-block'}><Input type='text'
                                                   value={value}
                                                   onChange={onChange}
                                                   width='300px'
                                                   maxLength={50}
                                                   dataId="field-position"/></div>
            {value &&
            <div onClick={() => clearField('position')} className={'inline-block popup-window-header-close'}/>}
        </Field>
    ));

const rolesField = withFormData.createField(
    'roleId',
    ({value, onChange, errorMessage}, {clearField, options}) => (
        <Field title="Роль" error={errorMessage}>
            <div className={'inline-block'}>
                <Select options={options} value={value} onChange={v => onChange(v.id)} dataId={`field-name-roles`}
                        width='300px'/>
            </div>
        </Field>
    )
);
const motivationCorrectStatusField = withFormData.createField(
    'motivationCorrectStatus',
    ({value, onChange, errorMessage}, {options}) => (
        <Field title="Признак подтверждения корректных данных" error={errorMessage}>
            <div className={'inline-block'}>
                <Select options={options}
                        value={value}
                        onChange={v => onChange(v.value)}
                        dataId={`field-name-correct-data`}
                        width='300px'/>
            </div>
        </Field>
    )
);
class SearchPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: false
        };
        this.fetchRoles = this.fetchRoles.bind(this);
    }

    componentDidMount() {
        this.fetchRoles();
    }

    handleSelectBranch = () => {
        this.props.modals.branchSelect({selected: this.state.branchGridData}).on('success', (response) => {
            let branches = [];
            let offices = [];
            let officesIdes = [];
            response.forEach(item => {
                branches.indexOf(item.branch) === -1 && (branches.push(item.branch));
                offices.push(item.office);
                officesIdes.push(item.officeId);
            });
            this.props.formData.init({
                ...this.props.formData.rawValues,
                [branchField.name]: branches,
                [officeField.name]: offices
            });
            this.setState({
                officesIdes: officesIdes,
                branchGridData: response
            })
        });
    };

    handleSearch = () => {
        this.setState({
            search: !this.state.search
        })
    };

    handleClearSearch = () => {
        this.props.formData.init({
            [firstNameField.name]: undefined,
            [secondNameField.name]: undefined,
            [middleNameField.name]: undefined,
            [personnelNumberField.name]: undefined,
            [branchField.name]: undefined,
            [officeField.name]: undefined,
            [positionField.name]: undefined,
            [rolesField.name]: undefined,
            [motivationCorrectStatusField.name]: undefined
        });
        this.setState({
            officesIdes: undefined,
            branchGridData: []
        });
        this.props.onSearch();
    };

    clearField = (fieldName) => {
        fieldName === 'orgUnitIdes' && this.setState({
            branchGridData: [],
            officesIdes: undefined
        });
        this.props.formData.init({
            ...this.props.formData.rawValues,
            [fieldName]: undefined,
        })
    };

    getButtons() {

        let search = <Button key="search"
                             name="Найти"
                             dataId="button-search"
                             onClick={() => {
                                 let hasData = false;
                                 Object.keys(this.props.formData.rawValues).map(e => hasData = (hasData || !!this.props.formData.rawValues[e]));
                                 let data = this.props.formData.rawValues;
                                 data.orgUnitIdes = this.state.officesIdes;
                                 this.props.onSearch(hasData ? this.props.formData.rawValues : undefined)
                             }}
        />;

        let cancel = <Button key="cancel"
                             name="Отмена"
                             dataId="button-cancel"
                             onClick={() => {
                                 this.handleClearSearch();
                                 this.handleSearch();
                             }}
                             type={Button.buttonTypes.secondary}
        />;

        return [search, cancel];
    }

    showClear() {
        let result = false;
        let valueFields = this.props.formData.rawValues;
        fields.forEach(field => {
            result = result || !!valueFields[field]
        });
        return result;
    }

    fetchRoles() {
        return this.props.actions.getRolesList()
            .then(data => this.setState({...this.state, roles: data.roles, rolesLoaded: true}))
    };

    prepareOptions() {
        let roles = this.state.rolesLoaded
            ? this.state.roles.map(role => {
                return {
                    id: role.id,
                    value: '' + role.id,
                    label: role.desc
                }
            })
            : [];

        roles.unshift({id: undefined, value: null, label: '  '});

        return {roles};
    }

    render = () => {
        let {roles} = this.prepareOptions();
        const Buttons = this.getButtons();
        const {renderField} = this.props.formData;
        let showClear = this.showClear();
        return (
            <Panel dataId="search-panel">
                <br/>
                <div className="float-left grid-buttons filter filter-margin">
                    <Button onClick={this.handleSearch} type={Button.buttonTypes.special}
                            name={showClear ? "Фильтрация установлена" : "Фильтрация"}
                            dataId="search-employee-button"/>
                    <div className={(showClear ? "triangle-shift " : "") +
                    (this.state.search ? "triangle-bottom" : "triangle-top")}/>
                    {
                        showClear &&
                        <Button onClick={this.handleClearSearch} type={Button.buttonTypes.secondary}
                                name="Очистить фильтр" dataId="clear-search-employee-button"/>
                    }
                </div>
                {this.state.search && <div className="search-form">
                    <Form buttons={Buttons} dataId="search-form" errors={this.state.formErrors}>
                        <div className={'table-row'}>
                            {renderField(secondNameField, {clearField: this.clearField})}
                            {renderField(personnelNumberField, {clearField: this.clearField})}
                        </div>
                        <div className={'table-row'}>
                            {renderField(firstNameField, {clearField: this.clearField})}
                            {renderField(branchField, {
                                clearField: this.clearField,
                                handleSelectBranch: this.handleSelectBranch
                            })}
                        </div>
                        <div className={'table-row'}>
                            {renderField(middleNameField, {clearField: this.clearField})}
                            {renderField(officeField, {
                                clearField: this.clearField,
                                handleSelectBranch: this.handleSelectBranch
                            })}
                        </div>
                        <div className={'table-row'}>
                            {renderField(positionField, {clearField: this.clearField})}
                            {renderField(rolesField, {options: roles})}
                        </div>
                        <div className={'table-row'}>
                            {renderField(motivationCorrectStatusField, {options: motivationConfirmOptions})}
                        </div>
                    </Form>
                </div>}
            </Panel>
        )
    }
}

export default compose(
    withFormData,
    withActions({
        getRolesList: GetRolesListAction.name
    }),
    withModals({
        branchSelect: PopupKeys.BRANCH_SEARCH_POPUP_KEY,
    })
)(SearchPanel);