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
    public class PgTypesController : ControllerBase
    {
        private readonly UniversityContext db;

        public PgTypesController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id, QueryArgsBase args)
        {
            var res = db.PgTypes
                .Where(x => x.PgKindId == id && x.InArchive == false)
                .Sort(args)
                .AsNoTracking()
                .ToList();

            return Ok(res);
        }
    }
}
