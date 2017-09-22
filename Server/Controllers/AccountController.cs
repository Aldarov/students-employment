using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Auth;
using Server.Models.University;
using Microsoft.EntityFrameworkCore;

namespace Server.Controllers
{
    public class AccountController : Controller
    {

        private UniversityContext db;
        private IJwt jwt;
        public AccountController(UniversityContext context, IJwt token)
        {
            db = context;
            jwt = token;
        }

        [HttpPost("api/login")]
        public IActionResult Login([FromBody]AuthProps props)
        {
            if (props.EmploymentId == null)
            {
                return BadRequest();
            }

            // if (identity == null)
            // {
            //     return BadRequest("Пользователь не авторизован в личном кабинете");
            // }

            var claims = new List<Claim>
                {
                    new Claim("EmploymentId", props.EmploymentId.ToString())
                };
            ClaimsIdentity identity = new ClaimsIdentity(claims, "Token");

            var response = jwt.GetToken(identity);

            return Ok(response);
        }

        [HttpPost("api/token")]
        public IActionResult RefreshToken([FromBody]Token token)
        {
            var refresh_token = token.refresh_token;
            if (refresh_token == null)
            {
                return BadRequest();
            }

            try
            {
                Token newToken = jwt.RefreshToken(refresh_token);
                return Ok(newToken);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}