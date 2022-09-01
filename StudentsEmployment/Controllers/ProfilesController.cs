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
    public class ProfilesController : ControllerBase
    {
        private readonly UniversityContext db;

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
