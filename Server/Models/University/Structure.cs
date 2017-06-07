using System;
using System.Collections.Generic;

namespace Server.Models.University
{
    public partial class Structure
    {
        public int AffiliateId { get; set; }
        public string Affiliate { get; set; }
        public int FacultyId { get; set; }
        public string Faculty { get; set; }
        public int SpecialityId { get; set; }
        public string Speciality { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
    }
}