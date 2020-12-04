using System;
using System.Threading;
using System.Threading.Tasks;
using API.Domain;
using API.Persistence;
using MediatR;

namespace API.Application.Activities
{
    public class ActivityEdit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public string Title { get; set; }

            public string Description { get; set; }

            public string Category { get; set; }

            public DateTime? Date { get; set; }

            public string City { get; set; }

            public string Venue { get; set; }
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

                // if the left side is null, the right of the operator will be executed.
                activity.Title = request.Title ?? activity.Title;
                activity.Description = request.Description ?? activity.Description;
                activity.Category = request.Category ?? activity.Category;
                activity.Date = request.Date ?? activity.Date;
                activity.City = request.City ?? activity.City;
                activity.Venue = request.Venue ?? activity.Venue;

                bool succes = await _context.SaveChangesAsync(token) > 0;
                if (succes == true)
                {
                    return Unit.Value;
                }

                // Throws an error if the count is equal or smaller than 0.
                // This means that 0 changes have been made in the database.
                throw new Exception("A problem occured while trying to save the changes.");
            }
        }
    }
}
