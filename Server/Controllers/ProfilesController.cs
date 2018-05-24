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
    public class ProfilesController : Controller
    {
        private UniversityContext db;
        public ProfilesController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet("{specialityId}")]
        public IActionResult Get(int specialityId, QueryArgsBase args)
        {
            var res = db.Profiles
                .Where(x => x.SpecialityId == specialityId)
                .Filter(Request.Query.ToList())
                .Sort(args)
                .AsNoTracking()
                .ToList();
            return Ok(res);
        }
    }
}
