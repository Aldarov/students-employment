using System.ComponentModel.DataAnnotations;

namespace Server.Models.University
{
    public class Specialization
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int SpecialityId { get; set; }
    }
}
