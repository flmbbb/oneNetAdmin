export enum emDateFormat {
    YMD = "yyyy-MM-dd",
    YMDLink = "yyyyMMdd",
    YMDHMS = "yyyy-MM-dd HH:mm:ss",
    YMDHMSLink = "yyyyMMddHHmmss",
    YYYY = "yyyy",
    YY = "yy",
    YM = "yyyy-MM",
    YMLink = "yyyyMM"
}


class DateFormatOption {
    "M+": number;//月
    "d+": number;//日
    "H+": number;//小时
    "m+": number;//分
    "s+": number;//秒
    "q+": number;//季度
    "S+": number;//毫秒
}

export default class DateHelper {
    //格式化时间
    public static FormatDate(date: Date, qFmt: emDateFormat): string {
        const options = new DateFormatOption();
        options["M+"] = date.getMonth() + 1;
        options["d+"] = date.getDate();
        options["H+"] = date.getHours();
        options["m+"] = date.getMinutes();
        options["s+"] = date.getSeconds();
        options["q+"] = Math.floor((date.getMonth() + 3) / 3);
        options["S+"] = date.getMilliseconds();
        let fmt = qFmt.toString();
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (const i in options) {
            const key = i as keyof DateFormatOption;//转换key格式
            if (new RegExp("(" + i + ")").test(fmt)) {
                let matchZeros = "";//补零
                for (let j = 0; j < RegExp.$1.length; j++) {
                    matchZeros += "0";
                }
                const newVal = (matchZeros + options[key]).substr(("" + options[key]).length);
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (options[key]).toString() : newVal);
            }
        }
        return fmt;
    }
    //格式化现在时间
    public static FormatDateNow(qFmt: emDateFormat = emDateFormat.YMD): string {
        return DateHelper.FormatDate(new Date(), qFmt)
    }
}