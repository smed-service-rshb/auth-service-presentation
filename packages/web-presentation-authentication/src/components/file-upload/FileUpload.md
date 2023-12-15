## Компонент FileUpload

Пример использования:
```
class Example extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.fileChange = this.fileChange.bind(this);
    }

    render () {
        return(
            <div>
                <FileUpload onFileChange={this.fileChange} dataId="fileUpload1" name="Прикрепить файл"/>
                <br/>
                <FileUpload onFileChange={this.fileChange} dataId="fileUpload2" disabled name="Прикрепить файл"/>
            </div>
        )
    };

    fileChange (file)  {
        this.setState({
            file: file
        },()=>{console.log(file)});
    };
}
<Example />
```