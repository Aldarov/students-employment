using Microsoft.Extensions.DependencyInjection;

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
            //services.AddSingleton<DapperContext>();
            //services.AddTransient<IHangfireRecurringJobsService, HangfireRecurringJobsService>();

            return services;
        }
    }
}
