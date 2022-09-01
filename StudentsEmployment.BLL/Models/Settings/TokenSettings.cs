namespace StudentsEmployment.BLL.Models.Settings
{
    /// <summary>
    /// Настройки токена авторизации
    /// </summary>
    public class TokenSettings
    {
        /// <summary>
        /// Издатель токена
        /// </summary>
        public string Issuer { get; set; }

        /// <summary>
        /// Потребитель токена
        /// </summary>
        public string Audience { get; set; }

        /// <summary>
        /// Секрет
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// Время жизни токена в мин
        /// </summary>
        public int Lifetime { get; set; }

        /// <summary>
        /// Время жизни рефреш-токена в мин
        /// </summary>
        public int LifetimeRefreshToken { get; set; }
    }
}
