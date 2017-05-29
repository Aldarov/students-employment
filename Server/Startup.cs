using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Auth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Server.Models.Auth;
using Microsoft.EntityFrameworkCore;
using System.IO;
using Server.Models.University;

namespace Server
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddJsonFile("env.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();

            services.AddDbContext<AuthContext>(options => 
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
            );

            services.AddDbContext<UniversityContext>(options => 
                options.UseSqlServer(Configuration.GetConnectionString("UniversityConnection"))
            );
            
            services.AddSingleton<IJwt, Jwt>();            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseJwtBearerAuthentication(new JwtBearerOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                TokenValidationParameters = new TokenValidationParameters
                {
                    // указывает, будет ли валидироваться издатель при валидации токена
                    ValidateIssuer = true,
                    // строка, представляющая издателя
                    ValidIssuer = AuthOptions.ISSUER,
 
                    // будет ли валидироваться потребитель токена
                    ValidateAudience = true,
                    ValidAudience = AuthOptions.AUDIENCE,

                    // будет ли валидироваться время существования
                    ValidateLifetime = true,
 
                    // установка ключа безопасности
                    IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                    // валидация ключа безопасности
                    ValidateIssuerSigningKey = true,
 
                    //ClockSkew = TimeSpan.Zero
                }
            });

            app.Use(async (context, next) => 
            { 
                await next(); 
                if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value)) 
                { 
                    context.Request.Path = "/index.html"; 
                    await next(); 
                } 
            })
            .UseDefaultFiles()
            .UseStaticFiles()
            .UseMvc();
        }
    }
}
