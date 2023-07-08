#pragma checksum "C:\Users\HP\source\repos\HappyPlace\HappyPlace\Views\Menu\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8e6346439fb97e43757e169005bb867d27e82dc4"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Menu_Index), @"mvc.1.0.view", @"/Views/Menu/Index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\HP\source\repos\HappyPlace\HappyPlace\Views\_ViewImports.cshtml"
using HappyPlace;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\HP\source\repos\HappyPlace\HappyPlace\Views\_ViewImports.cshtml"
using HappyPlace.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8e6346439fb97e43757e169005bb867d27e82dc4", @"/Views/Menu/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"3a26b6982d6e8610a0af095d3e5ece039acd62bc", @"/Views/_ViewImports.cshtml")]
    #nullable restore
    public class Views_Menu_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    #nullable disable
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/lib/metronic/css/StyleCustom.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("rel", new global::Microsoft.AspNetCore.Html.HtmlString("stylesheet"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/app/controllers/setupMenuController.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "C:\Users\HP\source\repos\HappyPlace\HappyPlace\Views\Menu\Index.cshtml"
  
    ViewData["Title"] = "หน้าเมนู";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<div ng-controller=\"setupMenuController\" >\r\n    <div class=\"cardMenu\" style=\"padding-top: 5rem;\">\r\n");
            WriteLiteral(@"        <div class=""card-body text-center col-auto""
             style=""background-color: #a0c2fa38; border-radius: 21px; padding-bottom: 5rem; padding-top: 2rem; box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);"">

            <div class=""row"" style=""padding-top: 30px;"">
                <div class=""col-4"">

                    <button type=""button"" class=""btn_menu btn-lg text-white ""
                            style=""padding: 20px 130px; ""
                            ng-click=""OpenRoom()"">
                        ห้องพัก
                    </button>
                </div>
                <div class=""col-4"">
                    <button type=""button"" class=""btn_menu btn-lg text-white ""
                            style=""padding: 20px 130px;""
                            ng-click=""OpenCheckIn()"">
                        แจ้งเข้า
                    </button>
                </div>
                <div class=""col-4"">
                    <button type=""button"" class=""btn");
            WriteLiteral(@"_menu btn-lg text-white ""
                            style=""padding: 20px 130px;""
                            ng-click=""OpenCheckOut()"">
                        แจ้งออก
                    </button>
                </div>
            </div>
            <div class=""row"" style=""padding-top: 30px;"">
                <div class=""col-4"">
                    <button type=""button"" class=""btn_menu btn-lg text-white ""
                            style=""padding: 20px 130px;""
                            ng-click=""OpenBook()"">
                        การจอง
                    </button>
                </div>
                <div class=""col-4"">
                    <button type=""button"" class=""btn_menu btn-lg text-white ""
                            style=""padding: 20px 106px; ""
                            ng-click=""OpenBill()"">
                        คำนวณค่าเช่า
                    </button>
                </div>
                <div class=""col-4"">
                    <button type=""button"" class");
            WriteLiteral(@"=""btn_menu btn-lg text-white ""
                            style=""padding: 20px 130px;""
                            ng-click=""OpenPayment()"">
                        การชำระ
                    </button>
                </div>
            </div>
            <div class=""row"" style=""padding-top: 30px; display: flex; align-items: center"">
                <div class=""col-4"">
                    <button type=""button"" class=""btn_menu btn-lg text-white ""
                            style=""padding: 20px 107px;""
                            ng-click=""OpenAccounting()"">
                        ประเมิลรายได้
                    </button>
                </div>
            </div>


            </div>


        </div>
</div>

");
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n\r\n");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "8e6346439fb97e43757e169005bb867d27e82dc47589", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8e6346439fb97e43757e169005bb867d27e82dc48763", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n");
            }
            );
        }
        #pragma warning restore 1998
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; } = default!;
        #nullable disable
    }
}
#pragma warning restore 1591