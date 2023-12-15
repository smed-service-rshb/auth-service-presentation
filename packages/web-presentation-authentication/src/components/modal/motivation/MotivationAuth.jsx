import React from 'react';
import {
    compose,
    modal,
    withModals,
    withFormData,
    withActions,
    withAuthContext
} from '@efr/medservice-web-presentation-core';
import {Panel, Button, Field, Form, Input, Textarea, Toggle, InputDatepicker} from '@efr/medservice-web-presentation-ui';
import './motivation.css'
import {Motivation as motivationMessages} from '../../../Messages.json';
import {
    EditMotivationAction,
    GetMotivationAction
} from "../../../actions";
import permissions from "../../../permissions";
import FileUpload from '../../file-upload'

let consentStartActiveDate = null;

const allowedExtension = ['docx', 'doc', 'pdf', 'jpg', 'jpeg', 'png'];
const fields = {
    accountField: 'accountField',
    bankBic: 'bankBic',
    bankName: 'bankName',
    inn: 'inn',
    hasInn: 'hasInn',
    index: 'index',
    bankAddress: 'bankAddress',
    printConsent: 'printConsent',
    uploadConsent: 'uploadConsent',
    uploadPassport: 'uploadPassport',
    Comment: 'Comment',
    loadDocument: 'loadDocument',
    loadPassport: 'loadPassport',
    consentStartActiveDate: 'consentStartActiveDate'
};

const AccountField = withFormData.createField(
    fields.accountField,
    ({value, onChange, errorMessage}) => (
        <Field title={motivationMessages.fieldsName.accountField} error={errorMessage} value={value}>
            <Input
                type="text"
                mask={(value) => {
                    let mask = [/\d/];
                    for (let i = 1; i < value.length && i < 20; i++) mask.push(/\d/);
                    return mask;
                }}
                value={value}
                onChange={onChange}
                dataId="field-account-number"
                error={!!errorMessage}/>
        </Field>
    ), ({validator}) => [
        validator.required(motivationMessages.errors.emptyField.replace('%s', motivationMessages.fieldsName.accountField)),
        validator((success, error) => value => {
            if (!!value && value.length < 20) {
                return error("Поле \"Номер зарплатного счета сотрудника\" должно состоять из 20 цифр")
            }
            return success(value)
        })
    ]
);

const BankBicField = withFormData.createField(
    fields.bankBic,
    ({value, onChange, errorMessage}) => (
        <Field title={motivationMessages.fieldsName.bikCode} error={errorMessage} value={value}>
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
                dataId="field-bank-bic"/>
        </Field>
    ),
    ({validator}) => [
        validator.required(motivationMessages.errors.emptyField.replace('%s', motivationMessages.fieldsName.bikCode)),
        validator((success, error) => value => {
            if (!!value && value.length < 9) {
                return error("Поле \"Бик банка\" должно состоять из 9 цифр")
            }
            return success(value)
        })]
);
const BankNameField = withFormData.createField(
    fields.bankName,
    ({value, onChange, errorMessage}) => (
        <Field title={motivationMessages.fieldsName.bankName} error={errorMessage} value={value}>
            <Input
                type='text'
                value={value}
                onChange={onChange}
                error={!!errorMessage}
                dataId="field-bank-name"/>
        </Field>
    ),
    ({validator}) =>
        ([validator.required(motivationMessages.errors.emptyField.replace('%s', motivationMessages.fieldsName.bankName))])
);
const InnField = withFormData.createField(
    fields.inn,
    ({value, onChange, errorMessage}) => (
        <Field title={motivationMessages.fieldsName.inn} error={errorMessage} value={value}>
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
                dataId="field-inn"/>
        </Field>
    ), ({validator}) => [
        validator((success, error) => value => {
            if (!!value && value.length < 12) {
                return error("Поле \"ИНН сотрудника\" должно состоять из 12 цифр")
            }
            return success(value)
        }), validator.required(motivationMessages.errors.emptyField.replace('%s', motivationMessages.fieldsName.inn))
    ]
);
const HasInnField = withFormData.createField(
    fields.hasInn,
    ({value, onChange, setFieldValue}, {setValue}) => (
        <Field>
            <Toggle key="hasInn"
                    checked={value}
                    name={motivationMessages.popups.auth.buttons.hasInn}
                    dataId="toggle-hasInn"
                    onChange={v => {
                        setValue(v);
                        onChange(v);
                        if (v) {
                            setFieldValue('inn', undefined);
                        }
                    }}/>
            <span className={'toggle-label'}>ИНН сотрудника отсутствует</span>
        </Field>
    )
);
const IndexField = withFormData.createField(
    fields.index,
    ({value, onChange, errorMessage}) => (
        <Field title={motivationMessages.fieldsName.index} error={errorMessage} value={value}>
            <Input
                type='text'
                mask={(value) => {
                    let mask = [/\d/];
                    for (let i = 1; i < value.length && i < 6; i++) mask.push(/\d/);
                    return mask;
                }}
                value={value}
                onChange={onChange}
                error={!!errorMessage}
                dataId="field-index"/>
        </Field>
    ), ({validator}) => [
        validator.required(motivationMessages.errors.emptyField.replace('%s', motivationMessages.fieldsName.index)),
        validator((success, error) => value => {
            if (!!value && value.length < 6) {
                return error("Поле \"Индекс\" должно состоять из 6 цифр")
            }
            return success(value)
        }),
    ]
);
const BankAddressField = withFormData.createField(
    fields.bankAddress,
    ({value, onChange, errorMessage}) => (
        <Field title={motivationMessages.fieldsName.bankAddress} error={errorMessage} value={value}>
            <Textarea value={value} onChange={onChange} error={!!errorMessage}
                      dataId="field-bank-address"/>
        </Field>
    ),
    ({validator}) =>
        ([validator.required(motivationMessages.errors.emptyField.replace('%s', motivationMessages.fieldsName.bankAddress))])
);
const PrintConsentField = withFormData.createField(
    fields.printConsent,
    ({value, onChange, errorMessage}, {printConsent}) => (
        <Field error={errorMessage} value={value}>
            <Button key="printConsent"
                    name={motivationMessages.popups.auth.buttons.printConsent}
                    onClick={printConsent}
                    dataId="button-print-consent"
                    type={Button.buttonTypes.secondary}/>
        </Field>
    )
);
const UploadConsentField = withFormData.createField(
    fields.uploadConsent,
    ({value, onChange, errorMessage}, {setFile}) => (
        <Field title={motivationMessages.fieldsName.uploadConsent} error={errorMessage} value={value}>
            <FileUpload
                key="uploadConsent"
                name={motivationMessages.popups.auth.buttons.uploadFile}
                onFileChange={(file) => {
                    setFile(file)
                }}
                dataId="button-upload-consent"/>
        </Field>
    )
);

const UploadPassportField = withFormData.createField(
    fields.uploadPassport,
    ({value, onChange, errorMessage}, {setFile}) => (
        <Field title={motivationMessages.fieldsName.uploadPassport} error={errorMessage} value={value}>
            <FileUpload
                key="uploadConsent"
                name={motivationMessages.popups.auth.buttons.uploadFile}
                onFileChange={(file) => {
                    setFile(file)
                }}
                dataId="button-upload-passport"/>
        </Field>
    )
);

const Comment = withFormData.createField(
    fields.Comment,
    ({value, onChange}) => (
        <Field title={motivationMessages.fieldsName.Comment}>
            <Textarea
                disabled={true}
                value={value}
                onChange={onChange}
                dataId="field-incorrect-info-comment"/>
        </Field>
    )
);

const attachedDocumentField = withFormData.createField(
    fields.loadDocument,
    ({value, onChange}, {loadDocument, type}) => (
        <Field title={motivationMessages.fieldsName.loadDocument}>
            <Button key="loadDocument"
                    name={value}
                    onClick={() => loadDocument(type)}
                    disabled={false}
                    dataId="button-load-document"
                    type={Button.buttonTypes.secondary}/>
        </Field>
    )
);

const attachedPassportField = withFormData.createField(
    fields.loadPassport,
    ({value, onChange}, {loadDocument, type}) => (
        <Field title={motivationMessages.fieldsName.loadPassport}>
            <Button key="loadPassport"
                    name={value}
                    onClick={() => loadDocument(type)}
                    disabled={false}
                    dataId="button-load-document"
                    type={Button.buttonTypes.secondary}/>
        </Field>
    )
);


const consentStartActiveDateField = withFormData.createField(
    fields.consentStartActiveDate,
    ({value, onChange}, {viewMode, setValue, date}) => (
        <Field title={motivationMessages.fieldsName.consentStartActiveDate}>
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

const validationForm = (rawValues) => {
    const fields = [
        AccountField,
        BankBicField,
        BankNameField
    ];
    if (rawValues.hasInn) {
        fields.push(BankAddressField);
        fields.push(IndexField);
    } else {
        fields.push(InnField);
    }

    return withFormData.createValidationForm(fields);
};

class MotivationAuth extends React.Component {
    state = {
        hasInn: false,
        editErrors: [],
        formErrors: []
    };

    componentDidMount() {
        if (!this.props.authContext.checkPermission(permissions.PARTICIPATE_MOTIVATION)) {
            this.props.modal.close()
        }

        this.props.preloader.show();

        this.props.actions.getMotivation()
            .then(motivationProgram => {
                this.props.preloader.hide();

                if (Object.keys(motivationProgram).length > 0) {
                    consentStartActiveDate = motivationProgram.startDate
                        ? new Date(motivationProgram.startDate).toLocaleDateString() : null;

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
                    fetch(url, {
                        mode: 'no-cors',
                        method: "POST",
                        credentials: "include",
                        body: formData
                    })
                        .then(res => {
                            if (!res.ok) {
                                return reject({message: "Не удалось загрузить документ, попробуйте позже!"})
                            }
                            resolve()
                        })
                        .catch(reject)
                };
            } else {
                this.props.preloader.hide();
                this.setState({editErrors: [{value: "Неверный формат файла. Допустимые расширения файла: .pdf, .jpg, .doc, .jpeg, .png"}]})
            }
        })
    };

    handleSaveMotivation = () => {
        this.setState({
            editErrors: []
        });

        const {validate, rawValues} = this.props.formData;
        validate(validationForm(rawValues), () => {
            this.props.preloader.show();

            const {accountField, bankBic, bankName, inn, index, bankAddress, hasInn} = this.props.formData.rawValues;
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
                const [day, month, year] = consentStartActiveDate.split('.');
                const date = new Date(year, month - 1, +day + 1);
                data.startDate = date.toISOString()
            }

            if (hasInn) {
                data.registrationAddress = bankAddress;
                data.index = index
            }

            this.props.actions.editMotivation(data)
                .then(() => {
                    if (!this.state.files) {
                        this.props.modal.close();
                        return this.props.preloader.hide();
                    }

                    Object.keys(this.state.files).forEach(file => {
                        const source = this.state.files[file];
                        this.attachDocument(source, this.props.buildBackendUrl(`/auth/v1/motivation/${file}/attach-document`))
                            .then(() => {
                                this.props.preloader.hide();
                                this.props.modal.close()
                            })
                            .catch(e => {
                                this.props.modals.alert({message: e.message ? e.message : "Не удалось загрузить документ"});
                                this.props.preloader.hide();
                            })
                    })
                })
                .catch(err => {
                    this.props.preloader.hide();

                    if (err.response) {
                        const errors = err.response.body.errors;
                        if (errors) {
                            this.setState({
                                editErrors: errors
                            })
                        }
                    } else {
                        this.props.modals.alert({message: "Не удалось обновить данные, попробуйте позже!"})
                    }
                })
        }, data => {
        })()
    };

    uploadFile = (type, file) => {
        this.setState({
            files: {
                ...this.state.files,
                [type]: file
            },
            agreementFile: true
        })
    };

    downloadFile = type => {
        window.open(this.props.buildBackendUrl(`/auth/v1/motivation/${type}/attach-document`), '_blank')
    };

    getEditErrors = () => {
        return this.state.editErrors.map((item, index) => {
            return fields[item.fieldName] ? (<div key={index}>
                {`${fields[item.fieldName]} заполнено не верно`}
            </div>) : <div key={index}>{item.value}</div>
        })
    };

    getButtons = () => {
        return [
            <Button key="next"
                    dataId="button-next"
                    onClick={this.handleSaveMotivation}
                    name={motivationMessages.popups.auth.buttons.next}/>,
            <Button key="close"
                    name="Заполнить позднее"
                    onClick={() => {
                        consentStartActiveDate = consentStartActiveDate || null;
                        this.props.modal.close()
                    }
                    }
                    dataId="button-close-modal"
                    type={Button.buttonTypes.secondary}/>
        ];
    };

    render = () => {
        const {renderField} = this.props.formData;
        const {motivationProgram, hasInn} = this.state;
        let attachFile = (!!motivationProgram && !!motivationProgram.documentName) || !!this.state.agreementFile;
        return (
            <div className={'motivation'}>
                <modal.window title={'Обратите внимание!'}
                              buttons={this.getButtons()}>
                    <div className="panel-label-secondary"/>
                    {
                        this.state.editErrors.length > 0 &&
                        <div className="field-edit-errors">
                            {
                                this.getEditErrors()
                            }
                        </div>

                    }
                    <Panel label={motivationMessages.popups.auth.title}
                           dataId="motivation-auth-panel">
                        <Form dataId="motivation-auth-form" errors={this.state.formErrors}>
                            {
                                motivationProgram &&
                                motivationProgram.motivationCorrectStatus === 'INCORRECT' &&
                                renderField(Comment)
                            }
                            {renderField(AccountField)}
                            {renderField(BankBicField)}
                            {renderField(BankNameField)}
                            {renderField(HasInnField, {
                                setValue: (value) => {
                                    this.setState({...this.state, hasInn: value})
                                }
                            })}
                            {!hasInn && renderField(InnField)}
                            {hasInn && renderField(BankAddressField)}
                            {hasInn && renderField(IndexField)}
                            {
                                renderField(PrintConsentField, {
                                    printConsent: () => window.open(this.props.buildBackendUrl('/auth/v1/motivation/print'), '_blank')
                                })
                            }
                            {renderField(UploadConsentField, {
                                setFile: file => {
                                    consentStartActiveDate = new Date().toLocaleDateString()
                                    this.uploadFile('CHECK_FORM', file)
                                }
                            })}
                            {renderField(UploadPassportField, {
                                setFile: file => this.uploadFile('PASSPORT', file)
                            })}
                            {
                                motivationProgram && motivationProgram.documentName &&
                                renderField(attachedDocumentField, {
                                    type: 'CHECK_FORM',
                                    loadDocument: this.downloadFile
                                })
                            }
                            {
                                motivationProgram && motivationProgram.passportName &&
                                renderField(attachedPassportField, {
                                    type: 'PASSPORT',
                                    loadDocument: this.downloadFile
                                })
                            }
                            {attachFile && consentStartActiveDate && renderField(consentStartActiveDateField, {
                                date: consentStartActiveDate,
                                viewMode: this.state.viewMode,
                                setValue: v => {
                                    consentStartActiveDate = v;
                                    this.setState({
                                        ...this.state
                                    })
                                }
                            })}
                            <div className="line-divider"/>
                        </Form>
                    </Panel>
                </modal.window>
            </div>
        );
    }

}

export default compose(
    withAuthContext,
    modal(false),
    withModals(),
    withActions({
        getMotivation: GetMotivationAction.name,
        editMotivation: EditMotivationAction.name
    }),
    withFormData
)(MotivationAuth);
