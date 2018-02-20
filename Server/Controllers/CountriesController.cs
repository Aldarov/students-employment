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

namespace Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class CountriesController : Controller
    {
        private UniversityContext db;
        public CountriesController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet()]
        public IActionResult Get(QueryArgsBase args)
        {
            IQueryable<Country> query = db.Contries.AsQueryable();
            if (args.q != null)
                query = query.Where(x => x.Name.Contains(args.q));
            var res = query
                .Sort(args)
                .AsNoTracking()
                .PaginateResult(args);

            return Json(res);
        }
    }
}