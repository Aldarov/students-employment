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
    public class SchoolsController : ControllerBase
    {
        private readonly UniversityContext db;
        public SchoolsController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet()]
        public IActionResult Get(QueryArgsBase args)
        {
            var query = db.Schools.AsQueryable();

            if (args.q != null)
                query = query.Where(x => x.Name.Contains(args.q));

            var res = query
                .Sort(args)
                .AsNoTracking()
                .PaginateResult(args);

            return Ok(res);
        }
    }
}