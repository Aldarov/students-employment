using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Auth;
using Microsoft.EntityFrameworkCore;
using Server.Models.University;
using Microsoft.AspNetCore.Authorization;
using Server.Infrastructure;
using Server.Services;

namespace Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class SpecialitiesController : Controller
    {
        private UniversityContext db;
        private int employmentId;
        public SpecialitiesController(UniversityContext context, IClaimsProps claimsProps)
        {
            db = context;
            this.employmentId = claimsProps.GetEmploymentId();
        }

        [HttpGet()]
        public IActionResult Get(QueryArgsBase args)
        {
            IQueryable<Speciality> query = db.Specialities
                .FromSql<Speciality>("select speciality_id, speciality from dbo.pg_access_to_specialities({0})", employmentId);
            if (args.q != null)
                query = query.Where(x => x.Name.Contains(args.q));

            var res = query
                .Filter(Request.Query.ToList())
                .Sort(args)
                .AsNoTracking()
                .PaginateResult(args);
            return Ok(res);
        }
    }
}