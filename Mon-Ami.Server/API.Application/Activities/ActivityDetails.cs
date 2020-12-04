using System;
using System.Threading;
using System.Threading.Tasks;
using API.Domain;
using API.Persistence;
using MediatR;

namespace API.Application.Activities
{
    public class ActivityDetails
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(
                Query request,
                CancellationToken token)
            {
                Activity activity = await _context.Activities.FindAsync(new object[] { request.Id }, token);
                return activity;
            }
        }
    }
}
