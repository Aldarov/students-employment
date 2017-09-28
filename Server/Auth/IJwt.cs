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
        /// Функция расшифровки токена.
        ///
        /// </summary>
        /// <param name="encodedToken">Закодированный токен.</param>
        /// <returns>Возвращает объект ClaimsPrincipal. </returns>
        ClaimsPrincipal DecodeToken(string encodedToken);
    }
}