import store, { TTokenInfo } from "@/store";
import { IResult, TResult } from "@/baselib/aPublic/PublicClass";
import TGlobal from "@/baselib/aPublic/GlobalHelper";
import { THTTPRequest } from "@/baselib/aPublic/HTTPClient";
import { TStringHelper } from "@/baselib/aPublic/StringHelper";

export default class LoginApi {
    //操作员登陆->base_admin表
    public static async adminLogin(qLoginCode: string, qLoginPass: string, verCode: string = ""): Promise<IResult<TTokenInfo>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/Login/AdminLogin");
        lRequest.data = { "loginCode": qLoginCode, "loginPass": qLoginPass, "verCode": verCode }
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
    //用户角色登陆->base_user表
    public static async userLogin(qLoginCode: string, qLoginPass: string, verCode: string = ""): Promise<IResult<TTokenInfo>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/Login/UserLogin");
        lRequest.data = { "loginCode": qLoginCode, "loginPass": qLoginPass, "verCode": verCode }
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

    //自定义配置登陆
    public static async ModuleLogin(qModuleLoginCode: string, qLoginCode: string, qLoginPass: string, verCode: string = ""): Promise<IResult<TTokenInfo>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/Login/ModuleLogin");
        lRequest.data = { moduleLogin: qModuleLoginCode, "loginCode": qLoginCode, "loginPass": qLoginPass, "verCode": verCode }
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
    //
    public static async LoginOut(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/Login/LoginOut");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
}