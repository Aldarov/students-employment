using System.ComponentModel.DataAnnotations;

namespace StudentsEmployment.DAL.Entities
{
    public class Structure
    {
        public int AffiliateId { get; set; }

        public string Affiliate { get; set; }

        public int FacultyId { get; set; }

        public string Faculty { get; set; }

        [Key]
        public int? SpecialityId { get; set; }

        public string Speciality { get; set; }
    }
}