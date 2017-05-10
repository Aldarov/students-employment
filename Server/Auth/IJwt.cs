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
        /// Создает объект ClaimsIdentity.
        /// 
        /// </summary>
        /// <param name="login">Имя пользователя.</param>
        /// <param name="password">Пароль.</param>        /// 
        /// <returns>Возвращает объект ClaimsIdentity. 
        /// Если login и password неверный, то вернет null.</returns>
        ClaimsIdentity GetIdentity(string login, string password);

        /// <summary>
        /// Создает новый токен доступа, при помощи валидного refresh_token.
        ///
        /// </summary>
        /// <param name="encodedToken">Закодированный refresh_token.</param>
        /// <returns>Возвращает объект Token. </returns>
        Token RefreshToken(string encodedToken);
    }
}