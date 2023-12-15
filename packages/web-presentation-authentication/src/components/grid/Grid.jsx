import React from 'react';
import PropTypes from 'prop-types';
import {
    Checkbox,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "@efr/medservice-web-presentation-ui";

import Paginator from './Paginator';
import DataSource from './data-source';

class Grid extends React.Component {
    state = {};

    constructor(props) {
        super(props);
        this.state = {
            selectedRow: this.props.selectedRow || []
        };
    }

    componentDidMount = () => {
        this.unlisten = this.props.dataSource.listen(
            data => this.setState({
                ...this.state,
                totalPages: data.totalPages,
                hasMore: data.hasMore,
                rows: data.rows && data.rows.map(item => {
                    return {
                        item: item,
                        selected: this._isSelectedRow(this.state.selectedRow, item) >= 0
                    }
                })
            })
        );

        if (!this.props.dataSource.filter) {
            this.props.dataSource.load();
        }
    };

    componentWillUnmount = () => {
        this.unlisten()
    };

    _onCellClick = (rowData, columnKey, e) => {
        e.preventDefault();
        sessionStorage.setItem(this.props.dataSource.getGridName() + '-active-row', rowData && rowData.id);
        this.props.onCellClick && this.props.onCellClick(rowData, columnKey)
    };

    _switchSelection = (elementIndex, selected) => {
        let selectedRow = this.state.selectedRow;
        if (selected) {
            selectedRow.push(this.state.rows[elementIndex].item);
        } else {
            let index = this._isSelectedRow(selectedRow, this.state.rows[elementIndex].item);
            if (index >= 0) selectedRow.splice(index, 1);
        }
        this.setState({
            ...this.state,
            selectedRow: selectedRow,
            rows: this.state.rows.map((item, index) => {
                return {
                    ...item,
                    selected: (elementIndex === index) ? selected : item.selected
                }
            })
        })

    };

    _isSelectedRow(array, item) {
        for (let index = 0; index < array.length; index++) {
            let contain = false;
            for (let i = 0; i < Object.keys(item).length; i++) {
                contain = array[index][Object.keys(item)[i]] === item[Object.keys(item)[i]];
                if (!contain) break;
            }
            if (contain) return index;
        }
        return -1;
    }

    _switchSelectionAll = selected => {
        let selectedRow = this.state.selectedRow;
        this.state.rows.forEach(item => {
            if (selected) {
                this._isSelectedRow(selectedRow, item.item) < 0 && selectedRow.push(item.item);
            } else {
                let index = this._isSelectedRow(selectedRow, item.item);
                if (index >= 0) selectedRow.splice(index, 1);
            }
        });
        this.setState({
            ...this.state,
            rows: this.state.rows.map(item => {
                return {
                    ...item,
                    selected: selected
                }
            }),
            selectedRow: selectedRow
        })
    };

    getSelectedRows = () => {
        return this.state.selectedRow;
    };

    cleanSelectedRows = () => {
        this.setState({selectedRow: []});
        this.refresh();
    };

    getAllRows = () => {
        const {rows} = this.state;
        return (rows && rows.map(item => item.item)) || []
    };

    refresh = () => {
        this.props.dataSource.load();
    };

    render = () => {
        const {dataSource} = this.props;

        const columns = this.props.columns.map(item => ({
            ...item,
            data: data => (item.data && item.data(data)) || data
        }));

        if (!columns) {
            console.error("Грид без столбцов бессмысленен");
            return null
        }
        const {rows, hasMore} = this.state;

        if (!rows) {
            return null;
        }

        if (dataSource.getPage() === 1 && rows.length === 0) {
            return <div className="grid-empty-message">{this.props.emptyMessage}</div>
        }

        const allSelected = this.getSelectedRows().length === this.getAllRows().length;
        let activeRow = sessionStorage.getItem(this.props.dataSource.getGridName() + '-active-row');
        sessionStorage.setItem(this.props.dataSource.getGridName() + '-active-row', undefined);
        activeRow = activeRow === 'undefined' ? '-1' : activeRow;
        return (
            <div>
                <div className="grid" data-id={this.props.dataId}>
                    {this._renderToolbar()}
                    <Table maxHeight={this.props.maxHeight}>
                        <TableHeader>
                            <TableRow dataId={this.props.dataId + '-gridTableHeaderRow'}>
                                {!this.props.hide && <TableHeaderColumn
                                    dataId={this.props.dataId + '-gridTableHeaderColumnCommonCheckbox'}>
                                    <Checkbox onChange={this._switchSelectionAll} checked={allSelected}
                                              dataId={this.props.dataId + '-gridHeaderCheckbox'}/>
                                </TableHeaderColumn>}
                                {
                                    columns.map(column => (
                                        <TableHeaderColumn key={column.key}
                                                           dataId={this.props.dataId + '-gridTableHeaderColumnRow-' + column.key}>
                                            {column.name}
                                        </TableHeaderColumn>)
                                    )
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                rows.map((row, index) => {
                                    let isActive = activeRow === (row && row.item && (row.item.id + ''));
                                    return (
                                        <TableRow key={index} dataId={this.props.dataId + '-gridTableRow-' + index}>
                                            {!this.props.hide &&
                                            <TableRowColumn dataId={this.props.dataId + '-gridTableRowColumn-' + index}
                                                            active={isActive}>
                                                <Checkbox onChange={this._switchSelection.bind(this, index)}
                                                          checked={row.selected}
                                                          dataId={this.props.dataId + '-gridCheckboxRow-' + index}/>
                                            </TableRowColumn>}
                                            {
                                                columns.map(column => (
                                                    <TableRowColumn key={column.key + index} active={isActive}
                                                                    onClick={this._onCellClick.bind(this, row.item, column.key)}
                                                                    dataId={this.props.dataId + '-gridTableRowColumn-' + column.key}>
                                                        {column.data(row.item[column.key])}
                                                    </TableRowColumn>
                                                ))
                                            }
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>
                <Paginator page={dataSource.getPage()}
                           size={dataSource.getSize()}
                           totalPage={this.state.totalPages}
                           hasMore={hasMore}
                           onPageChange={dataSource.changePage}
                           onSizeChange={dataSource.changeSize}
                />
            </div>
        )
    };

    _renderToolbar = () => {
        return (
            <div className="grid-buttons">
                {
                    React.Children.toArray(this.props.children).map(child => (
                        React.cloneElement(child, {
                            onClick: () => child.props.onClick(this.getSelectedRows())
                        })
                    ))
                }
            </div>
        )

    };


    static
    propTypes = {
        /**
         * Список колонок грида
         */
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                /**
                 * Ключ колонки
                 */
                key: PropTypes.string.isRequired,
                /**
                 * Наименование колонки, отображаемое пользовалтелю
                 */
                name: PropTypes.string.isRequired,

                /**
                 * Функция рендера содержимого ячейки
                 */
                data: PropTypes.func,
            })
        ).isRequired,

        /**
         * Дочерние элементы, являющиеся реакт элементами IconButton.
         * Вставляются в toolbar грида
         */
        children: PropTypes.node,

        /**
         * Источник данных
         *
         */
        dataSource: PropTypes.shape({
            /**
             * Подписаться на события получения данных
             * //TODO описать
             * Возвращаемое значение:
             *    функция отписки
             */
            listen: PropTypes.func.isRequired,
        }).isRequired,

        /**
         * Функция обработки клика на ячейку таблицы
         *      function onCellClick (rowData, columnKey)
         */
        onCellClick: PropTypes.func,

        /**
         * Сообщение, оботражаемое при отсутствии данных.
         */
        emptyMessage: PropTypes.string,
        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Максимальная высота в px
         */
        maxHeight: PropTypes.string,
        /**
         * Массив с изначально выбранными эдементами
         */
        selectedRow: PropTypes.array,
        /**
         * Признак отображения чекбоксов
         */
        hide: PropTypes.boolean
    };

    static
    createDataSource = (...params) => new DataSource(...params);
}

export default Grid

//TODO Покрыть тестами
