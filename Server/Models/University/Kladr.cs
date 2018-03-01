using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Server.Models.University
{
    public partial class Kladr
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
