import React from 'react';

import {compose, modal, withModals, PropTypes} from '@efr/medservice-web-presentation-core';
import Grid from '../../grid';
import {Form, Button} from '@efr/medservice-web-presentation-ui';
import './styles.css'

const buttonChoose = (action) => <Button key="choose" name={'Выбрать'} dataId="button-choose"
                                         onClick={action}/>;
const buttonBack = (action, viewMode) => <Button key="back"
                                                 name={viewMode ? 'На главную' : 'Отмена'}
                                                 type="secondary"
                                                 dataId="button-back" onClick={action}/>;

class GridModal extends React.Component {

    constructor(props) {
        super(props);
        this.dataSource = Grid.createDataSource(this.getData);
        this.state = {
            data: this.props.data
        };
        this.handleEdit = this.handleEdit.bind(this);
        this._handleCancel = this._handleCancel.bind(this)
    }

    getData = (...params) => {
        let offset = params[1];
        let size = params[2];
        return Promise.resolve(this._buildData(offset, size))
    };

    _buildData = (offset, size) => {
        let data = this.state.data;
        return {
            rows: data.slice(offset, offset + size),
            hasMore: data.length > (offset + size),
            totalElements: data.length,
            totalPages: Math.floor(data.length / size) + 1,
            last: data.length - (data + size) <= size,
            size: size,
            first: offset === 0,
        }
    };

    getButtons = () => {
        return [
            buttonChoose(() => {
                this.props.modal.close('success', this.grid.getSelectedRows());
            }),
            buttonBack(this._handleCancel)
        ];
    };

    _handleCancel() {
        this.props.modal.close()
    }

    render = () => {
        return (
            <modal.window title={this.props.title}>
                <Form dataId="program-options-Form" buttons={this.getButtons()}>
                    <div className={'modal-grid-padding'}>
                        <Grid
                            columns={this.props.columns}
                            dataSource={this.dataSource}
                            selectedRow={this.props.selectedRow}
                            dataId={'data-list'}
                            emptyMessage={"Нет данных для отображения"}
                            onCellClick={this.handleEdit}
                            ref={(element) => {
                                this.grid = element;
                            }}/>
                    </div>
                </Form>
            </modal.window>
        );
    };

    handleEdit(e) {
        this.props.modal.close('success', [e])
    }
}

GridModal.propTypes = {
    /**
     * Набор данных для отображения в гриде
     */
    data: PropTypes.array.isRequired,
    /**
     * Список полей для отображения в гриде
     */
    columns: PropTypes.array.isRequired,
    /**
     * Массив с изначально выбранными эдементами
     */
    selectedRow: PropTypes.array
};


export default compose(
    modal(true),
    withModals(),
)(GridModal);