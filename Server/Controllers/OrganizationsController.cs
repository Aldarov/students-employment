using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
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
    public class OrganizationsController : Controller
    {
        private UniversityContext db;
        public OrganizationsController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet()]
        public IActionResult Get(QueryArgsBase args)
        {
            IQueryable<Organization> query = db.Organizations.AsQueryable();
            if (args.q != null)
                query = query.Where(x => x.Name.Contains(args.q));
            var res = query.Filter(Request.Query.ToList())
                .Sort(args)
                .AsNoTracking()
                .PaginateResult(args);

            return Json(res);
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
        public JuridicalPerson Get(int id)
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
            return res;
        }        
    }
}