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
    public class EduFormsController : ControllerBase
    {
        private readonly UniversityContext db;
        public EduFormsController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet()]
        public IActionResult Get(QueryArgsBase args)
        {
            var res = db.EducationForms
                .Sort(args)
                .AsNoTracking()
                .ToList();

            return Ok(res);
        }
    }
}
