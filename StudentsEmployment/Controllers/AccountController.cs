using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentsEmployment.BLL.Interfaces;
using StudentsEmployment.BLL.Models.Auth;
using StudentsEmployment.DAL;
using System.Security.Claims;
using System.Xml.Linq;

namespace StudentsEmployment.Controllers
{
    [Route("api")]
    public class AccountController : ControllerBase
    {
        private readonly UniversityContext db;
        private readonly IAuthService _authService;

        public AccountController(UniversityContext context, IAuthService authService)
        {
            db = context;
            _authService = authService;
        }

        private ClaimsIdentity GetClaimsIdentity(string employmentId)
        {
            var claims = new List<Claim>
                {
                    new Claim("EmploymentId", employmentId)
                };
            var identity = new ClaimsIdentity(claims, "Token");
            return identity;
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] AuthProps props)
        {
            string sessionId = props != null ? props.SessionId : null;
            if (sessionId == null)
            {
                return BadRequest("Необходимо авторизоваться");
            }

            var client = new Http­Client();
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/xml"));
            var response = client.GetAsync("http://my.bsu.ru/auth.php?id=" + sessionId).Result;
            if (response.IsSuccessStatusCode)
            {
                var stringAuth = await response.Content.ReadAsStringAsync();
                XDocument xdoc = XDocument.Parse(stringAuth);
                XElement res = xdoc.Descendants("result").FirstOrDefault();
                if (res != null)
                {
                    string state = res.Attributes().Where(q => q.Name == "state").Select(q => q.Value).FirstOrDefault();
                    if (state == "1")
                    {
                        var check = db.Placements
                            .FromSqlInterpolated($"select * from dbo.pg_access_to_specialities({props.EmploymentId})")
                            .Any();
                        if (check)
                        {
                            var identity = GetClaimsIdentity(props.EmploymentId);
                            return Ok(_authService.GetToken(identity));
                        }
                        else
                        {
                            return BadRequest("Ваше подразделение не добавлено в список разрешенных, обратитесь в ЦИТиДО");
                        }
                    }
                    else
                        return StatusCode(403);
                }
            }
            return Unauthorized();
        }

        [HttpPost("token")]
        public IActionResult RefreshToken([FromBody] Token token)
        {
            var refreshToken = token.RefreshToken;
            if (refreshToken == null)
            {
                return BadRequest();
            }

            try
            {
                ClaimsPrincipal principal = _authService.DecodeToken(refreshToken);
                string employmentId = principal.FindFirst("EmploymentId").Value;

                var identity = GetClaimsIdentity(employmentId);
                Token newToken = _authService.GetToken(identity);
                return Ok(newToken);
            }
            catch
            {
                return StatusCode(403);
            }
        }

    }
}
