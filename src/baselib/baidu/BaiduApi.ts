import { IResult, TResult } from "@/baselib/aPublic/PublicClass";
import { THTTPRequest } from "@/baselib/aPublic/HTTPClient";
import TGlobal from "@/baselib/aPublic/GlobalHelper";

//请求的类
export class TBaiduOCRFormData {
    appID: string = ""; //指定百度账号，为空默认取后台管理启用的第一个
    file: Blob = new Blob(); //上传的文件
    fileName: string = ""; //当上传的是压缩文件，文件名会丢失
    fileCode: string = ""; //是否保存在base_file,-1默认保存在默认的文件管理
    jobID: string = ""; //保存在base_file.FJobID
    isBack: string = ""; //1为身份证背面
}
//返回的结果
export class TBaiduOCRIDCard {
    public fileID: string = ""; //当结合ModuleFile保存在base_file返回的fileID
    public cardAddress: string = "";  //地址
    public cardIdNumber: string = ""; //身份证信息
    public cardBirthDate: string = ""; //出身年月
    public cardPersonName: string = ""; //姓名
    public cardPersonSex: string = ""; //姓别
    public cardPersonNation: string = ""; //民族
    public cardImgStatus: string = ""; //图片识别信息
}
export default class TBaiduApi {
    //身份证识别
    public static async IDCardOCRAsync(qCard: TBaiduOCRFormData): Promise<IResult<TBaiduOCRIDCard>> {
        let lFormData: FormData = new FormData();
        lFormData.append("appID", qCard.appID);
        lFormData.append("file", qCard.file);
        lFormData.append("fileName", qCard.fileName);
        lFormData.append("fileCode", qCard.fileCode);
        lFormData.append("jobID", qCard.jobID);
        lFormData.append("isBack", qCard.isBack);
        let lResult: TResult;
        let lRequest = THTTPRequest.createNew();
        lRequest.url = TGlobal.urlCombination("/BaiduHelper/IDCardOCR/IDCardOCRAsync");
        lRequest.data = lFormData;
        lResult = await lRequest.postAsync();
        if (lResult == null) {
            lResult = TResult.createNew();
            lResult.resultMsg = "异常消息:结果为null"
        }
        return lResult;
    }
}
//***********demo********** */
// private async onIDCardAfterRead(file: any) {
//     //
//     let lFile = file.file as File;
//     let lCompressorResult = await new Promise((resolve, reject) => {
//       //压缩
//       new Compressor(lFile, {
//         success: resolve,
//         error: reject,
//       });
//     });
//     let lBlob = lCompressorResult as Blob;
//     let lPostData: TBaiduOCRFormData = new TBaiduOCRFormData();
//     lPostData.appID = "";
//     lPostData.file = lBlob;
//     lPostData.fileName = lFile.name;
//     lPostData.fileCode = "-1"; //保存在base_file
//     lPostData.jobID = this.roomContract.FContractID;
//     lPostData.isBack = ""; //
//     let lResult = await TBaiduApi.IDCardOCRAsync(lPostData);
//     if (!lResult.resultSuccess) {
//       this.$myDialog.alterErr(lResult.resultMsg);
//       return;
//     }
//     this.roomContract.FIDCardFileID = lResult.resultData.fileID;
//     this.roomContract.FUserName = lResult.resultData.cardPersonName;
//     this.roomContract.FUsreIDCard = lResult.resultData.cardIdNumber;
//   }