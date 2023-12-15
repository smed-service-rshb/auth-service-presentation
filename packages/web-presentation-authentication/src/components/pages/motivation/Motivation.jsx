import React from 'react'
import {compose, withActions, withAuthContext, withFormData, withModals} from '@efr/medservice-web-presentation-core';
import {
    Button,
    Field,
    Form,
    Input,
    InputDatepicker,
    Panel,
    Textarea,
    Toggle
} from '@efr/medservice-web-presentation-ui';
import './motivation.css'
import Messages from "../../../Messages.json";
import {EditMotivationAction, GetMotivationAction} from "../../../actions";
import FileUpload from '../../file-upload'

let consentStartActiveDate = null;

const allowedExtension = ['docx', 'doc', 'pdf', 'jpg', 'jpeg', 'png'];

let uploadedFiles = {
    'CHECK_FORM': null,
    'PASSPORT': null
};
const parseDateFomString = dateStr => {
    dateStr = dateStr.replace(/\u200e/g, '');
    return dateStr && new Date(dateStr.substring(6) + '-' + dateStr.substring(3, 5) + '-' + dateStr.substring(0, 2));
};

const dateFromIso = dateStr => {
    dateStr = dateStr.replace(/-/g, '');
    return dateStr.substring(6) + '.' + dateStr.substring(6, 4) + '.' + dateStr.substring(0, 4);
};

const AccountField = withFormData.createField(
    'accountField',
    ({value, onChange, errorMessage}, {viewMode}) => (
        <Field title="Номер зарплатного счета сотрудника" error={errorMessage} value={value}>
            <Input
                type="text"
                mask={(value) => {
                    let mask = [/\d/];
                    for (let i = 1; i < value.length && i < 20; i++) mask.push(/\d/);
                    if (value.length === 0) {
                        return []
                    }
                    return mask;
                }}
                value={value}
                onChange={onChange}
                dataId="field-account-number"
                disabled={viewMode}
                error={!!errorMessage}/>
        </Field>
    ),
    ({validator}) => [validator.required("Поле обязательно для заполнения"),
        validator((success, error) => value => {
            if (!!value && value.length < 20) {
                return error("Поле \"Номер зарплатного счета сотрудника\" должно состоять из 20 цифр")
            }
            return success(value)
        })]
);

const BankBicField = withFormData.createField(
    'bankBic',
    ({value, onChange, errorMessage}, {viewMode}) => (
        <Field title="Бик банка" error={errorMessage} value={value}>
            <Input
                type="text"
                mask={(value) => {
                    let mask = [/\d/];
                    for (let i = 1; i < value.length && i < 9; i++) mask.push(/\d/);
                    if (value.length === 0) {
                        return []
                    }
                    return mask;
                }}
                value={value}
                onChange={onChange}
                error={!!errorMessage}
                disabled={viewMode}
                dataId="field-bank-bic"/>
        </Field>
    ),
    ({validator}) => [validator.required("Поле обязательно для заполнения"),
        validator((success, error) => value => {
            if (!!value && value.length < 9) {
                return error("Поле \"Бик банка\" должно состоять из 9 цифр")
            }
            return success(value)
        })]
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
                    if (value.length === 0) {
                        return []
                    }
                    return mask;
                }}
                value={value}
                onChange={onChange}
                error={!!errorMessage}
                disabled={viewMode}
                dataId="field-inn"/>
        </Field>
    ),
    ({validator}) => [validator((success, error) => value => {
        if (!!value && value.length < 12) {
            return error("Поле \"ИНН сотрудника\" должно состоять из 12 цифр")
        }
        return success(value)
    }), validator.required('Поле "ИНН сотрудника" должно быть заполнено')
    ]
);
const HasInnField = withFormData.createField(
    'hasInn',
    ({value, onChange}, {setValue}) => (
        <Field title={' '}>
            <Toggle key="hasInn"
                    checked={value}
                    name={Messages.Motivation.popups.auth.buttons.hasInn}
                    dataId="toggle-hasInn"
                    onChange={v => {
                        setValue(v);
                        onChange(v)
                    }}/>
            <span className={'toggle-label'}>ИНН сотрудника отсутствует</span>
        </Field>
    )
);
const IndexField = withFormData.createField(
    'index',
    ({value, onChange, errorMessage}, {viewMode}) => (
        <Field title="Индекс" error={errorMessage} value={value}>
            <Input type='text'
                   mask={(value) => {
                       let mask = [/\d/];
                       for (let i = 1; i < value.length && i < 6; i++) mask.push(/\d/);
                       if (value.length === 0) {
                           return []
                       }
                       return mask;
                   }}
                   value={value}
                   onChange={onChange}
                   error={!!errorMessage}
                   disabled={viewMode}
                   dataId="field-index"/>
        </Field>), ({validator}) => [validator((success, error) => value => {
        if (!!value && value.length < 6) {
            return error("Поле \"Индекс\" должно состоять из 6 цифр")
        }
        return success(value)
    }),
        validator.required('Поле "Индекс" должно быть заполнено')]
);
const BankAddressField = withFormData.createField(
    'bankAddress',
    ({value, onChange, errorMessage}, {viewMode}) => (
        <Field title="Адрес регистрации" error={errorMessage} value={value}>
            <Input type='text' value={value} onChange={onChange} error={!!errorMessage}
                   disabled={viewMode} dataId="field-bank-address"/>
        </Field>
    ),
    ({validator}) =>
        ([validator.required('Поле "Адрес регистрации" должно быть заполнено')])
);
const PrintConsentField = withFormData.createField(
    'printConsent',
    ({value, onChange, errorMessage}, {printConsent}) => (
        <Field error={errorMessage} value={value}>
            <Button key="printConsent"
                    name={Messages.Motivation.popups.auth.buttons.printConsent}
                    onClick={printConsent}
                    dataId="button-print-consent"
                    type={Button.buttonTypes.secondary}/>
        </Field>
    )
);
const UploadConsentField = withFormData.createField(
    'uploadConsent',
    ({value, onChange, errorMessage}, {setFile}) => (
        <Field title="Приложить копию документов" error={errorMessage} value={value}>
            <FileUpload
                key="uploadConsent"
                name={Messages.Motivation.popups.auth.buttons.uploadFile}
                onFileChange={(file) => {
                    setFile(file)
                }}
                dataId="button-upload-consent"/>
        </Field>
    )
);
const UploadPassportField = withFormData.createField(
    'uploadConsent',
    ({value, onChange, errorMessage}, {setFile}) => (
        <Field title="Приложить копию паспорта" error={errorMessage} value={value}>
            <FileUpload
                key="uploadPassport"
                name={Messages.Motivation.popups.auth.buttons.uploadFile}
                onFileChange={(file) => {
                    setFile(file)
                }}
                dataId="button-upload-passport"/>
        </Field>
    )
);
const Comment = withFormData.createField(
    'Comment',
    ({value, onChange, errorMessage}) => (
        <Field title="Комментарий от Страховой компании" error={errorMessage}>
            <Textarea
                error={!!errorMessage}
                disabled={true}
                value={value}
                onChange={onChange}
                dataId="field-incorrect-info-comment"/>
        </Field>
    )
);

const attachedDocumentField = withFormData.createField(
    'loadDocument',
    ({value, onChange}, {loadDocument, type}) => (
        <Field title="Ранее приложенная копия согласия">
            <Button key="loadDocument"
                    name={(uploadedFiles[type] && uploadedFiles[type].name) || value}
                    onClick={() => loadDocument(type)}
                    disabled={false}
                    dataId="button-load-document"
                    type={Button.buttonTypes.secondary}/>
        </Field>
    )
);

const attachedPassportField = withFormData.createField(
    'loadPassport',
    ({value, onChange}, {loadDocument, type}) => (
        <Field title="Ранее приложенная копия паспорта">
            <Button key="loadPassport"
                    name={(uploadedFiles[type] && uploadedFiles[type].name) || value}
                    onClick={() => loadDocument(type)}
                    disabled={false}
                    dataId="button-load-document"
                    type={Button.buttonTypes.secondary}/>
        </Field>
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

const validationForm = (hasInn) => {
    const fields = [
        AccountField,
        BankBicField,
        BankNameField
    ];

    hasInn && fields.push(InnField);
    !hasInn && fields.push(IndexField);
    !hasInn && fields.push(BankAddressField);

    return withFormData.createValidationForm(fields);
};

class MotivationComponent extends React.Component {
    state = {
        viewMode: true,
        hasInn: !true,
        formErrors: []
    };

    componentDidMount() {
        this.props.preloader.show();

        this.props.actions.getMotivation()
            .then(motivationProgram => {
                this.props.preloader.hide();
                if (Object.keys(motivationProgram).length > 0) {

                    consentStartActiveDate = motivationProgram.startDate
                        ? dateFromIso(motivationProgram.startDate) : null;

                    this.props.formData.init({
                        [AccountField.name]: motivationProgram.accountNumber,
                        [BankBicField.name]: motivationProgram.bikCode,
                        [BankNameField.name]: motivationProgram.bankName,
                        [HasInnField.name]: !motivationProgram.inn,
                        [InnField.name]: motivationProgram.inn,
                        [IndexField.name]: motivationProgram.index,
                        [BankAddressField.name]: motivationProgram.registrationAddress,
                        [Comment.name]: motivationProgram.comment,
                        [attachedDocumentField.name]: motivationProgram.documentName,
                        [attachedPassportField.name]: motivationProgram.passportName,
                        [consentStartActiveDateField.name]: consentStartActiveDate
                    });

                    this.setState({
                        ...this.state,
                        hasInn: !motivationProgram.inn,
                        motivationProgram
                    })
                }
            })
            .catch(() => {
                this.props.preloader.hide()
            })
    }

    attachDocument = (file, url) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            if (file.size > 52428800) {
                reject({message: "Размер прикладываемого файла не должен привышеть 50Мб"})
            } else if (allowedExtension.indexOf(/(?:\.([^.]+))?$/.exec(file.name.toLowerCase())[1]) > -1) {
                reader.onload = () => {
                    let formData = new FormData();
                    formData.append('content', file, file.name);
                    let token = this.props.authContext.userData.token;
                    fetch(url, {
                        method: "POST",
                        headers: {
                            'X-TOKEN': token
                        },
                        body: formData
                    })
                        .then(res => {
                            if (!res.ok) {
                                return reject({message: "Не удалось обновить данные, попробуйте позже!"})
                            }
                            resolve()
                        })
                        .catch(reject)
                };
            } else {
                reject({message: "Неверный формат файла. Допустимые расширения файла: .pdf, .jpg, .doc, .jpeg, .png"})
            }
        })
    };

    handleSave = () => {
        const {validate} = this.props.formData;
        const {accountField, bankBic, bankName, inn, index, bankAddress, hasInn} = this.props.formData.rawValues;
        validate(validationForm(!hasInn), () => {
            this.props.preloader.show();


            const data = {
                id: this.state.motivationProgram.id,
                accountNumber: accountField,
                bikCode: bankBic,
                bankName
            };

            if (!hasInn) {
                data.inn = inn
            }

            if (consentStartActiveDate) {
                data.startDate = parseDateFomString(consentStartActiveDate)
            }

            if (hasInn) {
                data.registrationAddress = bankAddress
                data.index = index
            }

            this.props.actions.editMotivation(data)
                .then(() => {
                    if (!this.state.files) {
                        this.setState({
                            viewMode: true
                        });

                        return this.props.preloader.hide();
                    }

                    Object.keys(this.state.files).forEach(file => {
                        const source = this.state.files[file];
                        this.attachDocument(source, this.props.buildBackendUrl(`/auth/v1/motivation/${file}/attach-document`))
                            .then(() => {
                                this.props.preloader.hide();
                                uploadedFiles[file] = source;
                                this.setState({
                                    viewMode: true
                                })
                            })
                            .catch(e => {
                                this.props.modals.alert({message: e.message ? e.message : "Не удалось загрузить документ"});
                                this.props.preloader.hide();
                                this.setState({viewMode: true, files: null})
                            })
                    })
                })
                .catch(err => {
                    this.props.preloader.hide();

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

    uploadFile = (type, file) => {
        this.setState({
            files: {
                ...this.state.files,
                [type]: file,
            },
            agreementFile: true
        })
    };

    downloadFile = type => {
        window.open(this.props.buildBackendUrl(`/auth/v1/motivation/${type}/attach-document`), '_blank')
    };

    getButtons = () => {
        const statusCorrect = this.state.motivationProgram &&
            this.state.motivationProgram.motivationCorrectStatus === 'CORRECT'
        const withViewMode = !statusCorrect ?
            [<Button key="edit"
                     name={Messages.Motivation.buttons.edit}
                     onClick={() => this.setState({viewMode: false})}
                     dataId="button-motivation-edit"/>]
            : [];
        const withoutViewMode = [
            <Button key="save"
                    name={Messages.Motivation.buttons.save}
                    onClick={this.handleSave}
                    dataId="button-motivation-edit-save"/>,
            <Button key="cancel"
                    name={Messages.Motivation.buttons.cancel}
                    onClick={() => {
                        this.props.formData.init({});
                        this.componentDidMount();
                        consentStartActiveDate = consentStartActiveDate || null
                        this.setState({
                            viewMode: true,
                            files: null,
                        })
                    }
                    }
                    dataId="button-motivation-edit-cancel"/>
        ];

        return this.state.viewMode ? withViewMode : withoutViewMode
    };

    render = () => {
        const {renderField} = this.props.formData;
        const mode = {viewMode: this.state.viewMode};
        const {hasInn, motivationProgram} = this.state;
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
                               dataId="motivation-edit-panel">
                            <Form buttons={this.getButtons()} dataId="motivation-edit-form"
                                  errors={this.state.formErrors}>
                                {
                                    motivationProgram.motivationCorrectStatus === 'INCORRECT' &&
                                    renderField(Comment)
                                }
                                {renderField(AccountField, mode)}
                                {renderField(BankBicField, mode)}
                                {renderField(BankNameField, mode)}
                                {!this.state.viewMode &&
                                renderField(HasInnField, {
                                    setValue: value => this.setState({hasInn: value})
                                })}
                                {!hasInn &&
                                renderField(InnField, mode)}
                                {hasInn && renderField(IndexField, mode)}
                                {hasInn && renderField(BankAddressField, mode)}

                                {!this.state.viewMode && renderField(PrintConsentField, {
                                    printConsent: () => window.open(this.props.buildBackendUrl('/auth/v1/motivation/print'), '_blank')
                                })}

                                {!this.state.viewMode && renderField(UploadConsentField, {
                                    setFile: file => {
                                        consentStartActiveDate = new Date().toLocaleDateString()
                                        this.uploadFile('CHECK_FORM', file)
                                    }
                                })}
                                {!this.state.viewMode && renderField(UploadPassportField, {
                                    setFile: file => this.uploadFile('PASSPORT', file)
                                })}
                                {(motivationProgram.documentName || uploadedFiles['CHECK_FORM']) &&
                                renderField(attachedDocumentField, {
                                    type: 'CHECK_FORM',
                                    loadDocument: this.downloadFile
                                })}
                                {(motivationProgram.passportName || uploadedFiles['PASSPORT']) &&
                                renderField(attachedPassportField, {
                                    type: 'PASSPORT',
                                    loadDocument: this.downloadFile
                                })}
                                {(!!motivationProgram.documentName || !!this.state.agreementFile)
                                && consentStartActiveDate && renderField(consentStartActiveDateField, {
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
        getMotivation: GetMotivationAction.name,
        editMotivation: EditMotivationAction.name
    }),
    withFormData
)(MotivationComponent)
