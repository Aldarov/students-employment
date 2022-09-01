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
    public class AddressesController : ControllerBase
    {
        private readonly UniversityContext db;
        public AddressesController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet()]
        public IActionResult Get(QueryArgsBase args)
        {
            var query = db.Addresses.AsQueryable();
            if (args.q != null)
                query = query.Where(x => x.Name.Contains(args.q));
            var res = query.Filter(Request.Query.ToList())
                .Sort(args)
                .AsNoTracking()
                .PaginateResult(args);

            return Ok(res);
        }

        [HttpGet("[action]")]
        public IActionResult Search(Address addr)
        {
            Address res =
                db.Addresses.Where(x =>
                    x.RegionId == addr.RegionId &&
                    x.DistrictId == addr.DistrictId &&
                    x.CityId == addr.CityId &&
                    x.SettlementId == addr.SettlementId
                )
                .AsNoTracking()
                .FirstOrDefault();
            return Ok(res);
        }
    }
}