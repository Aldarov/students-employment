using System.ComponentModel.DataAnnotations;

class Speciality
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
}