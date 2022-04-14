using Microsoft.AspNetCore.Mvc;

namespace StudentsEmployment
{
    /// <summary>
    /// Класс стартовой конфигурации приложения
    /// </summary>
    public static class Startup
    {
        /// <summary>
        /// Добавление сервисов в контейнер внедрения зависимостей приложения
        /// </summary>
        /// <param name="builder"></param>
        public static void ConfigureServices(this WebApplicationBuilder builder)
        {
            var configuration = builder.Configuration;
            var services = builder.Services;

            //services.Configure<AppSettings>(configuration);

            services.Configure<ApiBehaviorOptions>(options =>
            {
                //отключение стандартной обработки ошибок в ModelState
                options.SuppressModelStateInvalidFilter = true;
            });

            services
                .AddControllersWithViews(options =>
                {
                    //ручная обработка ошибок
                    //options.Filters.Add(typeof(ThrowModelStateExceptionFilter));
                    //options.Filters.Add(typeof(APIExceptionFilterAttribute));
                })
                .AddJsonOptions(opt =>
                {
                    //включения преобразования Enum в строку и обратно, при работе с json
                    //opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });
        }

        /// <summary>
        /// Добавление middlewares в конвейер запросов ASP.NET Core
        /// </summary>
        /// <param name="app">Конвейер запросов</param>
        /// <param name="env">Информация об окружении</param>
        public static void AddMiddlewares(this WebApplication app, IWebHostEnvironment env)
        {
            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller}/{action=Index}/{id?}");

            app.MapFallbackToFile("index.html"); ;

            app.Run();
        }
    }
}
