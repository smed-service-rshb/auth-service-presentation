## Компонент FileUpload.IFrame

Пример использования:
```
class Example extends React.Component  {


    constructor(props) {
        this.state = {}
        this.upload = this.upload.bind(this);        
        this.setFileName = this.setFileName.bind(this);        
        this.setFileName1 = this.setFileName1.bind(this);        
    }

    render () {
        return(
            <div>
                <FileUpload.IFrame dataId="fileUploadIFrame1" 
                                   name="content"
                                   onFileChange={this.setFileName} 
                                   ref={ref=>this.uploader=ref} 
                                   description={'Прикрепить файл'}/>
                <div className="button-file-name">{this.state.fileName}</div>
                {this.state.fileName && <div>
                    <button onClick={this.upload}>инициировать загрузку </button>
                </div>}
                <br/>
                <FileUpload.IFrame dataId="fileUploadIFrame4" 
                                   name="content"
                                   onFileChange={this.setFileName1} 
                                   description={'Прикрепить файл'}/>
                <div className="button-file-name">{this.state.fileName1}</div>
                <br/> 
                <FileUpload.IFrame dataId="fileUploadIFrame2" disabled name="content" action="/qqqq" description={'Прикрепить файл'}/>
                <br/>
                <FileUpload.IFrame dataId="fileUploadIFrame3" disabled name="content" action="/qqqq"/>                
            </div>
        )
    };

    setFileName (value) {
        this.setState({fileName: value});
    }
    
    setFileName1 (value) {
    
        this.setState({fileName1: value.split('\\').pop()});
    }

    upload ()  {
        this.uploader.upload("/some/upload/path")
        .then(console.log)
        .catch(e=>alert(e))
    };    
}
<PreloaderProvider>
    <Example/>
</PreloaderProvider>
```