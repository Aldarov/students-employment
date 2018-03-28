using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Models.University;
using Microsoft.AspNetCore.Authorization;
using Server.Infrastructure;
using Server.Services;
using Rotativa.AspNetCore;
using Server.Models.ViewModel;

namespace Server.Controllers
{
    // [Authorize]
    public class ReportsController : Controller
    {
        private UniversityContext db;
        public ReportsController(UniversityContext context)
        {
            db = context;
        }

        public IActionResult Distribution(int id)
        {
            DistributionReport model = new DistributionReport();
            model.Header = db.PlacementHeaders
                .FromSql<PlacementHeader>("select * from pg_header_placements({0})", id)
                .ToList()
                .FirstOrDefault();

            model.Distributions = db.Distributions
                .FromSql<Distribution>("select * from pg_distribution({0}) order by fio", id)
                .ToList();

            return new ViewAsPdf(model){ PageOrientation = Rotativa.AspNetCore.Options.Orientation.Landscape };
        }

        public IActionResult Employment(int id)
        {
            EmploymentReport model = new EmploymentReport();
            model.Header = db.PlacementHeaders
                .FromSql<PlacementHeader>("select * from pg_header_placements({0})", id)
                .ToList()
                .FirstOrDefault();

            model.Employments = db.Employments
                .FromSql<Employment>("select * from pg_employment({0}) order by fio", id)
                .ToList();

            return new ViewAsPdf(model){ PageOrientation = Rotativa.AspNetCore.Options.Orientation.Landscape };
        }
    }
}
