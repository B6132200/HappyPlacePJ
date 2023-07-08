
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Infrastructure;
//using Microsoft.AspNetCore.Mvc.Rendering;
//using Microsoft.Extensions.Configuration;

//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Security.Claims;
//using System.Security.Principal;
//using System.Threading.Tasks;

//namespace HappyPlace.Web.Extensions
//{
//    public static class UserProfile
//    {
//        private static ActionContextAccessor _actionContextAccessor = new ActionContextAccessor();
       
//        private static IConfiguration _config;

//        static UserProfile()
//        {
//            _config = Startup.StaticConfig;
           
//        }
//        public static string EmployeeNo
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("En", StringComparison.OrdinalIgnoreCase))?.Value;
//                return result;
//            }
//        }
//        public static string SupvEn
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("SupvEn", StringComparison.OrdinalIgnoreCase))?.Value;
//                return result;
//            }
//        }
//        public static string SupvName
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("SupvName", StringComparison.OrdinalIgnoreCase))?.Value;
//                return result;
//            }
//        }
//        public static string FullName
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("FullName", StringComparison.OrdinalIgnoreCase))?.Value;
//                return result;
//            }
//        }
//        public static string Email
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("Email", StringComparison.OrdinalIgnoreCase))?.Value;
//                return result;
//            }
//        }
//        public static List<string> Roles
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.Where(x => x.Type.Equals(ClaimTypes.Role, StringComparison.OrdinalIgnoreCase)).Select(s => s.Value).ToList();
//                return result;
//            }
//        }
//        public static string Role
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("Role", StringComparison.OrdinalIgnoreCase))?.Value;

//                return result;
//            }
//        }
//        public static string Level
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("Level", StringComparison.OrdinalIgnoreCase))?.Value;

//                return result;
//            }
//        }
//        public static string Position
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("Position", StringComparison.OrdinalIgnoreCase))?.Value;

//                return result;
//            }
//        }
//        public static string Approval
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("Approval", StringComparison.OrdinalIgnoreCase))?.Value;

//                return result;
//            }
//        }
//        public static string Publish
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("Publish", StringComparison.OrdinalIgnoreCase))?.Value;

//                return result;
//            }
//        }
//        public static string Edit
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("Edit", StringComparison.OrdinalIgnoreCase))?.Value;

//                return result;
//            }
//        }
//        public static string Setup
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("Setup", StringComparison.OrdinalIgnoreCase))?.Value;

//                return result;
//            }
//        }public static string IsSup
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("IsSup", StringComparison.OrdinalIgnoreCase))?.Value;

//                return result;
//            }
//        }
//        public static string IsAdmin
//        {
//            get
//            {
//                var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;
//                var result = claims?.FirstOrDefault(x => x.Type.Equals("IsAdmin", StringComparison.OrdinalIgnoreCase))?.Value;

//                return result;
//            }
//        }

//        public static IIdentity UserIdentity
//        {
//            get
//            {
//                var user = _actionContextAccessor.ActionContext.HttpContext.User.Identity;
//                return user;
//            }
//        }
//        public static bool IsAuthen
//        {
//            get
//            {
//                var user = _actionContextAccessor.ActionContext.HttpContext.User.Identity.IsAuthenticated;
//                return user;
//            }
//        }
//        public static string GetUserClaim(string claimType)
//        {
//            var claims = _actionContextAccessor.ActionContext.HttpContext.User.Claims;

//            var en = claims?.FirstOrDefault(x => x.Type.Equals(claimType, StringComparison.OrdinalIgnoreCase))?.Value;
//            return en;
//        }

//        public static EmployeeAccount EmployeeAccount
//        {
//            get
//            {
//                var result = _userServices.GetEmployeeByEn(EmployeeNo);
//                return result;
//            }
//        }
//    }
//}
