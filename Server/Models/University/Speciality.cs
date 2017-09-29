using System.ComponentModel.DataAnnotations;

namespace Server.Models.University
{
    public class Speciality
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}