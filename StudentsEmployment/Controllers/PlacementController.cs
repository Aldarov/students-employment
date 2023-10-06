using Common.Model.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Infrastructure;
using StudentsEmployment.DAL;
using StudentsEmployment.DAL.Entities;
using StudentsEmployment.ExtensionMethods;

namespace StudentsEmployment.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class PlacementsController : ControllerBase
    {
        private readonly UniversityContext db;
        private readonly int _employmentId;

        public PlacementsController(UniversityContext context, IHttpContextAccessor httpContextAccessor)
        {
            db = context;
            _employmentId = httpContextAccessor.HttpContext.GetEmploymentId();
        }

        [HttpGet()]
        public IActionResult Get(QueryArgsBase args)
        {
            IQueryable<Placement> query;

            if (args.q != null)
                query = db.Placements.FromSqlInterpolated($"select * from dbo.pg_search_placements({_employmentId}, {args.q.Trim()})");
            else
                query = db.Placements.FromSqlInterpolated($"select * from dbo.pg_placements({_employmentId})");

            var res = query.Filter(Request.Query.ToList())
                .Sort(args)
                .AsNoTracking()
                .PaginateResult(args);

            return Ok(res);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var res = db.PgHeaders
                .Include(x => x.PgContractStuffs).ThenInclude(x => x.DirectionOrganization)
                .Include(x => x.PgContractStuffs).ThenInclude(x => x.DirectionSchool)
                .Include(x => x.PgContractStuffs).ThenInclude(x => x.DistributionOrganization)
                .Include(x => x.PgContractStuffs).ThenInclude(x => x.DistributionSchool)
                .Include(x => x.PgContractStuffs).ThenInclude(x => x.Student)
                .Where(x => x.Id == id)
                .AsNoTracking()
                .SingleOrDefault();

            return Ok(res);
        }

        private IActionResult checkExistHeader(PgHeader header)
        {
            if (header == null)
            {
                return BadRequest();
            }
            bool exists;
            if (header.GroupId > 0)
            {
                exists = db.PgHeaders.Any(x =>
                    x.Id != header.Id
                    && x.GroupId == header.GroupId
                );
            }
            else
            {
                exists = db.PgHeaders.Any(x =>
                    x.Id != header.Id
                    && x.SpecialityId == header.SpecialityId
                    && x.EntraceYear == header.EntraceYear
                    && x.EduFormId == header.EduFormId
                    && x.SpecializationId == header.SpecializationId
                );
            }

            if (exists)
            {
                return BadRequest("Документ с текущей специальностью, годом обучения, формой обучения и образовательной программой уже существует. " +
                    "Пожалуйста вносите изменения в уже созданный документ, данный документ не будет сохранен.");
            }
            return Ok();
        }

        [HttpPost("CheckExistHeader")]
        public IActionResult CheckExistHeader([FromBody] PgHeader header)
        {
            return checkExistHeader(header);
        }

        [HttpPost]
        public IActionResult Post([FromBody] PgHeader header)
        {
            var res = checkExistHeader(header);
            if (res is BadRequestObjectResult)
            {
                return res;
            }

            if (ModelState.IsValid)
            {
                var existingHeader = db.PgHeaders
                    .Include(x => x.PgContractStuffs)
                    .FirstOrDefault(x => x.Id == header.Id);

                if (existingHeader == null)
                {
                    db.Add(header);
                }
                else
                {
                    db.Entry(existingHeader).CurrentValues.SetValues(header);

                    foreach (var stuff in header.PgContractStuffs)
                    {
                        stuff.Student = null;
                        PgContractStuff existingStuff = null;
                        if (stuff?.Id > 0)
                        {
                            existingStuff = existingHeader.PgContractStuffs
                                .FirstOrDefault(x => x.Id == stuff.Id);
                        }
                        if (existingStuff == null)
                        {
                            existingHeader.PgContractStuffs.Add(stuff);
                        }
                        else
                        {
                            db.Entry(existingStuff).CurrentValues.SetValues(stuff);
                        }
                    }

                    foreach (var stuff in existingHeader.PgContractStuffs)
                    {
                        if (!header.PgContractStuffs.Any(x => x.Id == stuff.Id))
                        {
                            db.Remove(stuff);
                        }
                    }
                }
                db.SaveChanges();

                return Ok(header);
            }
            else
            {
                return BadRequest(ModelState.Values.Select(a => a.Errors.Select(z => z.ErrorMessage)));
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var header = new PgHeader() { Id = id };
            db.PgHeaders.Remove(header);
            db.SaveChanges();

            return Ok();
        }
    }
}
