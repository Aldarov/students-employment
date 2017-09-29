using System;
using System.Collections.Generic;
using Newtonsoft.Json;

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
        [JsonIgnore]
        public virtual PgKind PgKind { get; set; }
        [JsonIgnore]
        public virtual ICollection<PgContractStuff> DirectionContractStuffs { get; set; }
        [JsonIgnore]
        public virtual ICollection<PgContractStuff> DistributionContractStuffs { get; set; }
    }
}
