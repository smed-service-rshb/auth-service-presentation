import React from 'react';
import {withFormData} from '@efr/medservice-web-presentation-core';
import * as Messages from '../../../../Messages.json';
import {
    Field,
    Input,
    Toggle,
    Checkbox,
} from '@efr/medservice-web-presentation-ui';
import {settingPasswordData} from "./constant";
import "./style.css";


export const checkEnabledField = withFormData.createField(
    settingPasswordData.checkEnabled,
    ({value, setValue, errorMessage}, {viewMode}) => {
        return <Field error={errorMessage}
                      title={Messages.PasswordPanel.fields.checkEnabled}>
            <Toggle checked={value !== undefined ? value : false}
                    disabled={viewMode}
                    onChange={setValue}
                    dataId={`field-group-documentsBlock-field-name-main`}>
            </Toggle>
        </Field>
    },
    () => {
    }
);

export const minLengthField = withFormData.createField(
    settingPasswordData.minLength,
    ({value, setValue, setFieldValue, errorMessage, validate}, {viewMode}) => {
        return <Field error={errorMessage}
                      title={Messages.PasswordPanel.fields.minLength}>
            <Input type='text'
                   maxLength={15}
                   error={!!errorMessage}
                   width='215px'
                   disabled={viewMode}
                   value={value}
                   onChange={setValue}
                   dataId={`field-group-clientData-field-login`}
                   onFocusChange={v => !v && validate()}/>
        </Field>
    },
    ({validator}) =>([
        validator.required(Messages.PasswordPanel.errors.minLengthRequired)
    ])
);

export const maxLengthField = withFormData.createField(
    settingPasswordData.maxLength,
    ({value, setValue, setFieldValue, errorMessage, validate}, {viewMode}) => {
        return <Field error={errorMessage}
                      title={Messages.PasswordPanel.fields.maxLength}>
            <Input type='text'
                   maxLength={15}
                   error={!!errorMessage}
                   width='215px'
                   disabled={viewMode}
                   value={value}
                   onChange={setValue}
                   dataId={`field-group-clientData-field-login`}
                   onFocusChange={v => !v && validate()}/>
        </Field>
    },
    ({validator}) =>([
        validator.required(Messages.PasswordPanel.errors.maxLengthRequired)
    ])
);

export const numberCharactersField = withFormData.createField(
    settingPasswordData.numberOfDifferentCharacters,
    ({value, setValue, setFieldValue, errorMessage, validate}, {viewMode}) => {
        return <Field error={errorMessage}
                      title={Messages.PasswordPanel.fields.numberOfDifferentCharacters}>
            <Input type='text'
                   maxLength={15}
                   error={!!errorMessage}
                   width='215px'
                   disabled={viewMode}
                   value={value}
                   onChange={setValue}
                   dataId={`field-group-clientData-field-login`}
                   onFocusChange={v => !v && validate()}/>
        </Field>
    },
    ({validator}) =>([
        validator.required(Messages.PasswordPanel.errors.numberOfDifferentCharactersRequired)
    ])
);

export const specialCharsetsField = withFormData.createField(
    settingPasswordData.specialCharsets,
    ({value, setValue, setFieldValue, errorMessage, validate}, {viewMode}) => {
        return <Field error={errorMessage}
                      title={Messages.PasswordPanel.fields.specialCharsets}>
            <Input type='text'
                   maxLength={15}
                   error={!!errorMessage}
                   width='215px'
                   disabled={viewMode}
                   value={value}
                   onChange={setValue}
                   dataId={`field-group-clientData-field-login`}
                   onFocusChange={v => !v && validate()}/>
        </Field>
    },
    ({validator}) =>([
        validator.required(Messages.PasswordPanel.errors.specialCharsetsRequired)
    ])
);

export const allowedIsActiveField = (id, type) => withFormData.createField(
     settingPasswordData.allowedIsActive + id,
    ({value, setValue, setFieldValue, errorMessage, validate}, {viewMode}) => {
        return <div className={"center checkbox-for-dict"}>
                <Checkbox checked={value !== undefined}
                      disabled={viewMode}
                      onChange={v => setValue(v ? type : undefined)}
                      dataId="field-surName"/>
            </div>
    },
    () => {
    }
);

export const requiredIsActiveField = (id, type) => withFormData.createField(
        settingPasswordData.requiredIsActive + id,
    ({value, setValue, setFieldValue, errorMessage, validate}, {viewMode,allowed}) => {
        return <div className={"center checkbox-for-dict"}>
            <Checkbox checked={value !== undefined}
                      disabled={viewMode || (allowed !== type)}
                      onChange={v => {
                          setValue(v ? type : undefined)
                      }}
                      dataId="field-surName"/>
        </div>
    },
    () => {
    }
);


