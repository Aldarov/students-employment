using StudentsEmployment.DAL.Entities;

namespace StudentsEmployment.BLL.Models.Report
{
    public class DistributionReport
    {
        public PlacementHeader Header { get; set; }

        public IEnumerable<Distribution> Distributions { get; set; }
    }
}
