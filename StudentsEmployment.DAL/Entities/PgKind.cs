namespace StudentsEmployment.DAL.Entities
{
    public class PgKind
    {
        public PgKind()
        {
            PgTypes = new HashSet<PgType>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<PgType> PgTypes { get; set; }
    }
}
