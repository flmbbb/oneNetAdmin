import { IPageRequest, IResult, TPageInfo, TResult } from "@/baselib/aPublic/PublicClass";
import { THTTPRequest } from "@/baselib/aPublic/HTTPClient";
import TGlobal from "@/baselib/aPublic/GlobalHelper";

export const TMyMenuCmdModeClass = {
    document: "文档",
    question: "问题",
    urlJump: "URL跳转",
    pageJump: "页面调用"
}

export const TMyMenuCmdMode = [{
    "value": "菜单",
    "label": "菜单"
}, {
    "value": "文档",
    "label": "文档"
}, {
    "value": "问题",
    "label": "问题"
}, {
    "value": "URL跳转",
    "label": "URL跳转"
}, {
    "value": "页面调用",
    "label": "页面调用"
}];

export class TBaseCms {
    public FCMSID: string = "";
    public FCMSCode: string = "";
    public FCMSName: string = "";
    public FCMSClass: string = "";
    public FCreateID: string = "";
    public FCreateName: string = "";
    public FCreateTime: string = "";
}

export class TBaseCmsSet {
    public FSetID: string = "";
    public FCMSID: string = "";
    public FOrderNumber: number = 0;
    public FSetAttriName: string = "";
    public FSetAttriValue: string = "";
}
export class TBaseCmsMenu {
    public FMenuID: string = "";
    public FPMenuID: string = "";
    public FCMSID: string = "";
    public FTreeCode: string = "";
    public FMenuName: string = "";
    public FMenuCmdMode: string = "";
    public FMenuCmdCode: string = "";
}

export class TBaseCmsQuestion {
    public FQuestionID: string = "";
    public FCMSID: string = "";
    public FCMSMenuID: string = "";
    public FQuestionTitle: string = "";
    public FQuestionKeys: string = "";
    public FQuestionDescribe: string = "";
    public FCreateID: string = "";
    public FCreateName: string = "";
    public FCreateTime: string = "";
}

export default class TCMSApi {
    public static async GetCmsList(): Promise<IResult<TBaseCms[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/CmsHelper/GetCmsList");
        lRequest.data = {}
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async SaveCms(qAdd: TBaseCms) {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/CmsHelper/SaveCms");
        lRequest.data = qAdd
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async GetCmsMenuList(qCMSID: string): Promise<IResult<TBaseCmsMenu[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/CmsHelper/GetCmsMenuList/" + qCMSID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async GetCmsMenuListByIDCode(qIDCode: string): Promise<IResult<TBaseCmsMenu[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/CmsHelper/GetCmsMenuListByIDCode/" + qIDCode);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async GetCmsMenuByID(qMenuID: string): Promise<IResult<TBaseCmsMenu>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/CmsHelper/GetCmsMenuByID/" + qMenuID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async SaveCmsMenu(qAdd: TBaseCmsMenu): Promise<IResult<TBaseCmsMenu>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/CmsHelper/SaveCmsMenu");
        lRequest.data = qAdd
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async PostFile(qFormData: FormData): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/CmsHelper/PostFile");
        lRequest.data = qFormData;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async GetCmsHTMLContent(qFileID: string): Promise<IResult<string>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/CmsHelper/GetCmsHTMLContent/" + qFileID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async GetQuestionListByMenuID(qMenuID: string): Promise<IResult<TBaseCmsQuestion[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/CmsHelper/GetQuestionListByMenuID/" + qMenuID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async SaveQuestion(qAdd: TBaseCmsQuestion): Promise<IResult<TBaseCmsQuestion>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/CmsHelper/SaveQuestion");
        lRequest.data = qAdd
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    public static async QueryQuestionList(qPageInfo: TPageInfo, qFilters: any): Promise<IResult<TBaseCmsQuestion[]>> {
        // qPageInfo：TPageInfo 用在本地的，因为它的实现 pageSize等是方法，无法序列化成属性
        let lPageRequest: IPageRequest = { pageSize: qPageInfo.pageSize, pageIndex: qPageInfo.pageIndex, filters: qFilters } as IPageRequest;
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/CmsHelper/QueryQuestionList");
        lRequest.data = lPageRequest
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

}