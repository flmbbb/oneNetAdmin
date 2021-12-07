
import { emAuthorRole } from '@/baselib/aPublic/PublicClass';
import { TWXUser } from '@/baselib/weixin/WeiXinApi';
import { createStore } from 'vuex'

//用户信息缓存
export class TTokenInfo {
    public static storageName = "token";
    public isLogin: boolean = false; //是否登陆
    public tokenID: string = "";  //交互token
    public privateKey: string = "";  //用户私钥
    public userID: string = "";   //用户ID
    public userName: string = "游客"; //用户名称
    public loginCode: string = "";
    public loginPass: string = ""; //用户密码
    public loginTime: number = 0;
    public lastTime: number = 0;
    public userInfo: any = {};  //用户其它信;
    public userCookies = ""; //Cookies
    public userWX: TWXUser = new TWXUser();
    public userRole: emAuthorRole = emAuthorRole.noneRole;
    public static initTokenInfo(qTokenInfo: TTokenInfo): void {
        qTokenInfo.isLogin = false; //是否登陆
        qTokenInfo.tokenID = "";  //交互token
        qTokenInfo.privateKey = "";  //用户私钥
        qTokenInfo.userID = "";   //用户ID
        qTokenInfo.userName = "游客"; //用户名称
        // qTokenInfo.loginCode = ""; //不清保留
        qTokenInfo.loginPass = ""; //用户密码
        qTokenInfo.userInfo = {};  //用户其它信息
        qTokenInfo.userCookies = ""; //Cookies
        //清locastarol
        localStorage.removeItem(TTokenInfo.storageName);
    }
    public static saveLocalStorage(qTokenInfo: TTokenInfo): void {
        localStorage.setItem(TTokenInfo.storageName, JSON.stringify(qTokenInfo));
        let lTempStr = localStorage.getItem(TTokenInfo.storageName);
    }
    public static loadLocalStorage(): TTokenInfo {
        let lJsonStr = localStorage.getItem(TTokenInfo.storageName);
        if (lJsonStr != null) {
            let lTokenInfo: TTokenInfo;
            lTokenInfo = JSON.parse(lJsonStr) as TTokenInfo;
            let lNow = Date.now();
            //不存在最后交互时间和已经无交互超过半小时
            if (!lTokenInfo.lastTime || (lNow - lTokenInfo.lastTime) >= 30 * 60 * 1000) {
                return new TTokenInfo();
            }
            return lTokenInfo;
        } else {
            return new TTokenInfo();
        }

    }
}

export const defaultTag: IMenuItem = {
    menuIndexName: "-1", //索引值一般是唯一的
    menuComponent: '',  //挂载的组件
    menuTitle: '',  //标题
    menuIcon: '',//图标
    menuParams: {},//参数
    menuChildren: []
};
export interface IMenuItem {
    menuIndexName: string;  //索引值一般是唯一的，同个控件indexName不同就可以多开
    menuComponent: string;  //挂载的组件
    menuTitle: string;  //标题
    menuIcon: string; //图标
    menuParams: any; //参数
    menuChildren: IMenuItem[]; //子菜单
}
export class TMenuList {
    itemTags: IMenuItem[] = [];
}
const menuList: IMenuItem[] = [
    {
        menuIndexName: "TDashboard",
        menuComponent: "TDashboard",
        menuTitle: "主页",
        menuIcon: "el-icon-s-home",
        menuParams: {},
        menuChildren: []
    },
    {
        menuIndexName: "NetAdminManage",
        menuComponent: "",
        menuTitle: "后台管理",
        menuIcon: "el-icon-s-tools",
        menuParams: {},
        menuChildren: [
            {
                menuIndexName: "TFormModuleManage",
                menuComponent: "TFormModuleManage",
                menuTitle: "模块管理",
                menuIcon: "el-icon-menu",
                menuParams: {},
                menuChildren: [
                ],
            },
            {
                menuIndexName: "TFormModuleDB",
                menuComponent: "TFormModuleDB",
                menuTitle: "数据库管理",
                menuIcon: "el-icon-coin",
                menuParams: {},
                menuChildren: [
                ],
            },
            {
                menuIndexName: "TFormModuleFileSet",
                menuComponent: "TFormModuleFileSet",
                menuTitle: "文件配置管理",
                menuIcon: "el-icon-folder",
                menuParams: {},
                menuChildren: [
                ],
            },
            {
                menuIndexName: "TFormLshList",
                menuComponent: "TFormLshList",
                menuTitle: "流水号配置",
                menuIcon: "el-icon-s-operation",
                menuParams: {},
                menuChildren: [
                ],
            },
            {
                menuIndexName: "TFormModuleLoginList",
                menuComponent: "TFormModuleLoginList",
                menuTitle: "模块登陆配置",
                menuIcon: "el-icon-orange",
                menuParams: {},
                menuChildren: [
                ],
            },
            {
                menuIndexName: "TFormProcessSetList",
                menuComponent: "TFormProcessSetList",
                menuTitle: "流程步骤",
                menuIcon: "el-icon-orange",
                menuParams: {},
                menuChildren: [
                ],
            },
            {
                menuIndexName: "TFormReportList",
                menuComponent: "TFormReportList",
                menuTitle: "报表配置",
                menuIcon: "el-icon-orange",
                menuParams: {},
                menuChildren: [
                ],
            }
        ],
    },
    {
        menuIndexName: "BaiduAdminManage",
        menuComponent: "",
        menuTitle: "界面设计",
        menuIcon: "el-icon-chat-dot-round",
        menuParams: {},
        menuChildren: [
            {
                menuIndexName: "TFormCreateDesign",
                menuComponent: "TFormCreateDesign",
                menuTitle: "界面动态设计",
                menuIcon: "el-icon-wallet",
                menuParams: {},
                menuChildren: [
                ]
            },
            {
                menuIndexName: "DragDemo1",
                menuComponent: "DragDemo1",
                menuTitle: "拖动Demo1",
                menuIcon: "el-icon-wallet",
                menuParams: {},
                menuChildren: [
                ]
            },

        ],
    },
    {
        menuIndexName: "RightManage",
        menuComponent: "",
        menuTitle: "权限管理",
        menuIcon: "el-icon-s-custom",
        menuParams: {},
        menuChildren: [
            {
                menuIndexName: "GroupManage",
                menuComponent: "",
                menuTitle: "组织管理",
                menuIcon: "el-icon-user-solid",
                menuParams: {},
                menuChildren: [
                    {
                        menuIndexName: "CompanyClassManage",
                        menuComponent: "TFormCompanyClass",
                        menuTitle: "组织类型",
                        menuIcon: "el-icon-document",
                        menuParams: {},
                        menuChildren: [

                        ]
                    },
                    {
                        menuIndexName: "CompanyManage",
                        menuComponent: "TFormCompany",
                        menuTitle: "组织架构",
                        menuIcon: "el-icon-office-building",
                        menuParams: {},
                        menuChildren: [

                        ]
                    },
                ],
            },
            {
                menuIndexName: "RoleManage",
                menuComponent: "TFormRoleList",
                menuTitle: "角色管理",
                menuIcon: "el-icon-thumb",
                menuParams: {},
                menuChildren: [

                ],
            },
            {
                menuIndexName: "AdminManage",
                menuComponent: "TFormAdminList",
                menuTitle: "用户管理",
                menuIcon: "el-icon-postcard",
                menuParams: {},
                menuChildren: [

                ],
            }
        ],
    },
    {
        menuIndexName: "WXManage",
        menuComponent: "",
        menuTitle: "微信功能",
        menuIcon: "el-icon-chat-dot-round",
        menuParams: {},
        menuChildren: [
            {
                menuIndexName: "TFormWXAccount",
                menuComponent: "TFormWXAccount",
                menuTitle: "微信账号管理",
                menuIcon: "el-icon-wallet",
                menuParams: {},
                menuChildren: [
                ]
            },
        ],
    },
    {
        menuIndexName: "BaiduAdminManage",
        menuComponent: "",
        menuTitle: "百度相关功能",
        menuIcon: "el-icon-chat-dot-round",
        menuParams: {},
        menuChildren: [
            {
                menuIndexName: "TFormBaiduAccountList",
                menuComponent: "TFormBaiduAccountList",
                menuTitle: "百度账号管理",
                menuIcon: "el-icon-wallet",
                menuParams: {},
                menuChildren: [
                ]
            },
        ],
    },
    {
        menuIndexName: "CmsManger",
        menuComponent: "",
        menuTitle: "Cms管理",
        menuIcon: "el-icon-chat-dot-round",
        menuParams: {},
        menuChildren: [
            {
                menuIndexName: "TFormCmsList",
                menuComponent: "TFormCmsList",
                menuTitle: "CMS管理列表",
                menuIcon: "el-icon-wallet",
                menuParams: {},
                menuChildren: [
                ]
            }
        ],
    },
    {
        menuIndexName: "EchartsDemo",
        menuComponent: "",
        menuTitle: "图表相关功能",
        menuIcon: "el-icon-chat-dot-round",
        menuParams: {},
        menuChildren: [
            {
                menuIndexName: "TEchartDemo1",
                menuComponent: "TEchartDemo1",
                menuTitle: "图表1测试",
                menuIcon: "el-icon-wallet",
                menuParams: {},
                menuChildren: [
                ]
            }
        ],
    },
    {
        menuIndexName: "VxeTable",
        menuComponent: "",
        menuTitle: "vxe-table相关功能",
        menuIcon: "el-icon-chat-dot-round",
        menuParams: {},
        menuChildren: [
            {
                menuIndexName: "vxTableTest",
                menuComponent: "vxTableTest",
                menuTitle: "大数据测试",
                menuIcon: "el-icon-wallet",
                menuParams: {},
                menuChildren: [
                ]
            }
        ],
    }
]
export default createStore({
    state: {
        menuList: menuList,
        tagsList: new TMenuList(),
        indexTag: defaultTag,
        collapse: false,
        tokenInfo: new TTokenInfo(),
    },
    mutations: {
        hadndleCollapse(state, data) {
            state.collapse = data;
        }
    },
    actions: {},
    modules: {}
})