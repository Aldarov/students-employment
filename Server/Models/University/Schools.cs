using System;
using System.Collections.Generic;

namespace Server.Models.University
{
    public partial class School
    {
        public School()
        {
            DirectionContractStuffs = new HashSet<PgContractStuff>();
            DistributionContractStuffs = new HashSet<PgContractStuff>();
            PgGraduateWorkplaces = new HashSet<PgGraduateWorkplace>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string KindOu { get; set; }
        public int? SchoolCountryId { get; set; }
        public int? SchoolRegionId { get; set; }
        public int? SchoolDistrictId { get; set; }
        public int? SchoolCityId { get; set; }
        public int? SchoolSettlementId { get; set; }
        public int? CityDistrictId { get; set; }
        public int TypeId { get; set; }
        public int? InstId { get; set; }
        public virtual Kladr SchoolCity { get; set; }
        public virtual Kladr SchoolDistrict { get; set; }
        public virtual Kladr SchoolRegion { get; set; }
        public virtual Kladr SchoolSettlement { get; set; }
        public virtual Country Country { get; set; }
        public virtual ICollection<PgContractStuff> DirectionContractStuffs { get; set; }
        public virtual ICollection<PgContractStuff> DistributionContractStuffs { get; set; }
        public virtual ICollection<PgGraduateWorkplace> PgGraduateWorkplaces { get; set; }
    }
}
