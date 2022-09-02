using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using StudentsEmployment.BLL.Interfaces;
using StudentsEmployment.BLL.Models.Auth;
using StudentsEmployment.BLL.Models.Settings;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StudentsEmployment.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppSettings _settings;
        private readonly SymmetricSecurityKey _key;
        private readonly string _refreshToken = "refreshToken";

        public AuthService(IOptions<AppSettings> settings)
        {
            _settings = settings.Value;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.TokenSettings.Key));
        }

        public Token GetToken(ClaimsIdentity identity)
        {
            var token = new Token
            {
                TokenType = "Bearer",
                AccessToken = CreateNewToken(identity),
                RefreshToken = CreateRefreshToken(identity)
            };
            return token;
        }

        public ClaimsPrincipal DecodeToken(string encodedToken)
        {
            var handler = new JwtSecurityTokenHandler();

            var tokenValidationParameters = new TokenValidationParameters()
            {
                ValidIssuer = _settings.TokenSettings.Issuer,
                ValidAudience = _refreshToken,
                IssuerSigningKey = _key,
                RequireExpirationTime = true,
                ValidateLifetime = true,
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
            };

            ClaimsPrincipal principal;
            try
            {
                principal = handler.ValidateToken(encodedToken,
                    tokenValidationParameters, out SecurityToken validatedToken);
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
                issuer: _settings.TokenSettings.Issuer,
                audience: audience,
                subject: identity,
                notBefore: now,
                expires: expiryDate,
                issuedAt: now,
                signingCredentials: new SigningCredentials(_key, SecurityAlgorithms.HmacSha256Signature)
            );

            var token = handler.WriteToken(jwt);

            return token;
        }

        private string CreateNewToken(ClaimsIdentity identity)
        {
            var expiryDate = DateTime.UtcNow.Add(TimeSpan.FromMinutes(_settings.TokenSettings.Lifetime));
            var token = CreateToken(identity, expiryDate, _settings.TokenSettings.Audience);
            return token;
        }

        private string CreateRefreshToken(ClaimsIdentity identity)
        {
            var expiryDate = DateTime.UtcNow.Add(TimeSpan.FromMinutes(_settings.TokenSettings.LifetimeRefreshToken));
            var token = CreateToken(identity, expiryDate, _refreshToken);
            return token;
        }
    }
}
