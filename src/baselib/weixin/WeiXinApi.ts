import { IResult, TResult } from "@/baselib/aPublic/PublicClass";
import { THTTPRequest } from "@/baselib/aPublic/HTTPClient";
import TGlobal from "@/baselib/aPublic/GlobalHelper";
import store, { TTokenInfo } from "@/store";
import { TStringHelper } from "@/baselib/aPublic/StringHelper";

//********微信相关参数**********/
export class TWXUser {
    public appid: string = "";
    public openid: string = "";
    public nickname: string = "";
    public sex: string = "";
    public province: string = "";
    public city: string = "";
    public country: string = "";
    public headimgurl: string = "";
    public privilege: string = "";
    public unionid: string = "";
    public isDeveloper: boolean = false;//在基础表wx_user设置 FIsDeveloper
}
export class TWXAuthorResult {
    user: TWXUser = new TWXUser();
    cmdParams: any;
}

export class TWXUserBind {
    public FBindID: string = "";
    public FYWUserType: string = "";
    public FYWUserTypeName: string = "";
    public FYWUserID: string = "";
    public FYWUserName: string = "";
}

export default class WeiXinApi {
    //获取微信账号信息
    public static async GetWXUserInfoByAuthorCode(WXCode: string, WXState: string): Promise<IResult<TWXAuthorResult>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/WXAuth/GetUserInfoByAuthorCode");
        lRequest.data = { code: WXCode, state: WXState };
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取绑定用户账号，可能一个微信号绑多个用户,跟据 WXState(安全，登陆用完即抛弃)
    public static async GetWXBindList(WXState: string): Promise<IResult<TWXUserBind[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/WXAuth/GetWXBindList/" + WXState);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //微信登陆
    public static async WXUserLogin(WXState: string, WXBindID: string) {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/WXAuth/WXUserLogin");
        lRequest.data = { code: "", state: WXState, bindID: WXBindID };
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        if (lResult.resultSuccess) {
            //写入全局信息
            if (lResult.resultData.tokenID == undefined) {
                lResult.resultSuccess = false;
                lResult.resultMsg = "登陆成功,但返回的信息格式不正确【" + JSON.stringify(lResult.resultData) + "】";
            }
            else {
                store.state.tokenInfo.isLogin = true;
                store.state.tokenInfo.tokenID = lResult.resultData.tokenID;
                store.state.tokenInfo.privateKey = lResult.resultData.privatekey;
                store.state.tokenInfo.loginCode = lResult.resultData.loginCode;;
                store.state.tokenInfo.userID = lResult.resultData.userID;
                store.state.tokenInfo.userName = lResult.resultData.userName;
                store.state.tokenInfo.userRole = lResult.resultData.userRole;
                store.state.tokenInfo.loginTime = Date.now();
                store.state.tokenInfo.lastTime = store.state.tokenInfo.loginTime;
                if (TStringHelper.stringIsEmpty(store.state.tokenInfo.privateKey)) {
                    store.state.tokenInfo.privateKey = "";
                }
                //保存到缓存
                TTokenInfo.saveLocalStorage(store.state.tokenInfo);
            }
        }
        return lResult;
    }
}