export default class FileDialogApi {
    //accept文件类型过滤  isMultiple是否可以多选文件,
    //image/* 所有图片格式  video/* 所有视频格式
    //image/jpeg 指定jpeg格式，  image/jpeg,image/gif 指定多个格式，具体参考百度input type=file 文件类型过滤
    public static async OpenFileDialog(accept: string = "*", isMultiple: boolean = false): Promise<FileList> {
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        if (isMultiple) {
            input.setAttribute('multiple', '');
        }
        if (accept !== undefined && accept.length > 0) {
            input.setAttribute('accept', accept);
        }
        input.style.display = 'none';
        input.setAttribute('id', 'hidden-file');
        document.body.appendChild(input);
        let lResult = await new Promise<FileList>((resolve, reject) => {
            input.addEventListener('change', e => {
                if (input.files != null) {
                    return resolve(input.files)
                }
                // IE10/11 Addition
                document.body.removeChild(input)
            })
            // Simluate click event
            input.click();
        })
        return lResult;
    }
} 