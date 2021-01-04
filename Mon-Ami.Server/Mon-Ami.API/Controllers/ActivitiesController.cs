using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using API.Application.Activities;
using API.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Mon_Ami.API.Controllers
{
    public class ActivitiesController : APIControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetList(CancellationToken token)
        {
            List<Activity> result = await Mediator.Send(new List.Query(), token);
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Get(Guid id, CancellationToken token)
        {
            Activity result = await Mediator.Send(new Details.Query { Id = id }, token);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command, CancellationToken token)
        {
            Unit result = await Mediator.Send(command, token);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command, CancellationToken token)
        {
            command.Id = id;
            Unit result = await Mediator.Send(command, token);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id, CancellationToken token)
        {
            Unit result = await Mediator.Send(new Delete.Command { Id = id }, token);
            return result;
        }
    }
}
