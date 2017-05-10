using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Auth
{
    public class AuthOptions
    {
        public const string ISSUER = "IdentityServer"; // издатель токена
        public const string AUDIENCE = "Server"; // потребители токена
        const string KEY = "BEgLx°nh]+e#]#KBxl<[9#wyu01(k-M!jPFVz=Dqu5,d/CV/J2z$]/TkrSaMov4W";   // ключ для шифрации
        public const int LIFETIME = 10; // время жизни токена - 10 минут
        public const int LIFETIME_REFRESH_TOKEN = 1440; // время жизни рефреш токена - 24 часа
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        }

        // public static string GetConfiguration(string option) {
        //     IConfiguration config = (new ConfigurationBuilder()
        //         .AddJsonFile("auth.json", optional: false, reloadOnChange: true)).Build();
        //     return config[option];
        // }

    }
}