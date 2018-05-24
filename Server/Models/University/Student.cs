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
        public int? FinanceId { get; set; }
        public string Finance { get; set; }
        public int? EntrTypeId { get; set; }
        public string EntrType { get; set; }
        public string Phone { get; set; }
        public int? StateId { get; set; }
        public string State { get; set; }
        public int? SpecialityId { get; set; }
        public int? EducationFormId { get; set; }
        public int? EntranceYear { get; set; }
        public int? EntranceYearByOrder { get; set; }
        public int? SpecializationId { get; set; }
        [JsonIgnore]
        public virtual ICollection<PgContractStuff> ContractStuffs { get; set; }
    }
}
