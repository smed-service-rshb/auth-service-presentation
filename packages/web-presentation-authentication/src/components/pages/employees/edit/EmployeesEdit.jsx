import React from 'react';

import {
    compose,
    PropTypes,
    withActions,
    withAuthContext,
    withFormData,
    withModals,
    withPageRouter
} from '@efr/medservice-web-presentation-core';
import {default as MotivationForm} from '../../motivation/MotivationAdmin'
import {Button, Field, Form, Input, Panel, Select, Tabs, Tab} from '@efr/medservice-web-presentation-ui';
import permissions from '../../../../permissions'
import {
    CreateEmployeeAction,
    GetEmployeeAction,
    GetOrgUnitsAction,
    GetRolesListAction,
    GetSegmentsAction,
    LockEmployeeAction,
    ResetPasswordAction,
    SaveEmployeeAction,
    UnlockEmployeeAction,
    GetStrategiesGroupsListAction
} from "../../../../actions/index";
import {EMPLOYEES_LIST_PAGE_KEY} from '../../page-keys'
import {PopupKeys} from "../../../modal/index";

import {masks} from '../../../constants.jsx';
import {resetClientPasswordAction} from "../../../../actions";
import {numberFormat} from "../../../constants";

let viewMode = true;

const fields = [
    {key: 'login', desc: 'Логин'},
    {key: 'password', desc: 'Пароль'},
    {key: 'secondName', desc: 'Фамилия'},
    {key: 'firstName', desc: 'Имя'},
    {key: 'middleName', desc: 'Отчество'},
    {key: 'mobilePhone', desc: 'Номер мобильного телефона'},
    {key: 'innerPhone', desc: 'Внутренний телефон'},
    {key: 'email', desc: 'E-mail'},
    {key: 'position', desc: 'Должность'},
    {key: 'personnelNumber', desc: 'Табельный номер'},
    {key: 'roles', desc: 'Роль'},
    {key: 'orgUnits', desc: 'ВСП'},
    {key: 'segmentId', desc: 'Сегмент'},
    {key: 'groupIds', desc: 'Группы'}
];

const CLIENT_ROLE = 'Клиент, полный доступ';
let CLIENT_ROLE_ID;

let login;

const loginField = withFormData.createField(
    'login',
    ({value, onChange, errorMessage}, {login}) => (
        <Field title="Логин" error={errorMessage} value={value}>
            <Input type='text'
                   value={login || value}
                   onChange={onChange}
                   error={!!errorMessage}
                   disabled={true}
                   width='500px'
                   dataId="field-login"/>
        </Field>
    ),
    ({validator}) => {
        return [validator((success, error) => value => {
            if (login === undefined || login.length === 0) {
                return error("Поле 'Логин' обязательно для заполнения");
            }
            return success(login)
        })];
    }
);

const passwordField = withFormData.createField(
    'password',
    ({value, onChange, errorMessage}) => (
        <Field title="Пароль" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage} disabled={viewMode}
                   width='500px'
                   dataId="field-password"/>
        </Field>
    ),
    () => {
    }
);

const firstNameField = withFormData.createField(
    'firstName',
    ({value, onChange, errorMessage}) => (
        <Field title="Имя" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage} disabled={viewMode}
                   width='500px'
                   dataId="field-firstName"/>
        </Field>
    ),
    ({validator}) => (viewMode ? [] : [validator.required("Поле 'Имя' обязательно для заполнения"),
        validator.regexp("Поле 'Имя' должно содержать только символы кириллицы, пробелы и \"-\"", masks.regexpOnlyCyrillicHyphenSpace)])
);

const secondNameField = withFormData.createField(
    'secondName',
    ({value, onChange, errorMessage}) => (
        <Field title="Фамилия" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage} disabled={viewMode}
                   width='500px'
                   dataId="field-secondName"/>
        </Field>
    ),
    ({validator}) => (viewMode ? [] : [validator.required("Поле 'Фамилия' обязательно для заполнения"),
        validator.regexp("Поле 'Фамилия' должно содержать только символы кириллицы, пробелы и \"-\"", masks.regexpOnlyCyrillicHyphenSpace)])
);

const middleNameField = withFormData.createField(
    'middleName',
    ({value, onChange, errorMessage}) => (
        <Field title="Отчество" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage} disabled={viewMode}
                   width='500px'
                   dataId="field-middleName"/>
        </Field>
    ),
    ({validator}) => (viewMode ? [] : [
        validator.regexp("Поле 'Отчество' должно содержать только символы кириллицы, пробелы и \"-\"", masks.regexpOnlyCyrillicHyphenSpace)])
);

const mobilePhoneField = withFormData.createField(
    'mobilePhone',
    ({value, onChange, errorMessage}) => (
        <Field title="Номер мобильного телефона" error={errorMessage} value={value}>
            <Input type='text' value={value}
                   onChange={v => {
                       onChange(numberFormat(v));
                   }}
                   error={!!errorMessage} disabled={viewMode}
                   mask={Input.getMobilePhoneMask()}
                   width='500px'
                   dataId="field-mobilePhone"/>
        </Field>
    ),
    ({validator}) => (viewMode ? [] : [
        validator.regexp("Поле 'Номер мобильного телефона' должно содержать номер телефона в формате +7 (999) 999 99-99", masks.regexpMobilePhone)])
);

const innerPhoneField = withFormData.createField(
    'innerPhone',
    ({value, onChange, errorMessage}, {setValue}) => (
        <Field title="Внутренний телефон" error={errorMessage} value={value}>
            <Input type='text'
                   value={value}
                   mask={(value) => {
                       let mask = [/\d/];
                       for (let i = 1; i < value.length && i < 20; i++) mask.push(/\d/);
                       return mask;
                   }}
                   placeholder={' '}
                   onChange={onChange}
                   error={!!errorMessage}
                   disabled={viewMode}
                   width='500px'
                   dataId="field-innerPhone"/>
        </Field>
    )
);

const emailField = withFormData.createField(
    'email',
    ({value, onChange, errorMessage}) => (
        <Field title="E-mail" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage} disabled={viewMode}
                   width='500px'
                   dataId="field-email"/>
        </Field>
    ),
    ({validator}) => (viewMode ? [] : [validator.regexp("Поле 'E-mail' имеет неверный формат", masks.regexpEmail)])
);

const positionField = withFormData.createField(
    'position',
    ({value, onChange, errorMessage}) => (
        <Field title="Должность" error={errorMessage} value={value}>
            <Input type='text'
                   value={value}
                   onChange={onChange}
                   error={!!errorMessage} disabled={viewMode}
                   width='500px'
                   maxLength={50}
                   dataId="field-position"/>
        </Field>
    ),
    ({validator}) => (viewMode ? [] : [validator.regexp("Поле 'Должность' должно содержать только символы кириллицы, пробелы и \"-\"", masks.regexpOnlyCyrillicHyphenSpace)])
);

const personnelNumberField = withFormData.createField(
    'personnelNumber',
    ({value, onChange, errorMessage}, {setValue}) => (
        <Field title="Табельный номер" error={errorMessage} value={value}>
            <Input type='text'
                   value={value}
                   mask={(value) => {
                       let mask = [/\d/];
                       for (let i = 1; i < value.length && i < 15; i++) mask.push(/\d/);
                       return mask;
                   }}
                   placeholder={' '}
                   onChange={v => {
                       onChange(v);
                       setValue(v);
                   }}
                   error={!!errorMessage}
                   disabled={viewMode}
                   width='500px'
                   dataId="field-personnelNumber"/>
        </Field>
    ),
    ({validator}) => (viewMode ? [] : [validator.required("Поле 'Табельный номер' обязательно для заполнения"),])
);

const rolesField = withFormData.createField(
    'roles',
    ({value, onChange, errorMessage}, {options}) => (
        <Field title="Роль" error={errorMessage}>
            <Select options={options} value={value} onChange={onChange} dataId={`field-name-roles`}
                    disabled={viewMode} error={!!errorMessage} width='500px'/>
        </Field>
    ), ({validator}) => (viewMode ? [] : [validator.required("Поле 'Роль' обязательно для заполнения"),])
);

const branchField = withFormData.createField(
    'branches',
    ({value, onChange, errorMessage}, {setValue, handleSelectBranch}) => (
        <Field title="РФ" error={errorMessage}>
            <div onClick={!viewMode ? handleSelectBranch : undefined}
                 onFocus={!viewMode ? handleSelectBranch : undefined}>
                <Input type='text'
                       value={value}
                       disabled={viewMode}
                       width='500px'
                       dataId="field-branch"/>
            </div>
        </Field>
    ), ({validator}) => (viewMode ? [] : [validator.required("Поле 'РФ' обязательно для заполнения"),])
);

const officeField = withFormData.createField(
    'orgUnits',
    ({value, onChange, errorMessage}, {changeBranch, setValue, handleSelectBranch}) => (
        <Field title="ВСП" error={errorMessage}>
            <div onClick={!viewMode ? handleSelectBranch : undefined}
                 onFocus={!viewMode ? handleSelectBranch : undefined}>
                <Input type='text'
                       value={value}
                       disabled={viewMode}
                       width='500px'
                       dataId="field-name-office"/>
            </div>
        </Field>
    ), ({validator}) => (viewMode ? [] : [validator.required("Поле 'ВСП' обязательно для заполнения"),])
);

const segmentField = withFormData.createField(
    'segmentId',
    ({value, onChange, errorMessage}, {options}) => (
        <Field title="Сегмент" error={errorMessage}>
            <Select options={options} value={value} onChange={onChange} dataId={`field-name-segment`}
                    disabled={viewMode} error={!!errorMessage} width='500px'/>
        </Field>
    ), ({validator}) => (viewMode ? [] : [validator.required("Поле 'Сегмент' обязательно для заполнения"),])
);

const groupField = withFormData.createField(
    'groupIds',
    ({value, onChange, errorMessage}, {changeBranch, setValue, handleSelectGroup}) => (
        <Field title="Группы" error={errorMessage}>
            <div onClick={!viewMode ? handleSelectGroup : undefined}
                 onFocus={!viewMode ? handleSelectGroup : undefined}>
                <Input type='text'
                       value={value}
                       disabled={viewMode}
                       width='500px'
                       dataId="field-name-group"/>
            </div>
        </Field>
    ), ({validator}) => (viewMode ? [] : [/*validator.required("Поле 'Группы' обязательно для заполнения"),*/])
);

const get400ErrorMessage = error => {
    const {response = {}} = error || {};
    const {body = {}} = response || {};
    if (body.errors != null) {
        return body.errors[0];
    } else {
        return 'Операция временно недоступна'
    }
};

const validationForm = () => {
    const fields = [
        loginField,
        passwordField,
        firstNameField,
        secondNameField,
        middleNameField,
        mobilePhoneField,
        innerPhoneField,
        emailField,
        positionField,
        personnelNumberField,
        rolesField,
        branchField,
        officeField,
        segmentField,
        groupField
    ];

    return withFormData.createValidationForm(fields);
};

export const groupsColumn = [
    {key: 'id', name: 'ID'},
    {key: 'name', name: 'Наименование'},
    {key: 'code', name: 'Код группы'},
];

class EmployeesEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {viewMode: true};
        this.fetchOrgUnits = this.fetchOrgUnits.bind(this);
        this.loadGroups = this.loadGroups.bind(this);
        this.fetchRoles = this.fetchRoles.bind(this);
        this.fetchSegments = this.fetchSegments.bind(this);
        this.prepareOptions = this.prepareOptions.bind(this);
    }

    componentDidMount = () => {
        login = undefined;
        const {getEmployee} = this.props.actions;
        viewMode = !!this.props.id;
        this.fetchRoles();
        this.loadGroups();
        this.fetchSegments();
        this.fetchOrgUnits().then(() => {
            !!this.props.id && getEmployee(this.props.id)
                .then(employee => {
                    let selected = [];
                    let currentBranch = this.state.orgUnits
                        .filter(e => e.offices
                            .find(e => employee.orgUnits.indexOf(e.officeId) >= 0) !== undefined
                        ).map(e => e.name);
                    this.state.orgUnits.filter(e => (employee.orgUnits.indexOf(e.branchId) >= 0)
                        && currentBranch.indexOf(e.name) === -1).forEach(e => currentBranch.push(e.name));
                    let find = (currentBranch !== undefined && currentBranch.length > 0);
                    let currentOffice = [];
                    let currentGroups = [];
                    this.loadGroups().then(() => {
                        this.state.groups.filter(o => employee.groupIds.indexOf(o.id) >= 0)
                            .forEach(o => {
                                currentGroups.push(o.name)
                            });
                        this.props.formData.init({
                            ...this.props.formData.rawValues,
                            [groupField.name]: currentGroups
                        });
                        this.setState({
                            ...this.state,
                            relatedGroups: employee.groupIds,
                            oldValueFields: {
                                ...this.state.oldValueFields,
                                groupIds: employee.groupIds
                            }
                        })
                    });
                    this.state.orgUnits
                        .map(branch =>
                            branch.offices
                                .filter(o => employee.orgUnits.indexOf(o.officeId) >= 0)
                                .forEach(o => {
                                    currentOffice.push(o.name);
                                    selected.push({
                                        branchId: branch.branchId,
                                        branch: branch.name, city: o.city, officeId: o.officeId, office: o.name
                                    })
                                }));
                    this.setState({
                        employee,
                        branchGridData: selected,
                        employeeOffice: employee.orgUnitId,
                        employeeBranch: find && currentBranch,
                        oldValueFields: {
                            login: employee.login,
                            firstName: employee.firstName,
                            secondName: employee.secondName,
                            middleName: employee.middleName,
                            mobilePhone: employee.mobilePhone,
                            innerPhone: employee.innerPhone,
                            email: employee.email,
                            position: employee.position,
                            personnelNumber: employee.personnelNumber,
                            roles: employee.roles[0],
                            orgUnits: employee.orgUnits,
                            segmentId: employee.segmentId
                        }
                    });
                    this.props.formData.init({
                        [loginField.name]: employee.login,
                        [firstNameField.name]: employee.firstName,
                        [secondNameField.name]: employee.secondName,
                        [middleNameField.name]: employee.middleName,
                        [mobilePhoneField.name]: employee.mobilePhone,
                        [innerPhoneField.name]: employee.innerPhone,
                        [emailField.name]: employee.email,
                        [positionField.name]: employee.position,
                        [personnelNumberField.name]: employee.personnelNumber,
                        [rolesField.name]: employee.roles[0],
                        [branchField.name]: currentBranch,
                        [officeField.name]: currentOffice,
                        [segmentField.name]: employee.segmentId
                    });
                })
                .catch(() => {
                    this.props.modals.alert({message: 'Ошибка получения данных сотрудника'});
                });
        }).catch(() => {
            this.props.modals.alert({message: 'Ошибка получения РФ'});
        });
    };

    loadGroups = () => {
        return this.props.actions.getStrategiesGroups()
            .then(data => {
                this.setState({...this.state, groupsLoaded: true, groups: data.content});
                // if (this.state.groupsLoaded && this.state.relatedGroups) {
                //     this.translateRelatedGroups(this.state.relatedGroups);
                // }
            });
    };

    handleSelectBranch = () => {
        this.props.modals.branchSelect({selected: this.state.branchGridData}).on('success', (response) => {
            let branches = [];
            let offices = [];
            response.forEach(item => {
                branches.indexOf(item.branch) === -1 && (branches.push(item.branch));
                offices.push(item.office)
            });
            this.props.formData.init({
                ...this.props.formData.rawValues,
                [branchField.name]: branches,
                [officeField.name]: offices
            });
            this.setState({
                branchGridData: response
            })
        });
    };

    handleSelectGroup = () => {
        let resultData = this.state.groupsLoaded ? this.state.groups : [];
        let selectedResult = [];
        this.state.relatedGroups && resultData.forEach(resultItem => {
            this.state.relatedGroups.forEach(item => {
                if (item === resultItem.id) {
                    selectedResult.push({
                        ...resultItem
                    })
                }
            });
        });
        this.props.modals.modalGrid({
            data: resultData,
            title: "",
            columns: groupsColumn,
            selectedRow: selectedResult
        }).on('success', (response) => {
            let groupsName = [];
            let groupsCode = [];
            response.filter(item => item.id).forEach(item => {
                groupsName.push(item.name);
                groupsCode.push(item.id);
            });
            this.props.formData.init({
                ...this.props.formData.rawValues,
                [groupField.name]: groupsName
            });
            this.setState({
                relatedGroups: groupsCode
            })
        });
    };
    fetchOrgUnits = () => {
        return this.props.actions.getOrgUnits()
            .then(data => this.setState({...this.state, orgUnits: data.orgUnits, orgUnitsLoaded: true}));
    };

    fetchRoles() {
        return this.props.actions.getRolesList()
            .then(data => {
                CLIENT_ROLE_ID = (data.roles.filter(item => item.name === CLIENT_ROLE).map(item => item.id)[0] + '');
                this.setState({...this.state, roles: data.roles, rolesLoaded: true})
            })
    };

    fetchSegments() {
        return this.props.actions.getSegmentsAction()
            .then(data => this.setState({...this.state, segments: data.segments, segmentsLoaded: true}))
    };

    handleSave = () => {
        if (!!this.props.id) {
            const change = this.getChange();
            this.props.modals.confirmDiff({change}).on('success', this.save());
        } else {
            const {validate} = this.props.formData;
            this.setState({...this.state, formErrors: []});
            return validate(validationForm(), this.createEmployee, data => {
            })();
        }
    };

    handleResetPassword = () => {
        this.props.modals.confirm({
            title: 'Сбросить пароль сотрудника',
            message: 'Вы действительно хотите сбросить пароль сотрудника?',
        }).on('success', this.resetPassword)
    };

    handleLock = () => {
        if (this.state.employee.lockStatus) {
            this.props.modals.confirm({
                title: 'Разблокировка сотрудника',
                message: 'Вы действительно хотите разблокировать сотрудника?',
            }).on('success', this.unlockEmployee)
        } else {
            this.props.modals.confirm({
                title: 'Блокировка сотрудника',
                message: 'Вы действительно хотите заблокировать сотрудника?',
            }).on('success', this.lockEmployee)
        }
    };
    lockEmployee = () => {
        this.props.actions.lockEmployee(this.props.id)
            .then(() => {
                this.props.modals.alert({
                    title: "Операция прошла успешно",
                    message: "Пользователь заблокирован"
                }).on('success', () => this.props.pageRouter.open(EMPLOYEES_LIST_PAGE_KEY));
            })
            .catch(error => {
                this.props.modals.alert({message: "Ошибка блокировки сотрудника"});
            })
    };

    resetPassword = () => {
        this.props.actions.resetPassword(this.props.id)
            .then(() => {
                this.props.modals.alert({
                    title: "Операция прошла успешно",
                    message: "Пароль сброшен"
                }).on('success', () => this.props.pageRouter.open(EMPLOYEES_LIST_PAGE_KEY));
            })
            .catch(error => {
                this.props.modals.alert({message: "Ошибка сброса пароля сотрудника"});
            });
    };

    unlockEmployee = () => {
        this.props.actions.unlockEmployee(this.props.id)
            .then(() => {
                this.props.modals.alert({
                    title: "Операция прошла успешно",
                    message: "Пользователь разблокирован"
                }).on('success', () => this.props.pageRouter.open(EMPLOYEES_LIST_PAGE_KEY));
            })
            .catch(error => {
                this.props.modals.alert({message: "Ошибка блокировки сотрудника"});
            });
    };

    createEmployee = employeeData => {
        this.props.actions.createEmployee(this.prepareForUpdate(employeeData))
            .then(() => this.props.pageRouter.open(EMPLOYEES_LIST_PAGE_KEY))
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

    handleEdit = () => {
        viewMode = false;
        this.setState({viewMode: false})
    };

    prepareForUpdate = data => {
        let orgUnits = [];
        data.orgUnits && this.state.orgUnits
            .map(branch =>
                branch.offices
                    .filter(o => data.orgUnits.indexOf(o.name) >= 0)
                    .forEach(o => orgUnits.push(o.officeId)));

        return {
            login: data.personnelNumber,
            password: data.password,
            firstName: data.firstName,
            secondName: data.secondName,
            middleName: data.middleName,
            mobilePhone: data.mobilePhone,
            innerPhone: data.innerPhone,
            email: data.email || null,
            position: data.position,
            personnelNumber: data.personnelNumber,
            roles: [data.roles.id || data.roles],
            orgUnits: orgUnits,
            segmentId: data.segmentId.id || data.segmentId,
            groupIds: this.state.relatedGroups ? this.state.relatedGroups : []
        };
    };

    update = data => {
        this.props.actions.saveEmployee(this.props.id, this.prepareForUpdate(data))
            .then(() => this.props.pageRouter.open(EMPLOYEES_LIST_PAGE_KEY))
            .catch(e => {
                if (e.response && e.response.body && e.response.body.errors) {
                    let formErrors = e.response.body.errors.map(errorData => errorData.errorMessage);
                    this.setState({...this.state, formErrors});
                } else {
                    this.props.modals.alert({message: "Не удалось обновить сотрудника"});
                    console.log(e);
                }
            })
    };

    save = () => {
        this.setState({...this.state, formErrors: []});
        const {validate} = this.props.formData;
        return validate(validationForm(), this.update, data => {
        })
    };

    static getValueSelect(value) {
        return value && typeof value === 'object'
            ? value.label
            : value;
    }

    getChange = () => {
        let oldValueFields = this.state.oldValueFields;
        let newValueFields = this.props.formData.rawValues;

        let orgUnitOld = this.state.orgUnits
            .filter(e => e.offices
                .find(e => oldValueFields.orgUnits.indexOf(e.officeId) > -1) !== undefined);
        if (orgUnitOld.length > 0 && newValueFields.orgUnits.map) {
            let office = orgUnitOld.map(e => e.offices.filter(e => oldValueFields.orgUnits.indexOf(e.officeId) > -1));
            if (office.length > 0) {
                let orgUnits = "";
                office.map(o => o.forEach(of => orgUnits += of.name + ', '));
                oldValueFields.orgUnits = orgUnits.substring(0, orgUnits.length - 2);
            }
        }

        let groupsFullData = this.state.groupsLoaded && this.state.groups;
        if (this.state.oldValueFields.groupIds.length > 0 && newValueFields.groupIds.map) {
            let groups = groupsFullData.filter(e => oldValueFields.groupIds.indexOf(e.id) > -1);
            if (groups.length > 0) {
                let oldGroupResult = "";
                groups.map(item => oldGroupResult += item.name + ', ');
                oldValueFields.groupIds = oldGroupResult.substring(0, oldGroupResult.length - 2)
            }
        }

        let orgUnitNew = '';
        let groupIdsNew = '';
        newValueFields.orgUnits.map && newValueFields.orgUnits
            .map((o, index) => ((index !== (newValueFields.orgUnits.length - 1)) ? orgUnitNew += o + ', ' : orgUnitNew += o));
        newValueFields.orgUnits = orgUnitNew;

        newValueFields.groupIds && newValueFields.groupIds
            .map((o, index) => ((index !== (newValueFields.groupIds.length - 1)) ? groupIdsNew += o + ', ' : groupIdsNew += o));
        newValueFields.groupIds = groupIdsNew;

        let segmentOld = this.state.segments.filter(e => e.id === oldValueFields.segmentId);
        if (segmentOld.length > 0) {
            oldValueFields.segmentId = segmentOld[0].name;
        }

        let segmentNew = this.state.segments.filter(e => e.id === newValueFields.segmentId);
        if (segmentNew.length > 0) {
            newValueFields.segmentId = segmentNew[0].name;
        }

        newValueFields.mobilePhone = newValueFields.mobilePhone && newValueFields.mobilePhone.replace(/\D/g, '');
        oldValueFields.mobilePhone = oldValueFields.mobilePhone && oldValueFields.mobilePhone.replace(/\D/g, '');

        let diffFields = [];

        for (let i in fields) {
            let oldValue = EmployeesEdit.getValueSelect(oldValueFields[fields[i].key]);
            let newValue = EmployeesEdit.getValueSelect(newValueFields[fields[i].key]);
            if ((oldValue === undefined) || (oldValue === '')) {
                oldValue = null;
            }
            if ((newValue === undefined) || (newValue === '')) {
                newValue = null;
            }
            if (oldValue !== newValue) {
                diffFields.push({
                    fieldName: fields.filter(e => e.key === fields[i].key)[0].desc,
                    oldValue: oldValue,
                    newValue: newValue
                })
            }
        }
        return ({
            diffFields,
            oldValueFields,
            newValueFields,
            hasModify: diffFields.length > 0
        });
    };

    handleCancel = () => {
        if (this.props.id) {
            const change = this.getChange();
            change.hasModify && this.props.modals.confirm({
                title: 'Редактирование сотрудника',
                message: 'В сотрудника были внесены изменения, выйти без сохранения?',
            }).on('success', this.cancel);

            !change.hasModify && this.cancel();
        } else {
            this.cancel();
        }
    };

    cancel = () => {
        this.props.pageRouter.open(EMPLOYEES_LIST_PAGE_KEY);
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

        let segments = this.state.segmentsLoaded
            ? this.state.segments.map(segment => {
                return {
                    id: segment.id,
                    value: '' + segment.id,
                    label: segment.name
                }
            })
            : [];
        return {roles, segments};
    }

    getButtons(isClient) {
        let isAdmin = this.props.authContext.checkPermission(permissions.EDIT_USERS);
        let edit = <Button key="edit"
                           name="Изменить"
                           dataId="button-edit"
                           onClick={this.handleEdit}
        />;
        let lock = <Button key="lock"
                           name={this.state.employee && this.state.employee.lockStatus ? 'Разблокировать' : 'Заблокировать'}
                           dataId="button-unlock"
                           onClick={this.handleLock}
        />;
        let save = <Button key="save"
                           name="Сохранить"
                           dataId="button-save"
                           disabled={!this.props.authContext.checkPermission(permissions.EDIT_USERS)}
                           onClick={this.handleSave}
        />;
        let cancel = <Button key="cancel"
                             name="Отменить"
                             dataId="button-cancel"
                             onClick={this.handleCancel}
                             type={Button.buttonTypes.secondary}
        />;
        let resetPassword = <Button key="resetPassword"
                                    name="Сбросить пароль"
                                    dataId="button-reset-password"
                                    onClick={this.handleResetPassword}
        />;
        let resetClientPassword = <Button key="resetPassword"
                                          name="Отправить технический пароль"
                                          dataId="button-reset-password"
                                          onClick={this.confirmResetPassword}
        />;
        if (viewMode && isAdmin) {
            if (isClient) {
                return [edit, lock, cancel, resetClientPassword]
            } else {
                return [edit, lock, cancel, resetPassword];
            }
        } else if (isAdmin) {
            return [save, cancel];
        }
    }

    confirmResetPassword = () => {
        this.props.modals.confirm({message: "Вы действительно хотите установить технический пароль клиенту?"})
            .on('success', this.resetClientPassword)
    };

    resetClientPassword = () => {
        this.props.actions.resetClientPassword(this.props.id)
            .then(() => {
                this.props.modals.alert({message: 'Клиенту установлен технический пароль'})
            }).catch(error => this.props.modals.alert({message: get400ErrorMessage(error)})
        )
    };

    tabChangeState = (index) => {
        this.setState({
            selected: index
        })
    };

    render = () => {
        const Buttons = this.getButtons((this.props.formData.rawValues.roles + '') === CLIENT_ROLE_ID);
        const {renderField} = this.props.formData;
        let {roles, segments} = this.prepareOptions();

        return (
            <React.Fragment>
                {
                    this.props.authContext.checkPermission(permissions.EDIT_MOTIVATION) &&
                    <Tabs selected={this.state.selected} onChange={this.tabChangeState}>
                        <Tab
                            label={(this.state.employee || {}).desc || 'Данные пользователя'}
                            dataId="tab-client-data"
                        />
                        <Tab
                            label='Данные по программе "Мотивация"'
                            dataId="tab-motivation-data"
                        />
                    </Tabs>
                }
                {
                    (!this.state.selected || this.state.selected === 0) &&
                    <Panel label={!this.props.id ? "Создание пользователя Организации"
                        : viewMode ? 'Карточка пользователя' : 'Редактирование карточки пользователя'}
                           dataId="employee-edit-panel">
                        <Form buttons={Buttons} dataId="employee-edit-form" errors={this.state.formErrors}>
                            {renderField(secondNameField)}
                            {renderField(firstNameField)}
                            {renderField(middleNameField)}
                            {renderField(personnelNumberField, {
                                setValue: (value) => {
                                    login = value;
                                    this.setState({employeePersonnelNumber: value})
                                }
                            })}
                            {renderField(loginField, {login: this.state.employeePersonnelNumber})}
                            {renderField(passwordField)}
                            {renderField(emailField)}
                            {renderField(mobilePhoneField)}
                            {renderField(innerPhoneField)}
                            {renderField(positionField)}
                            {renderField(rolesField, {options: roles})}
                            {renderField(branchField, {
                                handleSelectBranch: this.handleSelectBranch
                            })}
                            {renderField(officeField, {
                                handleSelectBranch: this.handleSelectBranch
                            })}
                            {renderField(segmentField, {options: segments})}
                            {renderField(groupField, {
                                handleSelectGroup: this.handleSelectGroup
                            })}
                        </Form>
                        <div className="panel-label-secondary"/>
                    </Panel>
                }
                {
                    this.state.selected === 1 &&
                    <Panel dataId='motivation-edit'>
                        <MotivationForm id={this.props.id}/>
                    </Panel>
                }
            </React.Fragment>
        )
    };

    static propTypes = {
        id: PropTypes.number,
    };
}

export default compose(
    withPageRouter,
    withActions({
        createEmployee: CreateEmployeeAction.name,
        getEmployee: GetEmployeeAction.name,
        saveEmployee: SaveEmployeeAction.name,
        getOrgUnits: GetOrgUnitsAction.name,
        getRolesList: GetRolesListAction.name,
        getSegmentsAction: GetSegmentsAction.name,
        lockEmployee: LockEmployeeAction.name,
        unlockEmployee: UnlockEmployeeAction.name,
        resetPassword: ResetPasswordAction.name,
        resetClientPassword: resetClientPasswordAction.name,
        getStrategiesGroups: GetStrategiesGroupsListAction.name
    }),
    withModals({
        modalGrid: PopupKeys.GRID_POPUP_KEY,
        confirmDiff: PopupKeys.EMPLOYEES_DIFF_POPUP_KEY,
        branchSelect: PopupKeys.BRANCH_SEARCH_POPUP_KEY,
    }),
    withFormData,
    withAuthContext,
)(EmployeesEdit)