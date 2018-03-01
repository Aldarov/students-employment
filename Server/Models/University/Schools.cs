using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Server.Models.University
{
    public partial class School
    {
        public School()
        {
            DirectionContractStuffs = new HashSet<PgContractStuff>();
            DistributionContractStuffs = new HashSet<PgContractStuff>();
        }
        
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<PgContractStuff> DirectionContractStuffs { get; set; }

        [JsonIgnore]
        public virtual ICollection<PgContractStuff> DistributionContractStuffs { get; set; }
    }
}
