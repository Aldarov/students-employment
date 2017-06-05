using System;
using System.Collections.Generic;

namespace Server.Models.University
{
    public partial class PgContractInfo
    {
        public int Id { get; set; }
        public int JuridicalPersonId { get; set; }
        public bool IsexistContract { get; set; }
        public string NumberContract { get; set; }
        public DateTime? ContractBegin { get; set; }
        public DateTime? ContractEnd { get; set; }

        public virtual JuridicalPerson JuridicalPerson { get; set; }
    }
}
