import React from 'react';

import {compose, modal, withActions, withModals, withFormData} from '@efr/medservice-web-presentation-core';
import {Button, Field, Form, Input} from '@efr/medservice-web-presentation-ui';

import {
    GetOrgUnitsAction,
} from "../../../actions/index";

import Grid from "../../grid";
import './style.css';

const filterField = withFormData.createField(
    'filter',
    ({value, onChange, errorMessage}, {changeValue}) => (
        <div className={"mainCenter"}>
            <Field title="Фильтр" error={errorMessage}>
                <Input type='text' value={value}
                       onChange={v => {
                           onChange(v);
                           changeValue(v);
                       }} disabled={false}
                       width='250px'
                       dataId="field-middleName"/>
            </Field>
        </div>
    ), ({validator}) => ([])
);

const offices = [];
let filter = '';

class BranchesSearch extends React.Component {

    prepareData = data => {
        return (
            <div>
                <div className="float-right">
                    {
                        data
                    }
                </div>
            </div>
        );
    };

    columns = [
        {
            key: 'branch',
            name: 'РФ',
            data: this.prepareData,
        },
        {
            key: 'office',
            name: 'ВСП',
            data: this.prepareData,
        },
        {
            key: 'city',
            name: 'Город',
            data: this.prepareData,
        }
    ];

    constructor(props) {
        super(props);
        this.state = {
            orgUnits: [],
            orgUnitsLoaded: false,
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.dataSource = Grid.createDataSource(this.getData);
    }

    getData = (...params) => {
        let offset = params[1];
        let size = params[2];
        let filtrated = (filter && filter.length > 0) ?
            offices.filter(el => ((el.branch && (el.branch.includes(filter) > 0))  || (el.office && (el.office + '').includes(filter) > 0)  || (el.city && el.city.includes(filter) > 0)))
            : offices;
        if (offices.length !== 0) {
            return Promise.resolve(this._buildData(filtrated, offset, size))
        } else {
            return this.props.actions.getOrgUnits()
                .then(data => {
                    this.setState({...this.state, orgUnits: data.orgUnits, orgUnitsLoaded: true});
                    data.orgUnits.forEach((item) => {
                        item.offices.forEach(office => {
                            offices.push({branchId: item.branchId, branch: item.name, officeId: office.officeId, office: office.name, city: office.city})
                        })
                    });
                    return this._buildData(offices, offset, size)
                });
        }
    };

    _buildData = (offices, offset, size) => {
        return {
            rows: offices.slice(offset, offset + size),
            hasMore: offices.length > (offset + size),
            totalElements: offices.length,
            totalPages: Math.round(offices.length / size),
            last: offices.length - (offset + size) <= size,
            size: size,
            first: offset === 0,
        }
    };

    _handleCancel = () => {
        this.props.modal.close();
    };

    getButtons = () => {
        return [
            <Button key="save"
                    name="Выбрать"
                    dataId="button-save"
                    onClick={() => {
                        this.props.modal.close('success', this.grid.getSelectedRows())
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
        const {renderField} = this.props.formData;
        return (
            <modal.window title="" buttons={this.getButtons()}>
                <Form dataId="filter-form">
                    {renderField(filterField, {
                        changeValue: (value) => {
                            filter = value;
                            this.grid && this.grid.refresh();
                            this.dataSource && this.dataSource.changePage(1);
                        }
                    })}
                </Form>
                <Grid columns={this.columns}
                      dataSource={this.dataSource}
                      selectedRow={this.props.selected}
                      dataId="offices-list"
                      emptyMessage={'По заданным параметрам данные отсутствуют'}
                      onCellClick={this.handleEdit}
                      ref={(element) => {
                          this.grid = element;
                      }}/>
            </modal.window>
        );
    };

    handleEdit(e) {
        this.props.modal.close('success', [e])
    }
}

export default compose(
    modal(true),
    withActions({
        getOrgUnits: GetOrgUnitsAction.name
    }),
    withModals(),
    withFormData
)(BranchesSearch);