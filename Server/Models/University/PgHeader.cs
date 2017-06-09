using System;
using System.Collections.Generic;

namespace Server.Models.University
{
    public partial class PgHeader
    {
        public PgHeader()
        {
            PgContractStuffs = new HashSet<PgContractStuff>();
        }

        public int Id { get; set; }
        public int SpecialityId { get; set; }
        public int EntraceYear { get; set; }
        public int EduFormId { get; set; }
        public DateTime DocDate { get; set; }
        public virtual EducationForm EduForm { get; set; }
        public virtual ICollection<PgContractStuff> PgContractStuffs { get; set; }
    }
}
