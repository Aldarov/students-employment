using Newtonsoft.Json;

namespace Server.Models.Auth
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        [JsonIgnore]
        public int RoleId { get; set; }
        public Role Role { get; set; }
    }
}