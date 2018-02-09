using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Server.Models.University
{
    public partial class JuridicalPerson
    {
        public JuridicalPerson()
        {
            // DirectionContractStuffs = new HashSet<PgContractStuff>();
            // DistributionContractStuffs = new HashSet<PgContractStuff>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? RegistrationCountryId { get; set; }
        public int? RegistrationRegionId { get; set; }
        public int? RegistrationDistrictId { get; set; }
        public int? RegistrationCityId { get; set; }
        public int? RegistrationSettlementId { get; set; }

        public virtual Country Country { get; set; }
        public virtual Kladr RegistrationRegion { get; set; }
        public virtual Kladr RegistrationDistrict { get; set; }
        public virtual Kladr RegistrationCity { get; set; }
        public virtual Kladr RegistrationSettlement { get; set; }

        // [JsonIgnore]
        // public virtual ICollection<PgContractStuff> DirectionContractStuffs { get; set; }
        // [JsonIgnore]
        // public virtual ICollection<PgContractStuff> DistributionContractStuffs { get; set; }
    }
}
