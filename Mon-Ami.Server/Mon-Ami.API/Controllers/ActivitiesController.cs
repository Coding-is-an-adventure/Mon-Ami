using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Application.Activities;
using API.Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult<List<Activity>>> ActivityList(CancellationToken token)
        {
            List<Activity> result = await _mediator.Send(new ActivityList.Query(), token);
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> ActivityDetails(Guid id, CancellationToken token)
        {
            Activity result = await _mediator.Send(new ActivityDetails.Query { Id = id }, token);
            return result;
        }
    }
}
