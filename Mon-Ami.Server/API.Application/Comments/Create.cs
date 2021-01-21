using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using API.Application.Comments.DTOs;
using API.Application.ErrorHandlers;
using API.Domain;
using API.Persistence;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Comments
{
    public class Create : IRequest
    {
        public class Command : IRequest<CommentDTO>
        {
            public string Body { get; set; }

            public Guid ActivityId { get; set; }

            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<CommentDTO> Handle(Command request, CancellationToken token)
            {
                Activity activity = await _context.Activities.FindAsync(new object[] { request.ActivityId }, token);
                bool succes = await _context.SaveChangesAsync(token) > 0;

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Not found" });
                }

                AppUser user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username, token);

                Comment comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                activity.Comments.Add(comment);

                if (succes == true)
                {
                    return _mapper.Map<CommentDTO>(comment);
                }

                // Throws an error if the count is equal or smaller than 0.
                // This means that 0 changes have been made in the database.
                throw new Exception("A problem occured while trying to save the changes.");
            }
        }
    }
}
