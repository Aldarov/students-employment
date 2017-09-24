using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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
    public class PlacementsController : Controller
    {
        private UniversityContext db;
        private int employmentId;
        public PlacementsController(UniversityContext context, IClaimsProps claimsProps)
        {
            this.db = context;
            this.employmentId = claimsProps.GetEmploymentId();
        }

        [HttpGet()]
        public JsonResult Get(QueryArgsBase args)
        {
            IQueryable<Placement> query = db.Placements.AsQueryable();
            if (args.q == null)
                query = query.FromSql<Placement>("select * from dbo.pg_placements({0})", employmentId);
            else
                query = query.FromSql<Placement>("select * from dbo.pg_search_placements({0}, {1})", employmentId, args.q);
                
            var res = query.Filter(Request.Query.ToList())
                .Sort(args)
                .AsNoTracking()
                .PaginateResult(args);
            return Json(res);
        }

        [HttpGet("{id}")]
        public PgHeader Get(int id)
        {
            var res = db.PgHeaders
                .Include(x => x.EduForm)
                .Include(x => x.PgContractStuffs).ThenInclude(x => x.DirectionType)
                .Include(x => x.PgContractStuffs).ThenInclude(x => x.DirectionOrganization)
                .Include(x => x.PgContractStuffs).ThenInclude(x => x.DirectionSchool)
                .Include(x => x.PgContractStuffs).ThenInclude(x => x.DistributionType)
                .Include(x => x.PgContractStuffs).ThenInclude(x => x.DistributionOrganization)
                .Include(x => x.PgContractStuffs).ThenInclude(x => x.DistributionSchool)
                .Include(x => x.PgContractStuffs).ThenInclude(x => x.Student)
                .Where(x => x.Id == id)
                .AsNoTracking()
                .SingleOrDefault();
            return res;
        }        
    }
}