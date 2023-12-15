import React from 'react';
import {Button, Field, Form, InputDatepicker, Panel} from '@efr/medservice-web-presentation-ui'
import {
    compose,
    withActions,
    withAuthContext,
    withFormData,
    withModals,
    withPageRouter
} from '@efr/medservice-web-presentation-core';
import './styles.css';

import permissions from "../../../../permissions";



export const extractUrl = (data) => `/auth/v1/motivation/report?startDate=${data.startDate}&endDate=${data.endDate}&`;


const parseDateFomString = dateStr => {
    return dateStr && new Date(dateStr.substring(6) + '-' + dateStr.substring(3, 5) + '-' + dateStr.substring(0, 2));
};

const StartDateField = (endDate) => withFormData.createField(
    'startDate',
    ({value, onChange, errorMessage}) => (
        <Field title={'c'} error={errorMessage} value={value}>
            <InputDatepicker value={value} onChange={onChange} error={!!errorMessage} disabled={false}
                             dataId="field-birthDate"/>
        </Field>
    ),
    ({validator}) => ([validator.required("Укажите дату начала отчета"),
        validator((success, error) => value => {
            if (endDate && value && parseDateFomString(endDate).getTime() < parseDateFomString(value).getTime()) {
                return error('Дата начала отчета не может быть больше даты окончания выписки"')
            }
            return success(value)
        }),
        validator.typeDate('Дата начала отчета должно содержать корректное значение даты')
    ])
);

const EndDateField = withFormData.createField(
    'endDate',
    ({value, onChange, errorMessage}) => (
        <Field title={'по'} error={errorMessage} value={value}>
            <InputDatepicker value={value} onChange={onChange} error={!!errorMessage} disabled={false}
                             dataId="field-birthDate"/>
        </Field>
    ),
    ({validator}) => ([validator.required("Укажите дату окончания отчета"),
        validator.typeDate('Дата начала отчета должно содержать корректное значение даты')

    ])
);


const validationForm = (rawValues) => {
    const fields = [
        StartDateField(rawValues.endDate), EndDateField
    ];

    return withFormData.createValidationForm(fields);
};

class MotivationReport extends React.Component {

    back = () => {
        this.props.pageRouter.back();
    };

    componentDidMount() {
        this.showError = this.showError.bind(this);
    }

    extract = data => {
        window.open(this.props.buildBackendUrl(extractUrl(data), '_blank'));
    };


    showError = () => {
        this.props.preloader.hide();
        this.props.modals.alert({message: "При формировании отчета произошла ошибка"})
    };

    getButtons = () => {
        const {validate, rawValues} = this.props.formData;
        const ButtonsBack = [<Button key="back" name={'Отмена'}
                                     type="secondary"
                                     dataId="button-back"
                                     onClick={this.back}/>];

        if (this.props.authContext.checkPermission(permissions.MOTIVATION_REPORT_CREATE)) {
            const extractButton = [<Button key="extract"
                                           name={'Сформировать отчет'}
                                           dataId="button-extract"
                                           onClick={
                                               validate(validationForm(rawValues), this.extract, data => {
                                               })}/>
            ];
            extractButton.push(ButtonsBack);
            return extractButton;
        }

        return ButtonsBack;
    };

    render() {
        const {renderField} = this.props.formData;

        return (
            <div id="extract">
                <Panel labelSecondary="Отчет программ мотивации" dataId="extract-to-excel">
                    <Form dataId="extractForm" buttons={this.getButtons()}>
                        <Field title={"Период построения отчета"}>
                            <div className={'inner-field'}>
                                {renderField(StartDateField())}
                                {renderField(EndDateField)}
                            </div>
                        </Field>
                        <div className="panel-label-secondary"/>
                    </Form>
                </Panel>
            </div>
        )
    };
}

export default compose(
    withPageRouter,
    withActions({
    }),
    withFormData,
    withAuthContext,
    withModals({})
)(MotivationReport)