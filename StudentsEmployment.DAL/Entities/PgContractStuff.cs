using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace StudentsEmployment.DAL.Entities
{
    public partial class PgContractStuff
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int PgHeaderId { get; set; }

        public int? DirectionTypeId { get; set; }
        public int? DistributionTypeId { get; set; }

        public int? DirectionOrganizationId { get; set; }
        public int? DistributionOrganizationId { get; set; }
        public int? DirectionSchoolId { get; set; }
        public int? DistributionSchoolId { get; set; }

        public bool? JobOnSpeciality { get; set; }

        [NotMapped]
        public string DirectionOrganizationName { get { return DirectionOrganization?.Name; } }
        [NotMapped]
        public string DistributionOrganizationName { get { return DistributionOrganization?.Name; } }
        [NotMapped]
        public string DirectionSchoolName { get { return DirectionSchool?.Name; } }
        [NotMapped]
        public string DistributionSchoolName { get { return DistributionSchool?.Name; } }

        [JsonIgnore]
        public virtual PgHeader PgHeader { get; set; }
        [JsonIgnore]
        public virtual PgType DirectionType { get; set; }
        [JsonIgnore]
        public virtual PgType DistributionType { get; set; }
        [JsonIgnore]
        public virtual JuridicalPerson DirectionOrganization { get; set; }
        [JsonIgnore]
        public virtual JuridicalPerson DistributionOrganization { get; set; }
        [JsonIgnore]
        public virtual School DirectionSchool { get; set; }
        [JsonIgnore]
        public virtual School DistributionSchool { get; set; }
        [NotMapped]
        public virtual Student Student { get; set; }
    }
}
