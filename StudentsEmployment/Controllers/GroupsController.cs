using Common.Model.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Infrastructure;
using StudentsEmployment.DAL;

namespace StudentsEmployment.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class GroupsController : ControllerBase
    {
        private readonly UniversityContext db;

        public GroupsController(UniversityContext context)
        {
            db = context;
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
