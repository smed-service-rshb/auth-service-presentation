const NOP = () => {
};
export default class DataSource {
    constructor(dataReceiver) {
        if (typeof dataReceiver === 'function') {
            this.dataReceiver = dataReceiver;
            this.page = 1;
            this.size = 10;
        } else if(typeof dataReceiver === 'object'){
            this.dataReceiver = dataReceiver.getData;
            if(dataReceiver.gridName) {
                const {size, page} = getGridParamFromSessoin(dataReceiver.gridName);
                this.page = !page ? 1 : page;
                this.size = !size ? 10 : size;
                this.gridName = dataReceiver.gridName;
            } else{
                this.page = 1;
                this.size = 10;
            }
        }
        this.listener = NOP
    }

    listen = (listener = NOP) => {
        //TODO что делать, если уже зареган?

        this.listener = listener;
        if (this.data) {
            this.listener(this.data);
        }
        return () => {
            this.listener = NOP
        }
    };

    changePage = page => {
        this.page = page;
        this.load()
    };

    changeSize = size => {
        this.page = 1;
        this.size = size;
        this.load()
    };

    getPage = () => this.page;

    getSize = () => this.size;

    getGridName = () => this.gridName;

    setFilter = (filter, savePageValue) => {
        this.page = savePageValue ? this.page : 1;
        this.filter = filter;
        this.load()
    };

    load = () => {
        if(this.gridName) {
            setToSessionStorageGridParam(this.gridName, this.page, this.size);
        }
        this.dataReceiver(this.filter, (this.page - 1) * this.size, this.size)
            .then(data => {
                this.listener(data);
                this.data = data;
            })
    }
}

export const getFromSessionStorage = (paramName) => {
    let value = sessionStorage.getItem(paramName);
    if (value && value !== 'undefined') return parseInt(value, 10);
};

export const setToSessionStorageGridParam = (gridName, page, size) => {
    sessionStorage.setItem(gridName + '-grid-size', size);
    sessionStorage.setItem(gridName + '-grid-page', page);
};

export const getGridParamFromSessoin = gridName => {
    let size = getFromSessionStorage(gridName + '-grid-size');
    let page = getFromSessionStorage(gridName + '-grid-page');

    return {size, page}
};
//TODO Покрыть тестами