using System.ComponentModel.DataAnnotations;

namespace Server.Models.University
{
    public class PlacementHeader
    {
        [Key]
        public int Id { get; set; }
        public string Speciality { get; set; }
        public string EduForm { get; set; }
        public int EntranceYear { get; set; }
        public string DocDate { get; set; }
        public string HeaderPost { get; set; }
        public string HeaderName { get; set; }
    }
}
