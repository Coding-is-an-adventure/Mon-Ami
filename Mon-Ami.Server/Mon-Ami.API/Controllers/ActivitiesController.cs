﻿using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using API.Application.Activities;
using API.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Mon_Ami.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivityList(CancellationToken token)
        {
            List<Activity> result = await _mediator.Send(new List.Query(), token);
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id, CancellationToken token)
        {
            Activity result = await _mediator.Send(new Details.Query { Id = id }, token);
            return result;
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> CreateActivity(Create.Command command, CancellationToken token)
        {
            Unit result = await _mediator.Send(command, token);
            return result;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> EditActivity(Guid id, Edit.Command command, CancellationToken token)
        {
            command.Id = id;
            Unit result = await _mediator.Send(command, token);
            return result;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> DeleteActivity(Guid id, Delete.Command command, CancellationToken token)
        {
            command.Id = id;
            Unit result = await _mediator.Send(new Delete.Command { Id = id }, token);
            return result;
        }
    }
}
