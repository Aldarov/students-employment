using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Rotativa.AspNetCore;
using StudentsEmployment.BLL;
using StudentsEmployment.BLL.Models.Settings;
using StudentsEmployment.DAL;
using System.Text;

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

            services.Configure<AppSettings>(configuration);

            services.AddDbContext<UniversityContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("MainConnection"))
            );

            //services.Configure<ApiBehaviorOptions>(options =>
            //{
            //    //отключение стандартной обработки ошибок в ModelState
            //    //options.SuppressModelStateInvalidFilter = true;
            //});

            services.AddControllersWithViews(options =>
            {
                //ручная обработка ошибок
                //options.Filters.Add(typeof(ThrowModelStateExceptionFilter));
                //options.Filters.Add(typeof(APIExceptionFilterAttribute));
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer();

            services
                .AddOptions<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme)
                .Configure<IOptions<AppSettings>>((options, settings) =>
                {
                    var tokenSettings = settings.Value.TokenSettings;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = tokenSettings.Issuer,
                        ValidateAudience = true,
                        ValidAudience = tokenSettings.Audience,
                        ValidateLifetime = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSettings.Key)),
                        ValidateIssuerSigningKey = true,
                    };
                });

            services.Configure<IISOptions>(options =>
            {
                options.ForwardClientCertificate = false;
            });

            services.AddHttpContextAccessor();

            services.AddServices();
        }

        /// <summary>
        /// Добавление middlewares в конвейер запросов ASP.NET Core
        /// </summary>
        /// <param name="app">Конвейер запросов</param>
        /// <param name="env">Информация об окружении</param>
        public static void AddMiddlewares(this WebApplication app, IWebHostEnvironment env)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            }
            else
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
                pattern: "{controller}/{action}/{id?}");

            app.MapFallbackToFile("index.html");

            RotativaConfiguration.Setup(env.ContentRootPath);

            app.Run();
        }
    }
}
