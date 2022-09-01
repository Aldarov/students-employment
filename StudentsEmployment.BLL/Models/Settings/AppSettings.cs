namespace StudentsEmployment.BLL.Models.Settings
{
    /// <summary>
    /// Настройки приложения
    /// </summary>
    public class AppSettings
    {
        /// <summary>
        /// Строки подключения
        /// </summary>
        public ConnectionStrings ConnectionStrings { get; set; }

        /// <summary>
        /// Настройки токена авторизации
        /// </summary>
        public TokenSettings TokenSettings { get; set; }
    }
}
