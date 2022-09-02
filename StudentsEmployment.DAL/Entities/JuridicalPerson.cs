namespace StudentsEmployment.DAL.Entities
{
    public class JuridicalPerson
    {
        public JuridicalPerson()
        {
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
    }
}
