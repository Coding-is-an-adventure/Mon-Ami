using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Application.Interfaces;
using API.Domain;
using API.Persistence;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Pictures
{
    public class Add
    {
        public class Command : IRequest<Picture>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Picture>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPictureAccessor _pictureAccessor;

            public Handler(
                DataContext context,
                IUserAccessor userAccessor,
                IPictureAccessor pictureAccessor
                )
            {
                _context = context;
                _userAccessor = userAccessor;
                _pictureAccessor = pictureAccessor;
            }

            /* Normally a command would not return a value,
             * but we cannot generate this on the clientside
             */
            public async Task<Picture> Handle(
                Command request,
                CancellationToken token)
            {
                PictureUploadResult pictureUploadResult = _pictureAccessor.AddPicture(request.File);

                AppUser user = await _context
                    .Users
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername()
                );

                Picture picture = new Picture
                {
                    Url = pictureUploadResult.Url,
                    Id = pictureUploadResult.PublicId
                };

                if (!user.Pictures.Any(x => x.IsMain))
                {
                    picture.IsMain = true;
                }

                user.Pictures.Add(picture);

                bool succes = await _context.SaveChangesAsync(token) > 0;

                if (succes == true)
                {
                    return picture;
                }

                // Throws an error if the count is equal or smaller than 0.
                // This means that 0 changes have been made in the database.
                throw new Exception("A problem occured while trying to delete the activity");
            }
        }
    }
}
