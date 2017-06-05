using System;
using System.Collections.Generic;

namespace Server.Models.University1
{
    public class Placement
    {
        public int Id { get; set; }
        public int SpecialityId { get; set; }
        public int EntraceYear { get; set; }
        public DateTime DocDate { get; set; }
        public int PgKindId { get; set; }
        public DateTime DocDate2 { get; set; }
        public int EduFormId { get; set; }
        public virtual EducationForm EduForm { get; set; }
    }
}
