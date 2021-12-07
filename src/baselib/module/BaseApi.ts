
import {
    TBaseUser, TModuleBase, TModuelInfo, TDBHelper, TModuleField,
    TModuleFileSet, TProcessSet, TProcessSetInfo, TProcesSetStep
} from "./BaseClass"
import { THTTPRequest } from "../aPublic/HTTPClient"
import { TGlobal } from "../aPublic/GlobalHelper"
import { TTokenInfo } from "@/store";
import { TStringHelper } from "../aPublic/StringHelper";
import { IResult, TResult } from "@/baselib/aPublic/PublicClass";

export default class TBaseAPI {
    //模板管理
    public static async getModuleList(): Promise<IResult<TModuleBase[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/GetModuleList");
        lRequest.data = {}
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取模块信息
    public static async getModuleInfo(qModuleID: string): Promise<IResult<TModuelInfo>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/GetModuleInfo/" + qModuleID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存模块信息
    public static async saveModuleInfo(qModuleInfo: TModuelInfo): Promise<IResult<TModuelInfo>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/SaveModuleInfo");
        lRequest.data = qModuleInfo
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //添加模板
    public static async addModule(qAdd: TModuleBase): Promise<IResult<TModuleBase>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/AddModule");
        lRequest.data = qAdd
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //删除模板
    public static async delModuleInfo(qModuleID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/DelModuleInfo/" + qModuleID);
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //刷新服务端模板
    public static async initModule(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/InitModule");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //跟据表名获取字段
    public static async GetDataFields(qTableName: string): Promise<IResult<TModuleField[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/GetDataFields/" + qTableName);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //获取服务端账套配置
    public static async getDBList(): Promise<IResult<TDBHelper>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/DBHelper/GetDBList");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存服务端账套配置
    public static async saveDBList(qDBHelper: TDBHelper): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/DBHelper/SaveDBList");
        lRequest.data = qDBHelper;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //刷新服务端账套配置
    public static async refreshDBList(): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/DBHelper/RefreshDBList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //初始化账套基本数据库
    public static async initDBFirst(qDBCode: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/DBHelper/InitDBFirst/" + qDBCode);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    //用户角色注册
    public static async userRegister(qUserInfo: TBaseUser): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/UserHelper/UserRegister");
        lRequest.data = qUserInfo;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //用户角色登出
    public static async userLoginOut(qUserInfo: TTokenInfo): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/UserHelper/UserLoginOut");
        lRequest.data = qUserInfo;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        if (lResult.resultSuccess) {
            //重新赋值一个新的
            TTokenInfo.initTokenInfo(qUserInfo);
        }
        return lResult;
    }
    //用户角色更改密码
    public static async userChangePass(qOldPass: string, qNewPass: String): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/OneService/UserHelper/UserChangePass");
        lRequest.data = "oldPass=" + qOldPass + "&newPass=" + qNewPass;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //用户绑定 FFaceFileID
    public static async userFaceFileIDBind(qFileID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/OneService/UserHelper/UserFaceFileIDBind");
        lRequest.url = TStringHelper.urlJoinParams(lRequest.url, "fileID", qFileID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //*********************文件配置****************************//
    public static async getModuleFileSetList(): Promise<IResult<TModuleFileSet[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/GetModuleFileSetList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //保存文件配置
    public static async saveModuleFileSet(qFileSet: TModuleFileSet): Promise<IResult<TModuleFileSet>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/SaveModuleFileSet");
        lRequest.data = qFileSet;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //删除文件配置
    public static async delModuleFileSet(qFileSetID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/DelModuleFileSet/" + qFileSetID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //人脸--图片判断是不是人脸
    public static async faceCheckByFileID(qFileID: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/fastService/FaceApi/FaceCheckByFileID");
        lRequest.url = TStringHelper.urlJoinParams(lRequest.url, "fileID", qFileID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //人脸--图片人脸对比
    public static async faceCompare(qSourceFile: string, qDestFile: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/fastService/FaceApi/FaceCompare");
        lRequest.setHeadersUrlencoded();
        lRequest.data = "sourceFile=" + qSourceFile + "&destFile=" + qDestFile;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async faceTokenAuthor(qDestFile: string): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/fastService/FaceApi/FaceTokenAuthor");
        lRequest.setHeadersUrlencoded();
        lRequest.data = "destFile=" + qDestFile;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //**************流程步骤相关API**************/
    public static async GetProcessSetList(): Promise<IResult<TProcessSet[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/ProcessSet/GetProcessSetList");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async SaveProcessSet(qSet: TProcessSet): Promise<IResult<TProcessSet>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/ProcessSet/SaveProcessSet");
        lRequest.data = qSet;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async GetProcessSetInfo(): Promise<IResult<TProcessSetInfo[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/ProcessSet/GetProcessSetInfo");
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async SaveSetSetp(qAdd: TProcesSetStep): Promise<IResult<TProcesSetStep[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/ProcessSet/SaveSetSetp");
        lRequest.data = qAdd;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }



}