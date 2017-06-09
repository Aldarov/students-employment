using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Server.Models.University
{
    public class Student
    {
        public int PersonId { get; set; }
        [Key]
        public int StudentId { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Patronymic { get; set; }
        
    }
}