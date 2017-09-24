using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Server.Services
{
    public class ClaimsProps: IClaimsProps 
    {
        private IHttpContextAccessor Accessor;
        public ClaimsProps(IHttpContextAccessor contextAccessor)
        {
            Accessor = contextAccessor;
        }
        
        public int GetEmploymentId() 
        {
            Claim claim = Accessor.HttpContext.User.Claims.Where(x => x.Type == "EmploymentId").FirstOrDefault();
            if (claim == null)
                throw new Exception("Not found identity claims: EmploymentId");
            else
                return Convert.ToInt32(claim.Value);
        }       
    }
}