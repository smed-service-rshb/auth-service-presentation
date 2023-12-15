import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import './styles.css';

export default class FileUploadIFrame extends React.Component {
    /**
     * Выполнить загрузку файла
     * Возвращается промис
     */
    upload = action => {
        //TODO timeout
        this._form.action = action;
        this._form.submit();
        return new Promise((s, e) => {
            this._success = s;
            this._error = e;
        })
    };

    /**
     * Сбросить состояние формы.
     */
    reset = () => {
        this._form.reset();
    };

    componentWillUnmount() {
        this._error && this._error("componentWillUnmount");
    }

    _processOnLoad = event => {
        const frame = event.target;
        if (!this._success) {
            return; //Осел вызывает onLoad даже до сабмита.
        }
        try {
            const frameDocument = frame.contentWindow || frame.contentDocument;
            const content = frameDocument.document.body.innerText;
            this._success(JSON.parse(content));
        } catch (e) {
            this._error(e)
        }
    };

    _handleChange = e => {
        e.preventDefault();
        !this.props.disabled && this.props.onFileChange(e.target.value);
    };

    render = () => (
        <form encType="multipart/form-data"
              method="POST"
              target={`i-frame-${this.props.dataId}`}
              ref={ref => this._form = ref}
              style={{display: 'inline-block'}}>
            <iframe
                id={`i-frame-${this.props.dataId}`}
                title={`i-frame-${this.props.dataId}`}
                name={`i-frame-${this.props.dataId}`}
                style={{display: 'none'}}
                onLoad={this._processOnLoad}
                tabIndex="-1">
            </iframe>

            <div className={classNames('upload-container', {disabled: this.props.disabled})}>
                <div className="upload-button">
                    <span className="upload-empty"><span className="upload-empty-border">{this.props.description}</span></span>
                    <input id={`upload-input-${this.props.dataId}`}
                           type="file"
                           name={this.props.name}
                           disabled={this.props.disabled}
                           onChange={this._handleChange}/>
                </div>
            </div>
        </form>
    );

    static propTypes = {
        /**
         * Обработчик выбора файла
         */
        onFileChange: PropTypes.func,

        /**
         * Уникальный идентификатор элемента
         */
        dataId: PropTypes.string.isRequired,
        /**
         * Наименование поля c загружаемым файлом
         */
        name: PropTypes.string.isRequired,
        /**
         * Текстовка, рядом с иконкой
         */
        description: PropTypes.string,
        /**
         * Признак заблокированного элемента
         */
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        onFileChange: () => (null),
    };
}