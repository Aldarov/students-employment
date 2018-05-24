using System.ComponentModel.DataAnnotations;

namespace Server.Models.University
{
    public class Profile
    {
        [Key]
        public int Id { get; set; }
        public int SpecialityId { get; set; }
        public string Name { get; set; }
    }
}
