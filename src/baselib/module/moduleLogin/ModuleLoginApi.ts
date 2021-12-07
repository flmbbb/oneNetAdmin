import { IResult, TResult } from "@/baselib/aPublic/PublicClass";
import TGlobal from "@/baselib/aPublic/GlobalHelper";
import { THTTPRequest } from "@/baselib/aPublic/HTTPClient";

export class TModuleLogin {
    public FModuleLoginID: string = "";
    public FModuleLoginCode: string = "";
    public FTableName: string = "";
    public FFieldUserID: string = "";
    public FFieldUserCode: string = "";
    public FFieldUserName: string = "";
    public FFieldUserPass: string = "";
    public FLoginSQL: string = "";
    public FIsUse: boolean = false;
}

export default class ModuleLogApi {
    //获取模块登陆配置数据
    public static async GetModuleLoginList(): Promise<IResult<TModuleLogin[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/ModuleLoginHelper/GetModuleLoginList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取模块登陆配置数据跟据配置ID
    public static async GetModuleLogin(qModuleLoginID: string): Promise<IResult<TModuleLogin>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/ModuleLoginHelper/GetModuleLogin/" + qModuleLoginID);
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存模块登陆配置数据
    public static async SaveModuleLogin(qAdd: TModuleLogin): Promise<IResult<TModuleLogin>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/ModuleLoginHelper/SaveModuleLogin");
        lRequest.data = qAdd;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //删除模块登陆配置数据
    public static async DelModuleLogin(qModuleLoginID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/ModuleLoginHelper/DelModuleLogin/" + qModuleLoginID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
}