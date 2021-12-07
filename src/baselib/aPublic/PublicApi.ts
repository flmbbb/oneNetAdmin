import TGlobal from "@/baselib/aPublic/GlobalHelper";
import { THTTPRequest, TResultFormat } from "@/baselib/aPublic/HTTPClient";
import {
  IResult,
  TFastApiRequest,
  TResult,
  TReportPostData,
} from "@/baselib/aPublic/PublicClass";
import { TStringHelper } from "@/baselib/aPublic/StringHelper";

export default class PublicApi {
  //******FastApi公共接口******/
  public static createNewModuleInfo(): TFastApiRequest {
    return new TFastApiRequest();
  }
  //FastApi查询接口
  public static async fastAPI(qModuleInfo: TFastApiRequest): Promise<TResult> {
    let lResult: TResult;
    let lRequest = THTTPRequest.createNew();
    lRequest.url = TGlobal.urlCombination("/OneService/FastHelper/FastModule");
    lRequest.data = qModuleInfo;
    if (TStringHelper.stringIsEmptyYW(qModuleInfo.dbCode)) {
      qModuleInfo.dbCode = TGlobal.dbCode;
    }
    lResult = await lRequest.postAsync();
    if (lResult == null) {
      lResult = TResult.createNew();
      lResult.resultMsg = "异常消息:结果为null";
    }
    return lResult;
  }
  //报表打印接口
  public static async FastReport(
    qReportPostData: TReportPostData
  ): Promise<IResult<string>> {
    let lResult: TResult;
    let lRequest = THTTPRequest.createNew();
    lRequest.url = TGlobal.urlCombination(
      "/OneService/ReportHelper/FastReport"
    );
    lRequest.data = qReportPostData;
    lRequest.resultFormat = TResultFormat.fileDown;
    lResult = await lRequest.postAsync();
    if (lResult == null) {
      lResult = TResult.createNew();
      lResult.resultMsg = "异常消息:结果为null";
    }
    return lResult;
  }
}
