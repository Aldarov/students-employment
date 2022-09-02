using System.Text.Json.Serialization;

namespace StudentsEmployment.DAL.Entities
{
    public class PgType
    {
        public PgType()
        {
            DirectionContractStuffs = new HashSet<PgContractStuff>();
            DistributionContractStuffs = new HashSet<PgContractStuff>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public int PgKindId { get; set; }

        public bool InArchive { get; set; }

        [JsonIgnore]
        public virtual PgKind PgKind { get; set; }

        [JsonIgnore]
        public virtual ICollection<PgContractStuff> DirectionContractStuffs { get; set; }

        [JsonIgnore]
        public virtual ICollection<PgContractStuff> DistributionContractStuffs { get; set; }
    }
}
