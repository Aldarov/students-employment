using Common.Model.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Infrastructure;
using StudentsEmployment.DAL;
using StudentsEmployment.ExtensionMethods;

namespace StudentsEmployment.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class SpecialitiesController : ControllerBase
    {
        private readonly UniversityContext db;

        private readonly int _employmentId;
        public SpecialitiesController(UniversityContext context, IHttpContextAccessor httpContextAccessor)
        {
            db = context;
            _employmentId = httpContextAccessor.HttpContext.GetEmploymentId();
        }

        [HttpGet()]
        public IActionResult Get(QueryArgsBase args)
        {
            var query = db.Specialities
                .FromSqlInterpolated($"select speciality_id, speciality from dbo.pg_access_to_specialities({_employmentId})");
            if (args.q != null)
                query = query.Where(x => x.Name.Contains(args.q));

            var res = query
                .Filter(Request.Query.ToList())
                .Sort(args)
                .AsNoTracking()
                .PaginateResult(args);

            return Ok(res);
        }
    }
}