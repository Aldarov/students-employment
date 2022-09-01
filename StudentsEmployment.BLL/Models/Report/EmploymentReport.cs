using StudentsEmployment.DAL.Entities;

namespace StudentsEmployment.BLL.Models.Report
{
    public class EmploymentReport
    {
        public PlacementHeader Header { get; set; }

        public IEnumerable<Employment> Employments { get; set; }
    }
}
