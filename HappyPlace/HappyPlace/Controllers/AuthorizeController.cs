using HappyPlace.Data.UnitOfWork;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using HappyPlace.Models;

namespace HappyPlace.Controllers
{
    public class AuthorizeController : Controller
    {
        //private readonly IConfiguration _config;
       
        //private readonly IUnitOfWork _uow;
        //public AuthorizeController( IConfiguration config, IUnitOfWork uow)
        //{
            
        //    _config = config;
        //    _uow = uow;
        //}

     
        public IActionResult Login()
        {
            ClaimsPrincipal claimUser = HttpContext.User;

            if (claimUser.Identity.IsAuthenticated)
                return RedirectToAction("Index", "Menu");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(VMLogin modelLogin)
        {

            if (modelLogin.Email == "admin" &&
                modelLogin.PassWord == "11111"
                )
            {
                List<Claim> claims = new List<Claim>() {
                    new Claim(ClaimTypes.NameIdentifier, modelLogin.Email),
                    new Claim("OtherProperties","Example Role")

                };

                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims,
                    CookieAuthenticationDefaults.AuthenticationScheme);

                AuthenticationProperties properties = new AuthenticationProperties()
                {

                    AllowRefresh = true,
                    IsPersistent = modelLogin.KeepLoggedIn
                };

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity), properties);

                return RedirectToAction("Index", "Menu");
            }



            ViewData["ValidateMessage"] = "* ไม่พบผู้ใช้งาน";
            return View();
        }



        //public IActionResult Logout()
        //{

        //    return RedirectToAction("Login");
        //}


        //[HttpPost]
        //public JsonResult Login(string username, string password)
        //{
        //    try
        //    {
               
        //        bool authentication = false;

        //        if ("Admin" == username && "11111" == password)
        //        {
        //            authentication = true;
        //        }
                
        //        if (authentication)
        //        {
                  
        //            return Json(new { redirectToUrl = Url.Action("Index", "Menu"),});

        //        }
        //        else
        //        {
        //            throw new Exception("Wrong password!");
        //        }

        //    }
        //    catch (Exception e)
        //    {
        //        return Json(e.InnerException.Message);
        //    }


        //}
 
    }
}
