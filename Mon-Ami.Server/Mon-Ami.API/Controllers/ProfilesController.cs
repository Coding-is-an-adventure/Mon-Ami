﻿using System.Threading;
using System.Threading.Tasks;
using API.Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Mon_Ami.API.Controllers
{
    public class ProfilesController : APIControllerBase
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> Get(string username, CancellationToken token)
        {
            Profile result = await Mediator.Send(new Details.Query { Username = username }, token);
            return result;
        }

        [HttpPut]
        public async Task<ActionResult<Unit>> Edit(Edit.Command command, CancellationToken token)
        {
            Unit result = await Mediator.Send(command, token);
            return result;
        }
    }
}
