using System;

namespace Auth
{
    public class Token
    {
        public string token_type { get; set; }
        public string access_token { get; set; }

        public string refresh_token { get; set; }
        public string user_name { get; set; }
    }
}