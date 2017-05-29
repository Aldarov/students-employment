using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Server.Models.University
{
    public class EducationForm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public virtual List<Placement> Placements { get; set; }
    }
}
