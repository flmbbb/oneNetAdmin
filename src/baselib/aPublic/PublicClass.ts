//一些公共的类
export enum emAuthorRole {
    noneRole,
    userRole,
    operatorRole,
    adminRole,
    superRole,
}
//FastAPI请求成功后回来的数据集信息
export class TModuleResultDataInfo {
    iTotal: number = 0; //如果有分页的情况,代表总记录数
    iData: number = 0; //代表返回几个数据集
    iPageIndex: number = 0; //代表当前第几页
    iPageSize: number = 0; //代表每页最大条数
    iRow: number = 0; //当前数据有几条
    datas: any = []; //当前数据
    params: any = {};
    jsonFormat: string = "";
}
//本地分页信息,无法与服务端对接 因为  get pageSize是无法转化成属性的
//JSON系列化会把 _pageSize系列化进去,但GET SET 属性是不会的
export class TPageInfo {
    private _pageSize: number = 50; //每页条数
    public pageSizeOption: number[] = [20, 50, 100, 200]; //每页条数选择
    public pageIndex: number = 1; //当前第几页
    public _pageTotal: number = 0; //总条数
    public pageCount: number = 0; //总页数
    public get pageSize() {
        return this._pageSize;
    }
    public set pageSize(iSize: number) {
        if (iSize <= 0) {
            iSize = 50;
        }
        if (this._pageTotal < 0) {
            this._pageTotal = 0;
        }
        //
        if (iSize != this._pageSize) {
            this._pageSize = iSize;
            this.pageIndex = 0;
            this.pageCount = Math.ceil(this._pageSize / iSize); //向上取整
        }
    }
    public get pageTotal(): number {
        return this._pageTotal;
    }
    public set pageTotal(iTotal: number) {
        if (iTotal <= 0) {
            iTotal = 0;
        }
        this._pageTotal = iTotal;
        if (this._pageSize <= 0) {
            this._pageSize = 50;
        }
        this.pageCount = Math.ceil(this._pageTotal / this._pageSize); //向上取整
        if (this.pageIndex > this.pageCount) {
            this.pageIndex = this.pageCount;
        }
    }
}

export interface IPageRequest {
    pageSize: number;
    pageIndex: number;
    filters: any;
}
//FastAPI请求参数集合
export class TFastApiRequest {
    public moduleCode: string = "";
    public moduleDatas: any = {};
    public moduleParams: any = {};
    public pageIndex: number = 0;
    public pageSize: number = 0;
    public dbCode: string = "";
    public initInfo() {
        this.moduleCode = "";
        this.moduleDatas = {};
        this.moduleParams = {};
        this.pageIndex = 0;
        this.pageSize = 0;
        this.dbCode = "";
    }
}

export class TFileReturn {
    fileID: string = "";
    fileName: string = "";
    filePath: string = "";
    httpUrl: string = "";
    fileType: string = "";
    fileSize: number = 0;
    jobID: string = "";
    detailID: string = "";
}

export interface IResult<T> {
    resultSuccess: boolean;
    resultCode: string;
    resultMsg: string;
    resultData: T;
    resultDataPageCount: number;
    resultFormat: string;
    resultModuleDataInfo: TModuleResultDataInfo;
}

//结果集
export class TResult {
    public resultSuccess: boolean = false;
    public resultCode: string = "";
    public resultMsg: string = "";
    public resultData: any = null;
    public resultDataPageCount: number = 0; //分页时返回数据总条数，
    public resultFormat: string = "json"; //string(字符串),jsonstring(JSON格式字符串),json(json);
    public resultModuleDataInfo: TModuleResultDataInfo =
        new TModuleResultDataInfo(); //快速接口FastApi信息多是放在resultData里面,  包括页数等信息，一般取第一个数据集时用的
    static createNew(): TResult {
        return new TResult();
    }
    public getData(qDataName: string = "data1"): any {
        let lDataInfo = new TModuleResultDataInfo();
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key); //Type, Height
        }
        if (lKeys.length == 1) {
            tempInfo = this.resultData[lKeys[0]];
            this.resultModuleDataInfo = tempInfo;
        } else {
            tempInfo = this.resultData[qDataName];
        }
        return tempInfo["datas"];
    }
    public getDataIndex(qIndex: number = 0): any {
        if (qIndex < 0) {
            qIndex = 0;
        }
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key); //Type, Height
        }
        if (lKeys.length < qIndex + 1) {
            throw "数据集总共:" + lKeys.length;
            return;
        }
        tempInfo = this.resultData[lKeys[qIndex]];
        if (qIndex == 0) {
            this.resultModuleDataInfo = tempInfo;
        }
        return tempInfo["datas"];
    }
    public getFirstRow(qIndex: number = 0): any {
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key); //Type, Height
        }
        if (lKeys.length == 0) {
            throw "返回数据为空";
            return;
        }
        tempInfo = this.resultData[lKeys[qIndex]];
        let lFirst = tempInfo["datas"];
        return lFirst[0];
    }
    public getFirstValue(): any {
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key); //Type, Height
        }
        if (lKeys.length == 0) {
            throw "返回数据为空";
            return;
        }
        tempInfo = this.resultData[lKeys[0]];
        let lFirst = tempInfo["datas"];
        lFirst = lFirst[0];
        let lFirstKey = "";
        for (var key in lFirst) {
            return lFirst[key];
        }
    }
    //上传文件返回来的文件信息
    public getFileReturn(qIndex: number = 0): TFileReturn {
        if (qIndex < 0) {
            qIndex = 0;
        }
        let lFileReturn: TFileReturn;
        let lResultArry = this.resultData as [];
        if (lResultArry.length >= qIndex) {
            lFileReturn = lResultArry[qIndex];
            return lFileReturn;
        } else {
            return new TFileReturn();
        }
    }
    //
    public getDataT<T>(): IResult<T> {
        return this as IResult<T>;
    }
}

//报表打印
export class TReportPostData {
    public reportCode: string = ""; //报表配置，读取报表所在的目录进行打印
    public reportType: string = "img"; //html,pdf,img三个格式目前
    public custFileName: string = "";
    public custParams: object = {}; //自定义上传的参数 
    public custData: object = {}; //自定义上传的数据
}