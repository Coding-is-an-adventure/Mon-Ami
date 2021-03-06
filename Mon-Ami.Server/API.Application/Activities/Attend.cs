﻿using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using API.Application.ErrorHandlers;
using API.Application.Interfaces;
using API.Domain;
using API.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Activities
{
    public class Attend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(
                Command request,
                CancellationToken token)
            {
                Activity activity =
                    await _context.Activities.FindAsync(new object[] { request.Id }, token);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Could not find the activity" });
                }

                var user = await _context.Users.SingleOrDefaultAsync(
                    x =>
                    x.UserName == _userAccessor.GetCurrentUsername(), token);

                var attendance = await _context.UserActivities.SingleOrDefaultAsync(
                    x =>
                    x.ActivityId == activity.Id && x.AppUserId == user.Id, token);

                if (attendance != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Attendance = "Already attending this activity" });
                }

                attendance = new UserActivity
                {
                    Activity = activity,
                    AppUser = user,
                    IsHost = false,
                    DateJoined = DateTime.Now
                };

                _context.UserActivities.Add(attendance);

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
