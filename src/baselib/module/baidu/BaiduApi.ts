import TGlobal from "@/baselib/aPublic/GlobalHelper";
import { THTTPRequest } from "@/baselib/aPublic/HTTPClient";
import { IResult, TResult } from "@/baselib/aPublic/PublicClass";

export class TBaiduAccount {

    public FAccountID: string = "";
    public FAppCode: string = "";
    //必须参数，应用的API Key；
    public FAppID: string = "";
    //应用的Secret Key；
    public FAppSecret: string = "";
    public FAccessToken: string = "";
    public FAccessTokenExpireIn: number = 2590000;
    public FAccessTokenLastTime: string = "";
    public FCreateTime: string = "";
    //使用
    public FIsUse: boolean = false;
}

export default class BaiduAdminApi {
    //获取账号信息
    public static async GetWXAccountList(): Promise<IResult<TBaiduAccount[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/BaiduAdmin/GetBaiduAccountList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async GetBaiduAccount(qAccountID: string): Promise<IResult<TBaiduAccount>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/BaiduAdmin/GetBaiduAccount/"+qAccountID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async SaveBaiduAccount(qAccount: TBaiduAccount): Promise<IResult<TBaiduAccount>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/BaiduAdmin/SaveBaiduAccount");
        lRequest.data = qAccount;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async RefreshAccount(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/BaiduAdmin/RefreshAccount");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async DelAccount(qAccountID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/BaiduAdmin/DelAccount/"+qAccountID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
}