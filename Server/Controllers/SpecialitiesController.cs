using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
    [Authorize]
    [Route("api/[controller]")]
    public class SpecialitiesController : Controller
    {
        private UniversityContext db;
        public SpecialitiesController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet()]
        public IActionResult Get()
        {
            var res = db.Structures
                .Where(x => x.SpecialityId != null && (new[] {1, 5}).Contains(x.AffiliateId))
                .Select(x => new Speciality() { Id = (int)x.SpecialityId, Name = (string)x.Speciality})
                .OrderBy(x => x.Name)
                .AsNoTracking()
                .ToList();
            
            return Ok(Request);
        }
    }
}