using System.ComponentModel.DataAnnotations;

namespace StudentsEmployment.DAL.Entities
{
    public class User
    {
        [Key]
        public int EmployeePostId { get; set; }

        public string FullName { get; set; }

        public string Post { get; set; }

        public string Department { get; set; }
    }
}
