using System;
using System.Collections.Generic;

namespace Server.Models.University
{
    public partial class Street
    {
        public Street()
        {
            JuridicalPersons = new HashSet<JuridicalPerson>();
        }

        public int Id { get; set; }
        public int KladrId { get; set; }
        public string Name { get; set; }
        public string Socr { get; set; }
        public string Code { get; set; }
        public string Index { get; set; }
        public string Gninmb { get; set; }
        public string Uno { get; set; }
        public string Ocatd { get; set; }
        public int? CityDistrictId { get; set; }

        public virtual ICollection<JuridicalPerson> JuridicalPersons { get; set; }
        public virtual Kladr Kladr { get; set; }
    }
}
