import React from 'react'
import {compose, withActions, withAuthContext, withFormData, withModals} from '@efr/medservice-web-presentation-core';
import {
    Button,
    Field,
    Form,
    Input,
    InputDatepicker,
    Panel,
    Select,
    Textarea
} from '@efr/medservice-web-presentation-ui';
import './motivation.css'
import {Motivation as motivationMessages} from "../../../Messages.json";
import {EditMotivationAdminAction, GetMotivationAdminAction} from "../../../actions";

let comment, infoCorrectStatus, consentStartActiveDate;

const correctStatusOptions = [
    {value: 'CORRECT', label: 'Данные корректны'},
    {value: 'INCORRECT', label: 'Данные некорректны'},
    {value: 'NOT_CHECKED', label: 'Данные не проверены'}
];

const AccountField = withFormData.createField(
    'accountField',
    ({value, onChange, errorMessage}, {viewMode}) => (
        <Field title="Номер зарплатного счета сотрудника" error={errorMessage} value={value}>
            <Input
                type="text"
                mask={value => {
                    let mask = [/\d/];
                    for (let i = 1; i < value.length && i < 20; i++) mask.push(/\d/);
                    return mask;
                }}
                value={value}
                onChange={onChange}
                dataId="field-account-number"
                disabled={viewMode}
                error={!!errorMessage}/>
        </Field>
    ),
    ({validator}) => [validator.required("Поле обязательно для заполнения")]
);

const BankBicField = withFormData.createField(
    'bankBic',
    ({value, onChange, errorMessage}, {viewMode}) => (
        <Field title="Бик банка" error={errorMessage} value={value}>
            <Input
                type='text'
                mask={(value) => {
                    let mask = [/\d/];
                    for (let i = 1; i < value.length && i < 9; i++) mask.push(/\d/);
                    return mask;
                }}
                value={value}
                onChange={onChange}
                error={!!errorMessage}
                disabled={viewMode}
                dataId="field-bank-bic"/>
        </Field>
    ),
    ({validator}) => [validator.required("Поле обязательно для заполнения")]
);
const BankNameField = withFormData.createField(
    'bankName',
    ({value, onChange, errorMessage}, {viewMode}) => (
        <Field title="Наименование филиала Банка" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage}
                   disabled={viewMode} dataId="field-bank-name"/>
        </Field>
    ),
    ({validator}) => [validator.required("Поле обязательно для заполнения")]
);
const InnField = withFormData.createField(
    'inn',
    ({value, onChange, errorMessage}, {viewMode}) => (
        <Field title="ИНН сотрудника" error={errorMessage} value={value}>
            <Input
                type='text'
                mask={(value) => {
                    let mask = [/\d/];
                    for (let i = 1; i < value.length && i < 12; i++) mask.push(/\d/);
                    return mask;
                }}
                value={value}
                onChange={onChange}
                error={!!errorMessage}
                disabled={viewMode}
                dataId="field-inn"/>
        </Field>
    ), ({validator}) => [
        validator((success, error) => value => {
            if (!!value && value.length < 12) {
                return error("Поле \"ИНН сотрудника\" должно состоять из 12 цифр")
            }
            return success(value)
        }), validator.required('Поле "ИНН сотрудника" должно быть заполнено')
    ]
);

const IndexField = withFormData.createField(
    'index',
    ({value, onChange, errorMessage}, {viewMode}) => (
        <Field title="Индекс" error={errorMessage} value={value}>
            <Input type='text'
                   mask={(value) => {
                       let mask = [/\d/];
                       for (let i = 1; i < value.length && i < 6; i++) mask.push(/\d/);
                       return mask;
                   }}
                   value={value}
                   onChange={onChange}
                   error={!!errorMessage}
                   disabled={viewMode}
                   dataId="field-index"/>
        </Field>
    ), ({validator}) => [
        validator((success, error) => value => {
            if (!!value && value.length < 6) {
                return error("Поле \"Индекс\" должно состоять из 6 цифр")
            }
            return success(value)
        }),
        validator.required('Поле "Индекс" должно быть заполнено')
    ]
);
const BankAddressField = withFormData.createField(
    'bankAddress',
    ({value, onChange, errorMessage}, {viewMode}) => (
        <Field title="Адрес регистрации" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage}
                   disabled={viewMode} dataId="field-bank-address"/>
        </Field>
    ), ({validator}) =>
        ([validator.required('Поле "Адрес регистрации" должно быть заполнено')])
);

const Comment = withFormData.createField(
    'Comment',
    ({value, onChange, errorMessage}, {setValue, viewMode}) => (
        <Field title="Комментарий от Страховой компании" error={errorMessage}>
            <Textarea
                error={!!errorMessage}
                disabled={viewMode}
                value={value}
                onChange={v => {
                    setValue(v)
                    onChange(v)
                }}
                dataId="field-incorrect-info-comment"/>
        </Field>
    ),
    ({validator}) => {
        return [validator((success, error) => value => {
            if (infoCorrectStatus === 'INCORRECT' && (!comment || comment.length === 0)) {
                return error('Введите комментарий при некорректных данных');
            }
            return success(comment)
        })];
    }
);
const providedInfoCorrectField = withFormData.createField(
    'isInfoCorrect',
    ({value, onChange}, {setValue, viewMode}) => (
        <Field title="Статус корректности предосталенных данных">
            <Select key="isCorrect"
                    options={correctStatusOptions}
                    value={value}
                    disabled={viewMode}
                    onChange={v => {
                        setValue(v.value)
                        onChange(v.value)
                    }}
                    dataId="field-is-info-correct"/>
        </Field>
    )
);

const attachedDocumentField = withFormData.createField(
    'loadDocument',
    ({value, onChange}, {loadDocument}) => (
        <React.Fragment>
            <Field title="Скан копия согласия">
                {!!value && !!value.consent ?
                    <Button key="loadDocument"
                            name={value.consent}
                            onClick={() => loadDocument('CHECK_FORM')}
                            disabled={false}
                            dataId="button-load-document"
                            type={Button.buttonTypes.secondary}/>
                    : <span>Не приложена</span>
                }
            </Field>
            <Field title="Скан копия паспорта">
                {!!value && !!value.passport ?
                    <Button key="loadPassport"
                            name={value.passport}
                            onClick={() => loadDocument('PASSPORT')}
                            disabled={false}
                            dataId="button-load-document"
                            type={Button.buttonTypes.secondary}/>
                    : <span>Не приложена</span>
                }
            </Field>
        </React.Fragment>

    )
);

const consentStartActiveDateField = withFormData.createField(
    'consentStartActiveDate',
    ({value, onChange}, {viewMode, setValue, date}) => (
        <Field title="Дата начала действия согласия на мотивацию">
            <InputDatepicker key="consentStartActiveDate"
                             value={date}
                             onChange={v => {
                                 setValue(v)
                             }}
                             disabled={viewMode}
                             dataId="date-consent-active"/>
        </Field>
    )
);

const validationForm = (state) => {
    const fields = [
        AccountField,
        BankBicField,
        BankNameField,
    ];
    if (!!state.motivationProgram.inn) {
        fields.push(InnField);
    }
    if (!!state.motivationProgram.index) {
        fields.push(IndexField);
        fields.push(BankAddressField);
    }
    if(state.infoCorrectStatus === 'INCORRECT'){
        fields.push(Comment);
    }
    return withFormData.createValidationForm(fields);
};

class MotivationAdminComponent extends React.Component {
    state = {
        viewMode: true,
        formErrors: []
    };

    componentDidMount() {
        this.props.preloader.show();

        this.props.actions.getMotivationAdmin(this.props.id)
            .then(motivationProgram => {
                this.props.preloader.hide();

                if (Object.keys(motivationProgram).length > 0) {

                    consentStartActiveDate = motivationProgram.startDate
                        ? new Date(motivationProgram.startDate).toLocaleDateString() : null;

                    comment = motivationProgram.comment;
                    infoCorrectStatus = motivationProgram.motivationCorrectStatus;

                    const documents = {
                        consent: motivationProgram.documentName,
                        passport: motivationProgram.passportName
                    };

                    this.props.formData.init({
                        [AccountField.name]: motivationProgram.accountNumber,
                        [BankBicField.name]: motivationProgram.bikCode,
                        [BankNameField.name]: motivationProgram.bankName,
                        [InnField.name]: motivationProgram.inn,
                        [IndexField.name]: motivationProgram.index,
                        [BankAddressField.name]: motivationProgram.registrationAddress,
                        [Comment.name]: motivationProgram.comment,
                        [providedInfoCorrectField.name]: motivationProgram.motivationCorrectStatus,
                        [attachedDocumentField.name]: documents,
                        [consentStartActiveDateField.name]: consentStartActiveDate
                    });

                    this.setState({
                        ...this.state,
                        infoCorrectStatus: motivationProgram.motivationCorrectStatus,
                        motivationProgram
                    })
                }
            })
            .catch(() => {
                this.props.preloader.hide()
            })
    }

    handleSave = () => {
        const {validate, rawValues} = this.props.formData
        const {infoCorrectStatus, motivationProgram} = this.state;
        validate(validationForm(this.state), () => {
            const {accountField, bankBic, bankName, inn, index, bankAddress, loadDocument} = rawValues;
            const correctStatus = infoCorrectStatus;
            if ((!loadDocument.consent || !loadDocument.passport) && correctStatus === 'CORRECT') {
                return this.props.modals.alert({message: 'Невозможно установить данные как корректные если не приложены необходимые скан-копии документов '})
            }
            const data = {
                id: motivationProgram.id,
                userId: this.props.id,
                comment: correctStatus === 'INCORRECT' ? comment : '',
                motivationCorrectStatus: correctStatus,
                accountNumber: accountField,
                bikCode: bankBic,
                bankName,
            };

            if (inn && inn.length > 0) {
                data.inn = inn
            } else {
                data.registrationAddress = bankAddress;
                data.index = index
            }

            if (consentStartActiveDate) {
                const [day, month, year] = consentStartActiveDate.split('.');
                const date = new Date(year, month - 1, +day + 1);
                data.startDate = date.toISOString()
            }

            this.props.actions.editMotivationAdmin(data)
                .then(() => {
                    this.setState({viewMode: true})
                })
                .catch(err => {
                    if (err.response) {
                        const errors = err.response.body.errors;
                        if (errors) {
                            this.props.modals.alert({message: errors[0].value})
                        } else {
                            this.props.modals.alert({message: "При сохранении произошла ошибка"})
                        }
                    } else {
                        this.setState({viewMode: true})
                    }
                })
        }, data => {
        })()
    };

    getButtons = () => {
        const withViewMode = [<Button key="edit"
                                      name={motivationMessages.buttons.edit}
                                      onClick={() => this.setState({viewMode: false})}
                                      dataId="button-motivation-edit"/>];
        const withoutViewMode = [
            <Button key="save"
                    name={motivationMessages.buttons.save}
                    onClick={this.handleSave}
                    dataId="button-motivation-edit-save"/>,
            <Button key="cancel"
                    name={motivationMessages.buttons.cancel}
                    onClick={() => {
                        this.props.formData.init({});
                        this.componentDidMount();
                        consentStartActiveDate = consentStartActiveDate || null;
                        this.setState({
                            viewMode: true,
                        })
                    }
                    }
                    dataId="button-motivation-edit-cancel"/>
        ];

        return this.state.viewMode ? withViewMode : withoutViewMode
    };

    render = () => {
        const {renderField} = this.props.formData;
        const {motivationProgram} = this.state;
        return (
            <React.Fragment>
                {
                    !motivationProgram && <div>
                        Услуга "Мотивация" не подключена
                    </div>
                }
                {
                    motivationProgram &&
                    <div className={'motivation'}>
                        <Panel label={this.state.viewMode ?
                            'Данные для участия в программе мотивации' : 'Редактирование данных программы мотивации'}
                               dataId="motivation-admin-edit-panel">
                            <Form buttons={this.getButtons()} dataId="motivation-admin-edit-form"
                                  errors={this.state.formErrors}>
                                {
                                    this.state.infoCorrectStatus === 'INCORRECT' &&
                                    renderField(Comment, {
                                        viewMode: this.state.viewMode,
                                        setValue: value => comment = value
                                    })
                                }

                                {
                                    renderField(providedInfoCorrectField, {
                                        viewMode: this.state.viewMode,
                                        setValue: value => {
                                            infoCorrectStatus = value
                                            this.setState({
                                                infoCorrectStatus: value
                                            })
                                        }
                                    })
                                }

                                {renderField(AccountField, {
                                    viewMode: this.state.viewMode
                                })}

                                {renderField(BankBicField, {
                                    viewMode: this.state.viewMode
                                })}

                                {renderField(BankNameField, {
                                    viewMode: this.state.viewMode
                                })}

                                {
                                    motivationProgram.inn &&
                                    motivationProgram.inn.length &&
                                    renderField(InnField, {
                                        viewMode: this.state.viewMode
                                    })
                                }

                                {
                                    motivationProgram.index &&
                                    motivationProgram.index.length &&
                                    renderField(BankAddressField, {
                                        viewMode: this.state.viewMode
                                    })
                                }

                                {
                                    motivationProgram.registrationAddress &&
                                    motivationProgram.registrationAddress.length &&
                                    renderField(IndexField, {
                                        viewMode: this.state.viewMode
                                    })
                                }
                                {
                                    renderField(attachedDocumentField, {
                                        loadDocument: type => window.open(this.props.buildBackendUrl(`/auth/v1/motivation/${motivationProgram.id}/get-document/${type}`), '_blank')
                                    })
                                }
                                {!!motivationProgram.documentName && consentStartActiveDate && renderField(consentStartActiveDateField, {
                                    date: consentStartActiveDate,
                                    viewMode: this.state.viewMode,
                                    setValue: v => {
                                        consentStartActiveDate = v;
                                        this.setState({
                                            ...this.state
                                        })
                                    }
                                })}
                            </Form>
                            <div className="panel-label-secondary"/>
                        </Panel>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default compose(
    withAuthContext,
    withModals(),
    withActions({
        getMotivationAdmin: GetMotivationAdminAction.name,
        editMotivationAdmin: EditMotivationAdminAction.name
    }),
    withFormData
)(MotivationAdminComponent)
