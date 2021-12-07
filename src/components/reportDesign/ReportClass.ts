
export type evenReportCallBackClick = (qSet: TReportContainerSet) => {};
export enum enumReportContainerType { container, datahead, databody, dataend, datatotal, }
export class TReportContainerSet {
    public id = Date.now().toString();
    public caption = "新建元素";
    public style: CSSStyleDeclaration = {
        width: "400px",
        height: "400px",
        border: "1px solid",
    } as CSSStyleDeclaration;
    //子容器
    private _children: TReportContainerSet[] = [];
    public get children(): TReportContainerSet[] {
        return this._children;
    }
}