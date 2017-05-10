using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Auth;
using Server.Models.Auth;
using Microsoft.EntityFrameworkCore;

namespace Server.Controllers
{
    public class AccountController : Controller
    {

        private AuthContext db;
        private IJwt jwt;
        public AccountController(AuthContext context, IJwt token)
        {
            db = context;
            jwt = token;
        }

        [HttpPost("api/login")]
        public IActionResult Login([FromBody]User user)
        {
            if (user.Login == null || user.Password == null)
            {
                return BadRequest("Не задано имя пользователя или пароль.");
            }

            var identity = jwt.GetIdentity(user.Login, user.Password);

            if (identity == null)
            {
                return BadRequest("Неверное имя пользователя или пароль.");
            }

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