using System.Threading.Tasks;
using API.Application.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mon_Ami.API.Controllers
{
    [AllowAnonymous]
    public class UserController : APIControllerBase
    {
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }
    }
}
