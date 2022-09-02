using System.ComponentModel.DataAnnotations;

namespace StudentsEmployment.DAL.Entities
{
    public class Profile
    {
        [Key]
        public int Id { get; set; }

        public int SpecialityId { get; set; }

        public string Name { get; set; }
    }
}
