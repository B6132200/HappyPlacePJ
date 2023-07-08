using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HappyPlace.Web.Extensions
{
    public static class HttpExtensions
    {
        private static ActionContextAccessor _actionContextAccessor = new ActionContextAccessor();

        public static string WebBaseUrl
        {
            get
            {
                var request = _actionContextAccessor.ActionContext.HttpContext.Request;
                var result = $"{request.Scheme}://{request.Host}{request.PathBase}";
                return result;
            }
        }
        public static string ClientIpAddress
        {
            get
            {
                var ip = "";
                if (!string.IsNullOrEmpty(_actionContextAccessor.ActionContext.HttpContext.Request.Headers["X-Forwarded-For"]))
                {
                    ip = _actionContextAccessor.ActionContext.HttpContext.Request.Headers["X-Forwarded-For"];
                }
                else
                {
                    ip = _actionContextAccessor.ActionContext.HttpContext.Request.HttpContext.Features.Get<IHttpConnectionFeature>().RemoteIpAddress.ToString();
                }
                ip = ip == "::1" ? "localhost" : ip;
                return ip;
            }
        }
        public static string AbsoluteContent(this IUrlHelper url, string contentPath)
        {
            var request = url.ActionContext.HttpContext.Request;
            return new Uri(new Uri(request.Scheme + "://" + request.Host.Value), url.Content(contentPath)).ToString();
        }
        public static string IsSelected(this IHtmlHelper htmlHelper, string controllers, string actions, string cssClass = "selected")
        {
            string currentAction = htmlHelper.ViewContext.RouteData.Values["action"] as string;
            string currentController = htmlHelper.ViewContext.RouteData.Values["controller"] as string;

            IEnumerable<string> acceptedActions = (actions ?? currentAction).Split(',');
            IEnumerable<string> acceptedControllers = (controllers ?? currentController).Split(',');

            return acceptedActions.Contains(currentAction) && acceptedControllers.Contains(currentController) ?
                cssClass : String.Empty;
        }
    }
}
