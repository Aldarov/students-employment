using System.Text.Json.Serialization;

namespace StudentsEmployment.DAL.Entities
{
    public class Country
    {
        //public Country()
        //{
        //    JuridicalPersons = new HashSet<JuridicalPerson>();
        //}

        public int Id { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<JuridicalPerson> JuridicalPersons { get; set; }
    }
}