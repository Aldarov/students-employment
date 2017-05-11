using System.IO;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Auth
{
    public static class AuthOptions
    {
        public static string ISSUER = GetConfiguration("issuer");
        public static string AUDIENCE = GetConfiguration("audience");
        public static int LIFETIME = int.Parse(GetConfiguration("lifetime"));
        public static int LIFETIME_REFRESH_TOKEN = int.Parse(GetConfiguration("lifetime_refresh_token"));

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(GetConfiguration("key")));
        }

        private static string GetConfiguration(string option) {
            IConfiguration config = (new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())   
                .AddJsonFile("Auth/auth.json", optional: false, reloadOnChange: true)).Build();
            return config[option];
        }
    }
}