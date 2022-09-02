namespace StudentsEmployment.DAL.Entities
{
    public class Address
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int? RegionId { get; set; }

        public int? DistrictId { get; set; }

        public int? CityId { get; set; }

        public int? SettlementId { get; set; }
    }
}
