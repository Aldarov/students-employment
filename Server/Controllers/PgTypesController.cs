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
    public class PgTypesController : Controller
    {
        private UniversityContext db;
        public PgTypesController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id, QueryArgsBase args)
        {
            var res = db.PgTypes
                .Where(x => x.PgKindId == id)
                .Sort(args)
                .AsNoTracking()
                .ToList();
            return Ok(res);
        }
    }
}