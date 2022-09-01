using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace StudentsEmployment.DAL.Entities
{
    public class School
    {
        public School()
        {
            DirectionContractStuffs = new HashSet<PgContractStuff>();
            DistributionContractStuffs = new HashSet<PgContractStuff>();
        }

        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<PgContractStuff> DirectionContractStuffs { get; set; }

        [JsonIgnore]
        public virtual ICollection<PgContractStuff> DistributionContractStuffs { get; set; }
    }
}
