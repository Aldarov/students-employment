using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Server.Models.University
{
    public partial class Address
    {
        public Address()
        {
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int? RegionId { get; set; }
        public int? DistrictId { get; set; }
        public int? CityId { get; set; }
        public int? SettlementId { get; set; }
    }
}
