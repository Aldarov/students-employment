namespace Server.Services
{
    public interface IClaimsProps
    {
        /// <summary>
        /// Функция получения EmploymentId из HttpContext
        /// </summary>
        /// <returns>Возвращает EmploymentId</returns>
        int GetEmploymentId();
    }
}