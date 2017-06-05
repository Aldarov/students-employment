using System;
using System.Collections.Generic;

namespace Server.Models.University
{
    public partial class PgGraduateWorkplace
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int? JuridicalPersonId { get; set; }
        public int? SchoolId { get; set; }
        public DateTime? Date { get; set; }
        public string Post { get; set; }

        public virtual JuridicalPerson JuridicalPerson { get; set; }
        public virtual School School { get; set; }
    }
}
