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
            // SchoolsCity = new HashSet<School>();
            // SchoolsDistrict = new HashSet<School>();
            // SchoolsRegion = new HashSet<School>();
            // SchoolsSettlement = new HashSet<School>();
            // Streets = new HashSet<Street>();
        }

        public int Id { get; set; }
        // public int? ParentId { get; set; }
        // public short ElLevel { get; set; }
        public string Name { get; set; }
        // public string Socr { get; set; }
        // public string Code { get; set; }
        // public string Index { get; set; }
        // public string Gninmb { get; set; }
        // public string Uno { get; set; }
        // public string Ocatd { get; set; }
        // public string Status { get; set; }
        // public int? FomsId { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<JuridicalPerson> JuridicalPersonsRegistrationCity { get; set; }
        [JsonIgnore]
        public virtual ICollection<JuridicalPerson> JuridicalPersonsRegistrationDistrict { get; set; }
        [JsonIgnore]
        public virtual ICollection<JuridicalPerson> JuridicalPersonsRegistrationRegion { get; set; }
        [JsonIgnore]
        public virtual ICollection<JuridicalPerson> JuridicalPersonsRegistrationSettlement { get; set; }
        // public virtual ICollection<School> SchoolsCity { get; set; }
        // public virtual ICollection<School> SchoolsDistrict { get; set; }
        // public virtual ICollection<School> SchoolsRegion { get; set; }
        // public virtual ICollection<School> SchoolsSettlement { get; set; }
        // public virtual ICollection<Street> Streets { get; set; }
    }
}
