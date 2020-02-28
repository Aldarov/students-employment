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
    public class GroupsController : Controller
    {
        private UniversityContext db;
        private int employmentId;
        public GroupsController(UniversityContext context, IClaimsProps claimsProps)
        {
            db = context;
            this.employmentId = claimsProps.GetEmploymentId();
        }

        [HttpGet()]
        public IActionResult Get(QueryArgsBase args)
        {
            var res = db.Groups
                .Filter(Request.Query.ToList())
                .Sort(args)
                .AsNoTracking()
                .ToList();
            return Ok(res);
        }

        [HttpGet("{specialityId}")]
        public IActionResult Get(int specialityId, QueryArgsBase args)
        {
            var res = db.Groups
                .Where(x => x.SpecialityId == specialityId)
                .Filter(Request.Query.ToList())
                .Sort(args)
                .AsNoTracking()
                .ToList();
            return Ok(res);
        }
    }
}
