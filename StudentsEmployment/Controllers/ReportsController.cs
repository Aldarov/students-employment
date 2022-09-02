using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rotativa.AspNetCore;
using StudentsEmployment.BLL.Models.Report;
using StudentsEmployment.DAL;

namespace StudentsEmployment.Controllers
{
    public class ReportsController : Controller
    {
        private readonly UniversityContext db;

        public ReportsController(UniversityContext context)
        {
            db = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Distribution(int id)
        {
            var model = new DistributionReport()
            {
                Header = db.PlacementHeaders
                    .FromSqlInterpolated($"select * from pg_header_placements({id})")
                    .ToArray()
                    .FirstOrDefault(),
                Distributions = db.Distributions
                    .FromSqlInterpolated($"select * from pg_distribution({id}) order by fio")
                    .ToArray()
            };

            return new ViewAsPdf(model) { PageOrientation = Rotativa.AspNetCore.Options.Orientation.Landscape };
        }

        public IActionResult Employment(int id)
        {
            var model = new EmploymentReport()
            {
                Header = db.PlacementHeaders
                    .FromSqlInterpolated($"select * from pg_header_placements({id})")
                    .ToArray()
                    .FirstOrDefault(),
                Employments = db.Employments
                    .FromSqlInterpolated($"select * from pg_employment({id}) order by fio")
                    .ToArray()
            };

            return new ViewAsPdf(model) { PageOrientation = Rotativa.AspNetCore.Options.Orientation.Landscape };
        }
    }
}
