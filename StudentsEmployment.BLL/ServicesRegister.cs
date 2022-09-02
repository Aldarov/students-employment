using Microsoft.Extensions.DependencyInjection;
using StudentsEmployment.BLL.Interfaces;
using StudentsEmployment.BLL.Services;

namespace StudentsEmployment.BLL
{
    /// <summary>
    /// Класс регистратор сервисов
    /// </summary>
    public static class ServicesRegister
    {
        /// <summary>
        /// Добавление сервисов в контейнер внедрения зависимостей
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddSingleton<IAuthService, AuthService>();

            return services;
        }
    }
}
