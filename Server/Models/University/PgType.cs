using System;
using System.Collections.Generic;

namespace Server.Models.University
{
    public partial class PgType
    {
        public PgType()
        {
            DirectionContractStuffs = new HashSet<PgContractStuff>();
            DistributionContractStuffs = new HashSet<PgContractStuff>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int PgKindId { get; set; }
        public virtual PgKind PgKind { get; set; }

        public virtual ICollection<PgContractStuff> DirectionContractStuffs { get; set; }
        public virtual ICollection<PgContractStuff> DistributionContractStuffs { get; set; }
    }
}
