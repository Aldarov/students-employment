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
    public class AddressesController : Controller
    {
        private UniversityContext db;
        public AddressesController(UniversityContext context)
        {
            db = context;
        }

        [HttpGet()]
        public IActionResult Get(QueryArgsBase args)
        {
            IQueryable<Address> query = db.Addresses.AsQueryable();
            if (args.q != null)
                query = query.Where(x => x.Name.Contains(args.q));
            var res = query.Filter(Request.Query.ToList())
                .Sort(args)
                .AsNoTracking()
                .PaginateResult(args);

            return Json(res);
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
            return Json(res);
        }
    }
}