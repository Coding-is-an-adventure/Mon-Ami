using System;
using System.Threading;
using System.Threading.Tasks;
using API.Domain;
using API.Persistence;
using MediatR;

namespace API.Application.Activities
{
    public class ActivityDelete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(
                Command request,
                CancellationToken token)
            {
                Activity activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                {
                    throw new Exception("Could not find the specified activity");
                }

                _context.Remove(activity);

                bool succes = await _context.SaveChangesAsync(token) > 0;

                if (succes == true)
                {
                    return Unit.Value;
                }

                // Throws an error if the count is equal or smaller than 0.
                // This means that 0 changes have been made in the database.
                throw new Exception("A problem occured while trying to delete the activity");
            }
        }
    }
}
