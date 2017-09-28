using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Auth
{
    public class Jwt : IJwt
    {
        private readonly string REFRESH_TOKEN = "refresh_token";
        private readonly SigningCredentials signingCredentials;

        public Jwt()
        {
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
                };
            return token;
        }

        public ClaimsPrincipal DecodeToken(string encodedToken)
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

            return principal;
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