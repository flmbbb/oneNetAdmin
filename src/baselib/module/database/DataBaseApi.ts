import { IResult, TResult } from "@/baselib/aPublic/PublicClass";
import { THTTPRequest } from "@/baselib/aPublic/HTTPClient";
import TGlobal from "@/baselib/aPublic/GlobalHelper";

export class TDataBaseObject {
    public FObjectID: string = "";
    public FDBID: string = "";
    public FObjectName: string = "";
    public FObjectDescription: string = "";
    public FObjectType: string = "";
    public FRemark: string = "";
    public FStatus: string = "";
}

export class TDataBaseField {
    public FFieldID: string = "";
    public FDBID: string = "";
    public FObjectID: string = "";
    public FOrderNumber: number = 0;
    public FFieldName: string = "";
    public FFieldCaptoin: string = "";
    public FFieldType: string = "";
    public FFieldIsPrimarykey: boolean = false;
    public FFieldIsNullable: boolean = false;
    public FFieldsize: string = "";
    public FFieldPrecision: string = "";
    public FFieldDefaultValue: string = "";
    public FFieldRemark: string = "";
    public FStatus: string = "";
}

export default class TDataBaseApi {
    //读取数据库结构  表，视图，存储过程 ，函数
    public static async InitDataBaseToDB(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/DataBaseHelper/InitDataBaseToDB");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    //读取数结构 表，视图，存储过程 ，函数
    public static async GetDBObjectList(qDataBaseCode: string): Promise<IResult<TDataBaseObject[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/DataBaseHelper/GetDBObjectList/" + qDataBaseCode);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async GetDBObject(qDBObjectID: string): Promise<IResult<TDataBaseObject>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/DataBaseHelper/GetDBObject/" + qDBObjectID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //读取数结构 表，视图，存储过程 ，函数 的参数
    public static async GetDBFieldList(qDBObjectID: string): Promise<IResult<TDataBaseField[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/DataBaseHelper/GetDBFieldList/" + qDBObjectID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async GetDBField(qFieldID: string): Promise<IResult<TDataBaseField>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/DataBaseHelper/GetDBField/" + qFieldID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async SaveDBObject(qAdd: TDataBaseObject): Promise<IResult<TDataBaseObject>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/DataBaseHelper/SaveDBObject");
        lRequest.data = qAdd
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async SaveDBField(qAdd: TDataBaseField): Promise<IResult<TDataBaseField>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/DataBaseHelper/SaveDBField");
        lRequest.data = qAdd
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
}