using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using API.Domain;
using API.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Profile> Handle(
                Query request,
                CancellationToken token)
            {
                AppUser user = await _context.Users
                                         .SingleOrDefaultAsync(x => x.UserName == request.Username);

                return new Profile
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Image = user.Pictures.FirstOrDefault(x => x.IsMain)?.Url,
                    Pictures = user.Pictures,
                    Biography = user.Biography
                };
            }
        }
    }
}
