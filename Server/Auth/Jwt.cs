using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Server.Models.Auth;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Auth
{
    public class Jwt : IJwt
    {
        private readonly string REFRESH_TOKEN = "refresh_token";
        private readonly AuthContext db;
        private readonly SigningCredentials signingCredentials;

        public Jwt(AuthContext context)
        {
            db = context;
            signingCredentials = new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                SecurityAlgorithms.HmacSha256Signature);
        }

        public Token GetToken(ClaimsIdentity identity)
        {
            var token = new Token
                {
                    token_type = "Bearer",
                    access_token = CreateNewToken(identity),
                    refresh_token = CreateRefreshToken(identity),
                    user_name = identity.Name
                };
            return token;
        }

        public Token RefreshToken(string encodedToken)
        {
            var handler = new JwtSecurityTokenHandler();

            var tokenValidationParameters = new TokenValidationParameters()
            {
                ValidIssuer = AuthOptions.ISSUER,
                ValidAudience = REFRESH_TOKEN,
                IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                RequireExpirationTime = true,
                ValidateLifetime = true,
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
            };

            SecurityToken validatedToken;
            ClaimsPrincipal principal;
            try
            {
                principal = handler.ValidateToken(encodedToken,
                    tokenValidationParameters, out validatedToken);
            }
            catch (Exception)
            {
                throw;
            }

            string user = principal.FindFirst(ClaimTypes.NameIdentifier).Value;
            string role = principal.FindFirst(ClaimTypes.Role).Value;

            Token token = GetToken(GetIdentityByRole(user, role));

            return token;
        }

        public ClaimsIdentity GetIdentity(string login, string password)
        {
            User user = db.Users.Include(x => x.Role).FirstOrDefault(x => x.Login == login && x.Password == password);
            if (user != null)
            {
                return GetIdentityByRole(user.Login, user.Role.Name);
            }

            // если пользователь не найден
            return null;
        }

        private ClaimsIdentity GetIdentityByRole(string login, string role)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, login),
                new Claim(ClaimTypes.Role, role)
            };
            ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimTypes.NameIdentifier, ClaimTypes.Role);
            return claimsIdentity;
        }

        private string CreateToken(ClaimsIdentity identity, DateTime expiryDate, string audience)
        {
            var handler = new JwtSecurityTokenHandler();

            var now = DateTime.UtcNow;

            var jwt = handler.CreateJwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: audience,
                subject: identity,
                notBefore: now,
                expires: expiryDate,
                issuedAt: now,
                signingCredentials: signingCredentials
            );

            var token = handler.WriteToken(jwt);

            return token;
        }

        private string CreateNewToken(ClaimsIdentity identity)
        {
            var expiryDate = DateTime.UtcNow.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME));
            var token = CreateToken(identity, expiryDate, AuthOptions.AUDIENCE);
            return token;
        }

        private string CreateRefreshToken(ClaimsIdentity identity)
        {
            var expiryDate = DateTime.UtcNow.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME_REFRESH_TOKEN));
            var token = CreateToken(identity, expiryDate, REFRESH_TOKEN);
            return token;
        }
    }
}