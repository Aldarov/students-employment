using Common.Model.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Infrastructure;
using StudentsEmployment.DAL;
using StudentsEmployment.DAL.Entities;

namespace StudentsEmployment.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class OrganizationsController : ControllerBase
    {
        private readonly UniversityContext db;

        public OrganizationsController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet()]
        public IActionResult Get(QueryArgsBase args)
        {
            IQueryable<Organization> query = db.Organizations.AsQueryable();
            if (args.q != null)
                query = query.Where(x => x.Name.Contains(args.q.Trim()));
            var res = query.Filter(Request.Query.ToList())
                .Sort(args)
                .AsNoTracking()
                .PaginateResult(args);

            return Ok(res);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var org = new JuridicalPerson() { Id = id };
            db.JuridicalPersons.Remove(org);
            db.SaveChanges();

            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var res = db.JuridicalPersons
                .Include(x => x.Country)
                .Include(x => x.RegistrationRegion)
                .Include(x => x.RegistrationDistrict)
                .Include(x => x.RegistrationCity)
                .Include(x => x.RegistrationSettlement)
                .Where(x => x.Id == id)
                .AsNoTracking()
                .SingleOrDefault();

            return Ok(res);
        }

        [HttpPost]
        public IActionResult Post([FromBody] JuridicalPerson org)
        {
            if (org == null)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                var existingOrg = db.JuridicalPersons
                    .FirstOrDefault(x => x.Id == org.Id);

                if (existingOrg == null)
                {
                    db.Add(org);
                }
                else
                {
                    db.Entry(existingOrg).CurrentValues.SetValues(org);
                }
                db.SaveChanges();

                return Ok(org);
            }
            else
            {
                return BadRequest(ModelState.Values.Select(a => a.Errors.Select(z => z.ErrorMessage)));
            }
        }
    }
}