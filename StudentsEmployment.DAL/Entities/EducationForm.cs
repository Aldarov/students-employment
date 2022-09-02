using System.Text.Json.Serialization;

namespace StudentsEmployment.DAL.Entities
{
    public class EducationForm
    {
        public EducationForm()
        {
            PgHeaders = new HashSet<PgHeader>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<PgHeader> PgHeaders { get; set; }
    }
}
