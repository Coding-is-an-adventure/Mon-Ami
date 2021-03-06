﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using API.Application.ErrorHandlers;
using API.Application.Interfaces;
using API.Domain;
using API.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Pictures
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPictureAccessor _pictureAccessor;

            public Handler(
                DataContext context,
                IUserAccessor userAccessor,
                IPictureAccessor pictureAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _pictureAccessor = pictureAccessor;
            }

            public async Task<Unit> Handle(
                Command request,
                CancellationToken token)
            {
                AppUser user = await _context
                                        .Users
                                        .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(), token);
                Picture picture = user
                                    .Pictures
                                    .FirstOrDefault(x => x.Id == request.Id);

                if (picture == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { Picture = "Not found" });
                }

                if (picture.IsMain)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Picture = "You can't delete your main picture." });
                }

                user.Pictures.Remove(picture);

                var result = _pictureAccessor.DeletePicture(picture.Id);

                if (result == null)
                {
                    throw new Exception("An error occurred while attempting to delete the picture");
                }

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
