using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Application.User;
using API.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Mon_Ami.API.Controllers
{
    public class UserController : APIControllerBase
    {
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }
    }
}
