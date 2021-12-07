import { IResult, TResult } from "@/baselib/aPublic/PublicClass";
import TGlobal from "@/baselib/aPublic/GlobalHelper";
import { THTTPRequest, TResultFormat } from "@/baselib/aPublic/HTTPClient";

export class TBaseReport {
  public FReportID: string = "";
  public FReportCode: string = "";
  public FReportName: string = "";
  public FReportRemark: string = "";
  public FFilePath: string = "";
  public FModuleCode: string = "";
  public FCreateTime: string = "";
}
export default class ReportAdminApi {
  public static async GetBaseReportList(): Promise<IResult<TBaseReport[]>> {
    let lResult: TResult;
    let lRequest = THTTPRequest.createNew();
    lRequest.url = TGlobal.urlCombination(
      "/OneService/ReportHelper/GetBaseReportList"
    );
    lRequest.data = {};
    lResult = await lRequest.getAsync();
    if (lResult == null) {
      lResult = TResult.createNew();
      lResult.resultMsg = "异常消息:结果为null";
    }
    return lResult;
  }

  public static async GetBaseReportByID(
    qReportID: string
  ): Promise<IResult<TBaseReport>> {
    let lResult: TResult;
    let lRequest = THTTPRequest.createNew();
    lRequest.url = TGlobal.urlCombination(
      "/OneService/ReportHelper/GetBaseReportByID/" + qReportID
    );
    lRequest.data = {};
    lResult = await lRequest.getAsync();
    if (lResult == null) {
      lResult = TResult.createNew();
      lResult.resultMsg = "异常消息:结果为null";
    }
    return lResult;
  }

  public static async SaveBaseReport(
    qRport: TBaseReport
  ): Promise<IResult<TBaseReport>> {
    let lResult: TResult;
    let lRequest = THTTPRequest.createNew();
    lRequest.url = TGlobal.urlCombination(
      "/OneService/ReportHelper/SaveBaseReport"
    );
    lRequest.data = qRport;
    lResult = await lRequest.postAsync();
    if (lResult == null) {
      lResult = TResult.createNew();
      lResult.resultMsg = "异常消息:结果为null";
    }
    return lResult;
  }

  //报表文件上传
  //表单参数 reportID:报表ID，  fileName:文件名称
  public static async UploadReportAsync(qFormData: FormData): Promise<TResult> {
    let lResult: TResult;
    let lRequest = THTTPRequest.createNew();
    lRequest.setHeadersUrlencoded();
    lRequest.url = TGlobal.urlCombination(
      "/OneService/ReportHelper/UploadReportAsync"
    );
    lRequest.data = qFormData;
    lResult = await lRequest.postAsync();
    if (lResult == null) {
      lResult = TResult.createNew();
      lResult.resultMsg = "异常消息:结果为null";
    }
    return lResult;
  }

  public static async DownReportFile(
    qReportID: string
  ): Promise<IResult<TBaseReport>> {
    let lResult: TResult;
    let lRequest = THTTPRequest.createNew();
    lRequest.url = TGlobal.urlCombination(
      "/OneService/ReportHelper/DownReportFile/" + qReportID
    );
    lRequest.data = {};
    lRequest.resultFormat = TResultFormat.fileDown;
    lResult = await lRequest.getAsync();
    if (lResult == null) {
      lResult = TResult.createNew();
      lResult.resultMsg = "异常消息:结果为null";
    }
    return lResult;
  }
}
