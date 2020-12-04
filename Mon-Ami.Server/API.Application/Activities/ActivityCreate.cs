using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using API.Domain;
using API.Persistence;
using MediatR;

namespace API.Application.Activities
{
    public class ActivityCreate
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

            public string Title { get; set; }

            public string Description { get; set; }

            public string Category { get; set; }

            public DateTime Date { get; set; }

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
                Activity activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue
                };

                _context.Activities.Add(activity);
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
