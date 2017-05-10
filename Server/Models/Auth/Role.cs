using System.Collections.Generic;
using Newtonsoft.Json;

namespace Server.Models.Auth
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public List<User> Users { get; set; }
    }
}