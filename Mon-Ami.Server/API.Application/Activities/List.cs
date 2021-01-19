using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using API.Application.Activities.DTOs;
using API.Domain;
using API.Persistence;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDTO>>
        {
        }

        public class Handler : IRequestHandler<Query, List<ActivityDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<ActivityDTO>> Handle(
                Query request,
                CancellationToken token)
            {
                List<Activity> activities = await _context.Activities
                    .ToListAsync(token);

                return _mapper.Map<List<Activity>, List<ActivityDTO>>(activities);
            }
        }
    }
}
