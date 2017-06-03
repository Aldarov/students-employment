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
            var p = db.Placements
                //.Include(x => x.EduForm)
                .Embed(Request.Query.ToList())
                .Filter(Request.Query.ToList())
                .Sort(args)
                .Paginate(args);
            return p;
        }        
    }
}