import React from 'react';
import {
    compose,
    layouts,
    withAuthContext,
    withFormData,
    withModals,
    withPageRouter,
    withActions
} from '@efr/medservice-web-presentation-core'
import {Button, Form, Input} from '@efr/medservice-web-presentation-ui';
import './login.css'
import Select from "@efr/medservice-web-presentation-ui/src/select/index";
import {
    CheckMotivationAction
} from "../../../actions";

import { PopupKeys } from "../../modal";

const PasswordRequaried = 'Поле \'Пароль\' обязательно для заполнения.';

const LoginField = withFormData.createField(
    'login',
    ({value, onChange, errorMessage}, {highlighting}) => (
        <div className="auth-fields">
            <label className="auth-fields-label gray">Имя пользователя</label>
            <Input type='text' value={value} onChange={onChange} dataId="field-login"
                   error={!!errorMessage || highlighting}/>
        </div>
    ),
    ({validator}) => ([
        validator.required("Поле 'Login' обязательно для заполнения."),
        // validator.regexp("Поле 'Login' должно состоять из цифр и латинских букв", /^[a-zA-Z0-9]+$/)
    ])
);

const PasswordField = withFormData.createField(
    'passwd',
    ({value, onChange, errorMessage}, {highlighting}) => (
        <div className="auth-fields">
            <label className="auth-fields-label gray">Пароль</label>
            <Input type='password' value={value} onChange={onChange} dataId="field-password"
                   error={!!errorMessage || highlighting}/>
        </div>
    ),
    ({validator}) => ([
        validator.required(PasswordRequaried)
    ])
);

const OldPasswordField = withFormData.createField(
    'oldPassword',
    ({value, onChange, errorMessage}, fieldParams) => (
        <div className="auth-fields">
            <label className="auth-fields-label uppercase gray">Старый пароль</label>
            <Input type='password' value={value} onChange={onChange} dataId="field-old-password"
                   error={!!errorMessage || fieldParams}/>
        </div>
    ),
    ({validator}) => ([
        validator((success, error) => value => {
            if (!value) {
                errors = [];
                passwordEquals = undefined;
                return error(PasswordRequaried)
            }
            return success(value)
        })
    ])
);

const NewPasswordField = withFormData.createField(
    'newPassword',
    ({value, onChange, errorMessage}, fieldParams) => (
        <div className="auth-fields">
            <label className="auth-fields-label uppercase gray">Новый пароль</label>
            <Input type='password' value={value} onChange={onChange} dataId="field-new-password"
                   error={!!errorMessage || fieldParams}/>
        </div>
    ),
    ({validator}) => ([
        validator((success, error) => value => {
            if (!value) {
                errors = [];
                passwordEquals = undefined;
                return error(PasswordRequaried)
            }
            return success(value)
        })
    ])
);

const NewPasswordField2 = withFormData.createField(
    'newPassword2',
    ({value, onChange, errorMessage}, fieldParams) => (
        <div className="auth-fields">
            <label className="auth-fields-label uppercase gray">Повторите новый пароль</label>
            <Input type='password' value={value} onChange={onChange} dataId="field-new-password-2"
                   error={!!errorMessage || fieldParams}/>
        </div>
    ),
    ({validator}) => ([
        validator((success, error) => value => {
            if (!value) {
                errors = [];
                passwordEquals = undefined;
                return error(PasswordRequaried)
            }
            return success(value)
        })
    ])
);

const SelectBranchField = withFormData.createField('office',
    ({value, onChange, errorMessage}, {options}) => (
        <div className="auth-fields select-office">
            <label className="auth-fields-label uppercase gray">Выберете офис для работы</label>
            <Select options={options} value={value} onChange={onChange} dataId={`field-select-office`}
                    error={!!errorMessage}/>
        </div>
    ), ({validator}) => ([validator.required("Поле 'Офисс' обязательно для заполнения"),]));


const validationLoginForm = () => {
    const fields = [
        LoginField, PasswordField
    ];
    return withFormData.createValidationForm(fields);
};

const validationChangePasswordForm = () => {
    let fields = [
        OldPasswordField, NewPasswordField, NewPasswordField2
    ];
    return withFormData.createValidationForm(fields);
};

const validationSetOfficeForm = () => {
    let fields = [
        SelectBranchField
    ];
    return withFormData.createValidationForm(fields);
};

const get400ErrorMessage = error => {
    const {response = {}} = error || {};
    const {body = {}} = response || {};
    if (body.errors != null) {
        let errorMessages = body.errors.map(error => <li>{error.errorMessage}</li>);
        return <div>
            <ul>{errorMessages}</ul>
        </div>;
    } else {
        return 'Операция временно недоступна'
    }
};

const get406ErrorMessage = error => {
    const {response = {}} = error || {};
    const {body = {}} = response || {};
    switch (body.type) {
        case 'BLOCKED':
            return 'Пользователь заблокирован';
        case 'OFFICE_NOT_FOUND':
            return 'Не удалось сопоставить подразделение пользователя';
        case 'ROLE_NOT_FOUND':
            return 'Не удалось сопоставить группы доступа пользователя';
        case 'EMPTY_ROLE':
            return 'Для пользователя не определены роли';
        default:
            return "Неизвестная ошибка";
    }
};

const processError = error => {
    switch (error.status) {
        case 400:
            return {message: get400ErrorMessage(error), highlighting: true}
        case 401:
            return {message: "Неверные данные пользователя", highlighting: true};
        case 406:
            return {message: get406ErrorMessage(error), highlighting: false};
        default:
            return {message: "Операция временно недоступна", highlighting: false};
    }
};

const getErrors = (data) => {
    errors = [];
    if (data.newPassword !== data.newPassword2) {
        errors = ['Новые пароли не совпадают'];
        passwordEquals = false;
    } else if (data.oldPassword === data.newPassword) {
        errors = ['Новый пароль совпадает со старым'];
        passwordEquals = true;
    } else {
        passwordEquals = undefined;
    }
    return errors;
};

let passwordEquals = undefined;
let errors = [];
let login;
let password;

class LoginComponent extends React.Component {
    state = {};

    constructor(props) {
        super(props);
        setTimeout(function () {
            window.addEventListener("popstate", function (e) {
                if (window.location.href.indexOf('/efr/login') > -1) {
                    window.location.href = window.location.origin
                }
            }, false);
        }, 100)
    }

    componentDidMount() {
        Object.keys(sessionStorage).forEach(field => {
            sessionStorage.setItem(field, undefined);
        });
    }

    handleLogin = data => {
        login = this.props.formData.rawValues.login;
        this.props.authContext.login(data)
            .then((response) => {
                setTimeout(function () {
                    document.getElementsByTagName('input')[0].value = ''
                }, 300);
                password = !response.user.office && this.props.formData.rawValues.passwd;
                if (response.user.office && !response.changePassword) {
                    this.checkMotivationProgram()
                }
                this.props.pageRouter.openIndex();
            })
            .catch(error => {
                const {message, highlighting} = processError(error);
                this.props.modals.alert({message});
                this.setState({highlighting});
            })
    };

    handleChangePassword = data => {
        data.login = login;
        if (getErrors(data).length === 0) {
            password = this.props.formData.rawValues.newPassword;
            this.props.formData.init({
                ...data,
                [OldPasswordField.name]: undefined,
                [NewPasswordField.name]: undefined,
                [NewPasswordField2.name]: undefined
            });
            this.props.authContext.changePassword(data)
                .then((response) => {
                    password = !response.user.office && password;
                    if (response.user.office) {
                        this.checkMotivationProgram()
                    }
                    this.props.pageRouter.openIndex();
                })
                .catch(error => {
                    const {message, highlighting} = processError(error);
                    this.props.modals.alert({message});
                    this.setState({highlighting});
                });
        }
    };

    handleSelectOffice = (data) => {
        this.props.authContext.login({login: login, passwd: password, officeId: data.office.office})
            .then(() => {
                password = undefined;
                this.checkMotivationProgram();
                this.props.pageRouter.openIndex();
            })
            .catch((error) => {
                const {message, highlighting} = processError(error);
                this.props.modals.alert({message});
                this.setState({highlighting});
            });
    };

    prepareOfficeSelect = () => {
        let offices = this.props.authContext && this.props.authContext.userData && this.props.authContext.userData.offices;
        return !!offices ? offices.map(item => {
            return {label: item.officeName, value: '' + item.officeId, office: item.officeId}
        }) : [];
    };

    checkMotivationProgram = () => {
        this.props.actions.checkMotivation()
            .then(res => {
                if (!res) {
                    this.props.modals.motivationAuth()
                }
            })
            .catch(() => this.props.pageRouter.openIndex())
    }

    render = () => {
        const changePassword = this.props.authContext && this.props.authContext.userData &&
            this.props.authContext.userData.changePassword;
        const selectOffice = this.props.authContext && this.props.authContext.userData &&
            !this.props.authContext.userData.office;
        let options = selectOffice ? this.prepareOfficeSelect() : [];

        const {validate, renderField} = this.props.formData;
        const BUTTONS = [
            <Button key="login"
                    name="Войти"
                    dataId="button-save"
                    onClick={validate(validationLoginForm(), this.handleLogin, data => {
                    })}
            />
        ];
        const BUTTONS_CANGE_PASSWORD = [
            <Button key="change"
                    name="Сохранить"
                    dataId="button-change"
                    onClick={validate(validationChangePasswordForm(), this.handleChangePassword, data => {
                    })}
            />
        ];
        const BUTTONS_SELECT_OFFICE = [
            <Button key="select-office"
                    name="Войти"
                    dataId="button-office"
                    onClick={validate(validationSetOfficeForm(), this.handleSelectOffice, data => {
                    })}
            />
        ];

        const fieldParams = {
            highlighting: this.state.highlighting,
        };

        return (
            <div className="full-height">
                <div className="login-layout">
                    <div className="logo-wrapper">
                        <div className="login-logo"/>
                    </div>
                    <div className="responsive-image">
                        <div className="login-area">
                            <div className={"white-string"}>Вход в систему</div>
                            <div className="form-login">
                                <div className="login-layout-fields">
                                    {!changePassword && !password && <Form buttons={BUTTONS} dataId="login-form">
                                        {renderField(LoginField, fieldParams)}
                                        {renderField(PasswordField, fieldParams)}
                                    </Form>
                                    }
                                    {changePassword && <div id={'changePassword'}>
                                        <Form buttons={BUTTONS_CANGE_PASSWORD}
                                              errors={errors}
                                              dataId="change-password-form">
                                            {renderField(OldPasswordField, passwordEquals === true)}
                                            {renderField(NewPasswordField, passwordEquals !== undefined)}
                                            {renderField(NewPasswordField2, passwordEquals === false)}
                                        </Form></div>}
                                    {!changePassword && selectOffice && !!password && <div>
                                        <Form buttons={BUTTONS_SELECT_OFFICE}
                                              dataId="change-password-form">
                                            {renderField(SelectBranchField, {options: options})}
                                        </Form></div>}
                                </div>
                            </div>
                        </div>
                            <div className="saveHealthString">Мы заботимся о <br/><b>Вашем здоровье</b></div>
                    </div>
                </div>
                <div className="footer login-layout-footer">
                    <div className="login-footer-content">
                        <div
                            className="copyright">&copy; СОЮЗМЕДСЕРВИС {(new Date().getFullYear() === 2018) ? 2018 : "2018-" + new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    layouts.EMPTY,
    withFormData,
    withModals({
        motivationAuth: PopupKeys.MOTIVATION_AUTH_KEY
    }),
    withPageRouter,
    withAuthContext,
    withActions({
        checkMotivation: CheckMotivationAction.name
    })
)(LoginComponent)