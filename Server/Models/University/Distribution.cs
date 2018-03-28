using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Models.University
{
    public partial class Distribution
    {
        [Key]
        public Int64 Number { get; set; }
        public string Fio { get; set; }
        public string Registration { get; set; }
        public string Finance { get; set; }
        public string EntrType { get; set; }
        public string Phone { get; set; }
        public string PgType { get; set; }
        public string Organization { get; set; }
    }
}
