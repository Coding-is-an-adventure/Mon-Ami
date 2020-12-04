using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<ActionResult<List<Activity>>> ActivityList()
        {
            List<Activity> result = await _mediator.Send(new ActivityList.Query());
            return result;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> ActivityDetails(Guid id)
        {
            Activity result = await _mediator.Send(new ActivityDetails.Query { Id = id });
            return result;
        }
    }
}
