using System.ComponentModel.DataAnnotations;

namespace StudentsEmployment.DAL.Entities
{
    public class Speciality
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}