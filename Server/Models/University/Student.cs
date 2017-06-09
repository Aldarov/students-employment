using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Server.Models.University
{
    public class Student
    {
        public Student()
        {
            ContractStuffs = new HashSet<PgContractStuff>();
        }        

        [Key]
        public int StudentId { get; set; }
        public string FullName { get; set; }
        public string RegAddress { get; set; }
        public int FinanceId { get; set; }
        public string Finance { get; set; }
        public int EntrTypeId { get; set; }
        public string EntrType { get; set; }
        public string Phone { get; set; }
        [JsonIgnore]
        public virtual ICollection<PgContractStuff> ContractStuffs { get; set; }
        
    }
}