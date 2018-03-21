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
            var model = db.Distributions
                .FromSql<Distribution>("select * from pg_distribution({0}) order by fio", id)
                .ToList();
            // AsPdfResultBase
            return new ViewAsPdf(model){ PageOrientation = Rotativa.AspNetCore.Options.Orientation.Landscape };
        }
    }
}
