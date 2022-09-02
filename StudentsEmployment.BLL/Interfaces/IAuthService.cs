using StudentsEmployment.BLL.Models.Auth;
using System.Security.Claims;

namespace StudentsEmployment.BLL.Interfaces
{
    public interface IAuthService
    {
        /// <summary>
        /// Функция расшифровки токена.
        /// </summary>
        /// <param name="encodedToken">Закодированный токен.</param>
        /// <returns>Возвращает объект ClaimsPrincipal</returns>
        ClaimsPrincipal DecodeToken(string encodedToken);

        /// <summary>
        /// Создает и возвращает токен доступа.
        /// </summary>
        /// <param name="identity">Объект ClaimsIdentity</param>        /// 
        Token GetToken(ClaimsIdentity identity);
    }
}