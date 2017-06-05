using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Server.Models.University
{
    public partial class JuridicalPerson
    {
        public JuridicalPerson()
        {
            DirectionContractStuffs = new HashSet<PgContractStuff>();
            DistributionContractStuffs = new HashSet<PgContractStuff>();
            PgContractInfos = new HashSet<PgContractInfo>();
            PgGraduateWorkplaces = new HashSet<PgGraduateWorkplace>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string PostCode { get; set; }
        public int? RegistrationCountryId { get; set; }
        public int? RegistrationRegionId { get; set; }
        public int? RegistrationDistrictId { get; set; }
        public int? RegistrationCityId { get; set; }
        public int? RegistrationSettlementId { get; set; }
        public int? RegistrationStreetId { get; set; }
        public string RegistrationHouse { get; set; }
        public string RegistrationCase { get; set; }
        public string RegistrationFlat { get; set; }
        public string Inn { get; set; }
        public string Kpp { get; set; }
        public int? SchoolId { get; set; }
        public string Person { get; set; }
        public DateTime? AgreementDate { get; set; }
        public int? WorkPlaceTypeId { get; set; }
        [JsonIgnore]
        public virtual ICollection<PgContractStuff> DirectionContractStuffs { get; set; }
        [JsonIgnore]
        public virtual ICollection<PgContractStuff> DistributionContractStuffs { get; set; }
        public virtual ICollection<PgContractInfo> PgContractInfos { get; set; }
        public virtual ICollection<PgGraduateWorkplace> PgGraduateWorkplaces { get; set; }
        public virtual Kladr RegistrationCity { get; set; }
        public virtual Kladr RegistrationDistrict { get; set; }
        public virtual Kladr RegistrationRegion { get; set; }
        public virtual Kladr RegistrationSettlement { get; set; }
        public virtual Street RegistrationStreet { get; set; }
        public virtual Country Country { get; set; }
    }
}
