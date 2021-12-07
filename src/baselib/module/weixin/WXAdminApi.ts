import TGlobal from "@/baselib/aPublic/GlobalHelper";
import { THTTPRequest } from "@/baselib/aPublic/HTTPClient";
import { IResult, TResult } from "@/baselib/aPublic/PublicClass";

//
export class TWXAccount {
    public FAccountID: string = "";
    public FSourceID: string = "";
    public FAppID: string = "";
    public FAppSecret: string = "";
    public FMessageToken: string = "";
    public FMessageEncodingAESKey: string = "";
    public FAccessTokenExpireIn: number = 0;
    public FAccessToken: string = ""
    public FAccessTokenLastTime: string = "";
    public FGetAuthorCodeUrl: string = "";
    public FJsApiTicket: string = "";
    public FJsApiLastTime: string = "";
    public FErrWebUrl: string = "";
}
//
export class TWXMenu {
    public FMenuID: string = "";
    public FPMenuID: string = "";
    public tempPMenuID: any;
    public FTreeCode: string = "";
    public FWXAppID: string = "";
    public FMenuType: string = "";
    public FMenuName: string = "";
    public FMenuKey: string = "";
    public FMenuUrl: string = "";
    public FMenuMiniAppid: string = "";
    public FMenuMiniPagepath: string = "";
    public children: TWXMenu[] = [];
}

export class TWXTemplate {

    public FID: string = "";
    public FTemplateCode: string = "";
    public FWXAppID: string = "";
    public FWXTemplateID: string = "";
    public FJumUrl: string = "";
    public FMiniprogramAppid: string = "";
    public FMiniprogramPagepath: string = "";
    public FTemplateRemark: string = "";
    public FRemark: string = "";
    public FIsUse: boolean = false;
}

export class TWXTemplateParams {

    public FParamID: string = "";
    public FID: string = "";
    public FOrderNumber: number = 1;
    public FParamName: string = "";
    public FParamJsonName: string = "";
    public FParamCaption: string = "";
    public FParamColor: string = "";
}

export class TWXTemplateSend {
    public FSendID: string = "";
    public FWXAppID: string = "";
    public FTemplateCode: string = "";
    public FWXOpenID: string = "";
    public FJumpUrl: string = "";
    public FPlanSendTime: string = "";
    public FParamsJson: string = "";
    public FSendTime: string = "";
    public FSendCount: number = 0;
    public FIsSend: boolean = false;
    public FIsCheckFail: boolean = false;
    public FSendResultMsg: string = "";
    public FCreateTime: string = "";
}

export class TWXTemplateOne {
    public wxTemplate: TWXTemplate = new TWXTemplate();
    public wxTemplateParams: TWXTemplateParams[] = [];
    public delParams: string[] = [];
}
export class TWXTemplateTestSend {
    public id: string = "";
    public openID: string = "";
    public data: any = {};
    public dataStr: string = "";
}
export default class WXAdminApi {
    //**************微信相关API*********************/
    //获取账号信息
    public static async GetWXAccountList(): Promise<IResult<TWXAccount[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/GetAccountList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //跟据ID获取一个账号信息
    public static async GetWXAccountByID(qAccountID: string): Promise<IResult<TWXAccount>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/GetAccountByID/" + qAccountID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存微信配置
    public static async SaveWXAccount(qAdd: TWXAccount): Promise<IResult<TWXAccount>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/SaveAccount");
        lRequest.data = qAdd;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //删除微信配置
    public static async DelWXAccountByID(qAccountID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/DelAccountByID/" + qAccountID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //刷新配置
    public static async InitWXAccountList(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/InitAccountList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取微信菜单
    public static async GetWXMenuListByAppID(qWXAppID: string): Promise<IResult<TWXMenu[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXMenu/GetWXMenuListByAppID/" + qWXAppID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async GetWXMenuByMenuID(qWXMenuID: string): Promise<IResult<TWXMenu>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXMenu/GetWXMenuByMenuID/" + qWXMenuID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //删除微信菜单
    public static async DelWXMenuByMenuID(qWXMenuID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXMenu/DelWXMenuByMenuID/" + qWXMenuID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存微信菜单
    public static async SaveWXMenu(qAdd: TWXMenu): Promise<IResult<TWXMenu>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXMenu/SaveWXMenu");
        lRequest.data = qAdd;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //推送微信菜单到微信服务器
    public static async PushWXMenuAsync(qWXAppID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXMenu/PushWXMenuAsync/" + qWXAppID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    //********模板相关API **********/
    public static async GetTemplateList(qWXAppID: string): Promise<IResult<TWXTemplate[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/GetTemplateList/" + qWXAppID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async GetTemplateOne(qID: string): Promise<IResult<TWXTemplateOne>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/GetTemplateOne/" + qID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async SaveTemplateOne(qAdd: TWXTemplateOne): Promise<IResult<TWXTemplateOne>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/SaveTemplateOne");
        lRequest.data = qAdd;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async DelTemplate(qID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/DelTemplate/" + qID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async RefreshTemplate(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/RefreshTemplate");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async TemplateTestSendAsync(qTestData: TWXTemplateTestSend): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/WXAdmin/TemplateTestSendAsync");
        lRequest.data = qTestData;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
}