import TGlobal from "@/baselib/aPublic/GlobalHelper";
import { THTTPRequest, TResultFormat } from "@/baselib/aPublic/HTTPClient";
import { IResult, TFileReturn, TResult } from "@/baselib/aPublic/PublicClass";
import Compressor from "compressorjs";

export interface ICompressorResult {
    isSucess: boolean;
    file: File;
    blob: Blob;
    errMsg: string;
}
//********文件上传下载相关Api******/
export default class UploadFileApi {
    //************************文件上传*************************/
    //FormData参数 jobID:关联业务ID，detailID:关联业务明细ID，remark:备注,
    //customerTag:自定义内容
    public static async uploadFile(qFormData: FormData): Promise<TResult> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.setHeadersUrlencoded();
        lRequest.url = TGlobal.urlCombination("/OneService/FileHelper/PostFile");
        lRequest.data = qFormData;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //文件预览 url路径:/OneService/FileHelper/BrowserFileByID
    public static BrowserFileByID(qFileID: string, qFileCode: string = ""): string {
        let lUrl = TGlobal.urlCombination("/OneService/FileHelper/BrowserFileByID");
        lUrl = lUrl + "?fileID=" + qFileID;
        if (qFileCode != "") {
            lUrl = lUrl + "&fileCode=" + qFileCode;
        }
        return lUrl;
    }
    //文件下载
    public static async DownFileByID(qFileID: string, qFileCode: string = "") {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew(true);
        lRequest.url = TGlobal.urlCombination("/OneService/FileHelper/DownFileByID");
        lRequest.url = lRequest.url + "?fileID=" + qFileID;
        if (qFileCode != "") {
            lRequest.url = lRequest.url + "&fileCode=" + qFileCode;
        }
        lRequest.data = {};
        lRequest.resultFormat = TResultFormat.fileDown;
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //文件删除,删除记录加文件
    public static async DelFileByID(qFileID: string) {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FileHelper/DelFileByID/" + qFileID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    //文件删除,删除记录但不删除文件
    public static async DelFileToHis(qFileID: string) {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FileHelper/DelFileToHis/" + qFileID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
    public static async GetFileIDByJobID(qJobID: string): Promise<IResult<TFileReturn[]>> {
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/OneService/FileHelper/GetFileIDByJobID/" + qJobID);
        lRequest.data = {};
        lResult = await lRequest.getAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }

    //压缩功能,只能是图片文件，其它的格式不行，注意文件的到时在看
    public static async CompressorImgFile(qItem: File): Promise<ICompressorResult> {

        let lResult = await new Promise<ICompressorResult>((resolve, reject) => {
            //压缩
            new Compressor(qItem, {
                success: (item: File) => {
                    let lResult: ICompressorResult = { isSucess: false, file: qItem, blob: new Blob(), errMsg: "" };
                    lResult.isSucess = true;
                    lResult.file = item;
                    resolve(lResult);
                },
                error: (err: Error) => {
                    let lResult: ICompressorResult = { isSucess: false, file: qItem, blob: new Blob(), errMsg: "" };
                    lResult.isSucess = false;
                    lResult.errMsg = err.message;
                    resolve(lResult);
                },
            });
        });
        return lResult;
    }

}

//************DEMO*************//
//打开文件，压缩文件
// private async onUploadFile(qItem: TBaseReport) {
//     let lFiles = await FileDialogApi.OpenFileDialog();
//     //上传文件
//     let lFile = lFiles[0];
//     //压缩上传
//     let lCompressorResult = await UploadFileApi.CompressorImgFile(lFile);
//     if (!lCompressorResult.isSucess) {
//       //压缩失败
//       this.$myMsgHelp.msgDialog(lCompressorResult.errMsg);
//       return;
//     }
//     //
//   }