using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Auth;
using Server.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Server.Models.University;
using Microsoft.AspNetCore.Authorization;
using Server.Infrastructure;

namespace Server.Controllers
{
    // [Authorize]
    [Route("api/[controller]")]
    public class PlacementsController : Controller
    {
        private UniversityContext db;
        public PlacementsController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet()]
        public IEnumerable<Placement> Get(QueryArgsBase args)
        {
            var res = db.Placements
                .Search("select * from dbo.pg_search_placements({0})", args)
                .Filter(Request.Query.ToList())
                .Sort(args)
                .Paginate(args)
                .AsNoTracking();
            return res;
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
                .Where(x => x.Id == id)
                .AsNoTracking()
                .SingleOrDefault();
            return res;
        }        
    }
}