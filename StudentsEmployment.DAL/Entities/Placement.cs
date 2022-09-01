using System.ComponentModel.DataAnnotations;

namespace StudentsEmployment.DAL.Entities
{
    public class Placement
    {
        [Key]
        public int Id { get; set; }

        public int FacultyId { get; set; }

        public string Faculty { get; set; }

        public int SpecialityId { get; set; }

        public string Speciality { get; set; }

        public int? GroupId { get; set; }

        public string Group { get; set; }

        public int EntranceYear { get; set; }

        public int EduFormId { get; set; }

        public string EduForm { get; set; }

        public int? SpecializationId { get; set; }

        public string Specialization { get; set; }
    }
}
