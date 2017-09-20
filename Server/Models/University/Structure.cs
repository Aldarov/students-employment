using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Server.Models.University
{
    public partial class Structure
    {
        public Int16 AffiliateId { get; set; }
        public string Affiliate { get; set; }
        public int FacultyId { get; set; }
        public string Faculty { get; set; }
        [Key]
        public int? SpecialityId { get; set; }
        public string Speciality { get; set; }
    }
}