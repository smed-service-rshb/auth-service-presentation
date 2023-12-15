import React from 'react';

import {compose, modal, withActions, withModals, withFormData} from '@efr/medservice-web-presentation-core';
import {Button, Field, Form, Input, Select} from '@efr/medservice-web-presentation-ui';

import {
    CreateEmployeeAction,
    GetOrgUnitsAction,
    GetRolesListAction,
    GetSegmentsAction
} from "../../../../actions/index";

import {masks} from '../../../constants.jsx';
import {numberFormat} from "../../../constants";

const loginField = withFormData.createField(
    'login',
    ({value, onChange, errorMessage}, {login}) => (
        <Field title="Логин" error={errorMessage} value={value}>
            <Input type='text' value={login}
                   error={!!errorMessage}
                   width='500px'
                   disabled={true}
                   maxLength={20}
                   dataId="field-login"/>
        </Field>
    ),
    () => {
    }
);

const passwordField = withFormData.createField(
    'password',
    ({value, onChange, errorMessage}) => (
        <Field title="Пароль" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage}
                   width='500px'
                   maxLength={20}
                   dataId="field-password"/>
        </Field>
    ),
    ({validator}) => ([validator.required("Поле 'Пароль' обязательно для заполнения")])
);

const firstNameField = withFormData.createField(
    'firstName',
    ({value, onChange, errorMessage}) => (
        <Field title="Имя" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage}
                   width='500px'
                   maxLength={150}
                   dataId="field-firstName"/>
        </Field>
    ),
    ({validator}) => ([validator.required("Поле 'Имя' обязательно для заполнения"),
        validator.regexp("Поле 'Имя' должно содержать только символы кириллицы, пробелы и \"-\"", masks.regexpOnlyCyrillicHyphenSpace)])
);

const secondNameField = withFormData.createField(
    'secondName',
    ({value, onChange, errorMessage}) => (
        <Field title="Фамилия" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage}
                   width='500px'
                   maxLength={150}
                   dataId="field-secondName"/>
        </Field>
    ),
    ({validator}) => ([validator.required("Поле 'Фамилия' обязательно для заполнения"),
        validator.regexp("Поле 'Фамилия' должно содержать только символы кириллицы, пробелы и \"-\"", masks.regexpOnlyCyrillicHyphenSpace)])
);

const middleNameField = withFormData.createField(
    'middleName',
    ({value, onChange, errorMessage}) => (
        <Field title="Отчество" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage}
                   width='500px'
                   maxLength={150}
                   dataId="field-middleName"/>
        </Field>
    ),
    ({validator}) => ([validator.required("Поле 'Отчество' обязательно для заполнения"),
        validator.regexp("Поле 'Отчество' должно содержать только символы кириллицы, пробелы и \"-\"", masks.regexpOnlyCyrillicHyphenSpace)])
);

const mobilePhoneField = withFormData.createField(
    'mobilePhone',
    ({value, onChange, errorMessage}) => (
        <Field title="Телефон" error={errorMessage} value={value}>
            <Input type='text' value={value}
                   onChange={v => {
                       onChange(numberFormat(v))
                   }}
                   error={!!errorMessage}
                   mask={Input.getMobilePhoneMask()}
                   width='500px'
                   dataId="field-mobilePhone"/>
        </Field>
    ),
    ({validator}) => ([validator.required("Поле 'Телефон' обязательно для заполнения"),
        validator.regexp("Поле 'Телефон' должно содержать номер телефона в формате +7 (999) 999 99-99", masks.regexpMobilePhone)])
);

const emailField = withFormData.createField(
    'email',
    ({value, onChange, errorMessage}) => (
        <Field title="E-mail" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage}
                   width='500px'
                   maxLength={255}
                   dataId="field-email"/>
        </Field>
    ),
    ({validator}) => ([validator.regexp("Поле 'E-mail' имеет неверный формат", masks.regexpEmail)])
);

const positionField = withFormData.createField(
    'position',
    ({value, onChange, errorMessage}) => (
        <Field title="Должность" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage}
                   width='500px'
                   maxLength={50}
                   dataId="field-position"/>
        </Field>
    ),
    ({validator}) => ([validator.regexp("Поле 'Должность' должно содержать только символы кириллицы, пробелы и \"-\"", masks.regexpOnlyCyrillicHyphenSpace)])
);

const personnelNumberField = withFormData.createField(
    'personnelNumber',
    ({value, onChange, errorMessage}, {setValue}) => (
        <Field title="Табельный номер" error={errorMessage} value={value}>
            <Input type='text' value={value}
                   error={!!errorMessage}
                   width='500px'
                   mask={Input.getNumberMask({
                       integerLimit: 15,
                       decimalLimit: 0,
                       showThousandsSeparatorSymbol: false
                   })}
                   onChange={v => {
                       onChange(v);
                       setValue(v);
                   }}
                   dataId="field-personnelNumber"/>
        </Field>
    ),
    ({validator}) => ([validator.required("Поле 'Табельный номер' обязательно для заполнения")])
);

const rolesField = withFormData.createField(
    'roles',
    ({value, onChange, errorMessage}, {options}) => (
        <Field title="Роль" error={errorMessage}>
            <Select options={options} value={value} onChange={onChange} dataId={`field-name-roles`}
                    error={!!errorMessage} width='500px'/>
        </Field>
    ), ({validator}) => ([validator.required("Поле 'Роль' обязательно для заполнения")])
);

const branchField = withFormData.createField(
    'branch',
    ({value, onChange, errorMessage}, {options, setValue}) => (
        <Field title="РФ" error={errorMessage}>
            <Select options={options} value={value}
                    onChange={v => {
                        onChange(v);
                        setValue(v);
                    }}
                    dataId={`field-name-branch`}
                    error={!!errorMessage} width='500px'/>
        </Field>
    ), ({validator}) => ([validator.required("Поле 'РФ' обязательно для заполнения")])
);

const officeField = withFormData.createField(
    'orgUnitId',
    ({value, onChange, errorMessage}, {options, changeBranch, setValue}) => (
        <Field title="ВСП" error={errorMessage}>
            <Select options={options} value={changeBranch && value}
                    onChange={v => {
                        onChange(v);
                        setValue(v);
                    }}
                    dataId={`field-name-office`}
                    error={!!errorMessage} width='500px'/>
        </Field>
    ), ({validator}) => ([validator.required("Поле 'ВСП' обязательно для заполнения")])
);

const segmentField = withFormData.createField(
    'segmentId',
    ({value, onChange, errorMessage}, {options}) => (
        <Field title="Сегмент" error={errorMessage}>
            <Select options={options} value={value} onChange={onChange} dataId={`field-name-segment`}
                    error={!!errorMessage} width='500px'/>
        </Field>
    ), ({validator}) => ([validator.required("Поле 'Сегмент' обязательно для заполнения")])
);

const validationForm = () => {
    const fields = [
        loginField,
        passwordField,
        firstNameField,
        secondNameField,
        middleNameField,
        mobilePhoneField,
        emailField,
        positionField,
        personnelNumberField,
        rolesField,
        branchField,
        officeField,
        segmentField
    ];

    return withFormData.createValidationForm(fields);
};

class CreateEmployeeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orgUnits: [],
            orgUnitsLoaded: false,
            roles: [],
            rolesLoaded: false,
            segments: [],
            segmentsLoaded: false
        };
        this.fetchOrgUnits = this.fetchOrgUnits.bind(this);
        this.fetchRoles = this.fetchRoles.bind(this);
        this.fetchSegments = this.fetchSegments.bind(this);
        this.prepareOptions = this.prepareOptions.bind(this);
    }

    componentDidMount = () => {
        this.fetchOrgUnits();
        this.fetchRoles();
        this.fetchSegments();
    };

    _handleCancel = () => {
        this.props.modal.close();
    };

    prepareForCreate = data => {
        return {
            login: data.personnelNumber,
            password: data.password,
            firstName: data.firstName,
            secondName: data.secondName,
            middleName: data.middleName,
            mobilePhone: data.mobilePhone,
            email: data.email || null,
            position: data.position,
            personnelNumber: data.personnelNumber,
            roles: [data.roles.id || data.roles],
            orgUnitId: +(data.orgUnitId.id || data.orgUnitId),
            segmentId: +(data.segmentId.id || data.segmentId),
        };
    };

    createEmployee = employeeData => {
        this.props.actions.createEmployee(this.prepareForCreate(employeeData))
            .then(() => this.props.modal.close('success', {name: employeeData.login}))
            .catch(e => {
                if (e.response && e.response.body && e.response.body.errors) {
                    let formErrors = e.response.body.errors.map(errorData => errorData.errorMessage);
                    this.setState({...this.state, formErrors});
                } else {
                    this.props.modals.alert({message: "Не удалось создать сотрудника"});
                    console.log(e);
                }
            });
    };

    fetchOrgUnits() {
        this.props.actions.getOrgUnits()
            .then(data => this.setState({...this.state, orgUnits: data.orgUnits, orgUnitsLoaded: true}));
    };

    fetchRoles() {
        return this.props.actions.getRolesList()
            .then(data => this.setState({...this.state, roles: data.roles, rolesLoaded: true}))
    };

    fetchSegments() {
        return this.props.actions.getSegmentsAction()
            .then(data => this.setState({...this.state, segments: data.segments, segmentsLoaded: true}))
    };

    prepareOptions() {
        let roles = this.state.rolesLoaded
            ? this.state.roles.map(role => {
                return {
                    id: role.id,
                    value: role.name,
                    label: role.desc
                }
            })
            : [];
        let branches = this.state.orgUnitsLoaded
            ? this.state.orgUnits.map(orgUnit => {
                return {
                    value: orgUnit.name,
                    label: orgUnit.name,
                    branchId: orgUnit.branchId,
                    offices: orgUnit.offices
                }
            })
            : [];
        let offices = this.state.employeeBranch
            ? this.state.employeeBranch.offices.map(office => {
                return {
                    id: office.officeId,
                    value: '' + office.name,
                    label: '' + office.name
                }
            })
            : [];
        let segments = this.state.segmentsLoaded
            ? this.state.segments.map(segment => {
                return {
                    id: segment.id,
                    value: segment.name,
                    label: segment.name
                }
            })
            : [];
        return {roles, branches, offices, segments};
    }

    getButtons = () => {
        const {validate} = this.props.formData;
        return [
            <Button key="save"
                    name="Сохранить"
                    dataId="button-save"
                    onClick={() => {
                        this.setState({...this.state, formErrors: []});
                        return validate(validationForm(), this.createEmployee, data => {
                        })();
                    }}/>,
            <Button key="cancel"
                    dataId="button-cancel"
                    name="Отмена"
                    onClick={this._handleCancel}
                    type={Button.buttonTypes.secondary}
            />,
        ];
    };

    render = () => {
        let {roles, branches, offices, segments} = this.prepareOptions();
        const {renderField} = this.props.formData;
        return (
            <modal.window title="Создание пользователя Организации" buttons={this.getButtons()}>
                <Form dataId="create-employee-form" errors={this.state.formErrors}>
                    {renderField(secondNameField)}
                    {renderField(firstNameField)}
                    {renderField(middleNameField)}
                    {renderField(personnelNumberField, {
                        setValue: (value) => {
                            this.setState({employeePersonnelNumber: value})
                        }
                    })}
                    {renderField(loginField, {login: this.state.employeePersonnelNumber})}
                    {renderField(passwordField)}
                    {renderField(mobilePhoneField)}
                    {renderField(emailField)}
                    {renderField(positionField)}
                    {renderField(rolesField, {options: roles})}
                    {renderField(branchField, {
                        options: branches, setValue: (value) => {
                            this.setState({employeeBranch: value, employeeOffice: ''})
                        }
                    })}
                    {renderField(officeField, {
                        options: offices, changeBranch: this.state.employeeOffice, setValue: (value) => {
                            this.setState({employeeOffice: value})
                        }
                    })}
                    {renderField(segmentField, {options: segments})}
                </Form>
            </modal.window>
        );
    }
}

export default compose(
    modal(true),
    withActions({
        createEmployee: CreateEmployeeAction.name,
        getOrgUnits: GetOrgUnitsAction.name,
        getRolesList: GetRolesListAction.name,
        getSegmentsAction: GetSegmentsAction.name
    }),
    withModals(),
    withFormData
)(CreateEmployeeComponent);