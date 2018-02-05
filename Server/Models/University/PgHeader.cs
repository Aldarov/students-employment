using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

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
        [Range(2000, 2100, ErrorMessage="Некорректное значение")]
        public int EntraceYear { get; set; }
        public int EduFormId { get; set; }
        public DateTime DocDate { get; set; }
        [JsonIgnore]
        public virtual EducationForm EduForm { get; set; }
        public virtual ICollection<PgContractStuff> PgContractStuffs { get; set; }
    }
}
