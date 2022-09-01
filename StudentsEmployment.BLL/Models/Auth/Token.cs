namespace StudentsEmployment.BLL.Models.Auth
{
    public class Token
    {
        public string TokenType { get; set; }

        public string AccessToken { get; set; }

        public string RefreshToken { get; set; }
    }
}