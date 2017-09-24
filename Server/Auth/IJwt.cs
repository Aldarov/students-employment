using System.Security.Claims;

namespace Auth
{
    public interface IJwt
    {
        /// <summary>
        /// Создает и возвращает токен доступа.
        /// 
        /// </summary>
        /// <param name="identity">Объект ClaimsIdentity.</param>        /// 
        /// <returns>Возвращает объект Token.</returns>
        Token GetToken(ClaimsIdentity identity);

        /// <summary>
        /// Расшифровка refresh_token.
        ///
        /// </summary>
        /// <param name="encodedToken">Закодированный refresh_token.</param>
        /// <returns>Возвращает объект ClaimsPrincipal. </returns>
        ClaimsPrincipal DecodeRefreshToken(string encodedToken);
    }
}