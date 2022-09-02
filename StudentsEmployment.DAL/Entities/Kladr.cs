using System.Text.Json.Serialization;

namespace StudentsEmployment.DAL.Entities
{
    public class Kladr
    {
        public Kladr()
        {
            JuridicalPersonsRegistrationCity = new HashSet<JuridicalPerson>();
            JuridicalPersonsRegistrationDistrict = new HashSet<JuridicalPerson>();
            JuridicalPersonsRegistrationRegion = new HashSet<JuridicalPerson>();
            JuridicalPersonsRegistrationSettlement = new HashSet<JuridicalPerson>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<JuridicalPerson> JuridicalPersonsRegistrationCity { get; set; }

        [JsonIgnore]
        public virtual ICollection<JuridicalPerson> JuridicalPersonsRegistrationDistrict { get; set; }

        [JsonIgnore]
        public virtual ICollection<JuridicalPerson> JuridicalPersonsRegistrationRegion { get; set; }

        [JsonIgnore]
        public virtual ICollection<JuridicalPerson> JuridicalPersonsRegistrationSettlement { get; set; }
    }
}
