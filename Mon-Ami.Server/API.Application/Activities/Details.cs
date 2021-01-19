using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using API.Application.Activities.DTOs;
using API.Application.ErrorHandlers;
using API.Domain;
using API.Persistence;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Activities
{
    public class Details
    {
        public class Query : IRequest<ActivityDTO>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ActivityDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ActivityDTO> Handle(
                Query request,
                CancellationToken token)
            {
                Activity activity = await _context.Activities
                    .FindAsync(new object[] { request.Id }, token);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not found" });
                }

                ActivityDTO activityToReturn = _mapper.Map<Activity, ActivityDTO>(activity);

                return activityToReturn;
            }
        }
    }
}
