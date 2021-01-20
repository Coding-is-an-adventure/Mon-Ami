using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using API.Application.ErrorHandlers;
using API.Application.Interfaces;
using API.Application.Validators;
using API.Domain;
using API.Persistence;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }

            public string Username { get; set; }

            public string Email { get; set; }

            public string Password { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
                RuleFor(x => x.Email).NotEmpty()
                                     .EmailAddress();
                RuleFor(x => x.Password).Password();
            }
        }

        public class Handler : IRequestHandler<Command, User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(
                DataContext context,
                UserManager<AppUser> userManager,
                IJwtGenerator jwtGenerator)
            {
                _context = context;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }

            public async Task<User> Handle(Command request, CancellationToken token)
            {
                bool emailNotUnique = await _context.Users.AnyAsync(x => x.Email == request.Email, token);
                if (emailNotUnique)
                {
                    throw new RestException(HttpStatusCode.BadRequest, "This email already exists.");
                }

                bool userNameNotUnique = await _context.Users.AnyAsync(x => x.UserName == request.Username, token);
                if (userNameNotUnique)
                {
                    throw new RestException(HttpStatusCode.BadRequest, "This username already exists.");
                }

                AppUser user = new AppUser
                {
                    DisplayName = request.DisplayName,
                    Email = request.Email,
                    UserName = request.Username
                };

                IdentityResult result = await _userManager.CreateAsync(user, request.Password);
                if (result.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Token = _jwtGenerator.CreateToken(user),
                        UserName = user.UserName,
                        Image = user.Pictures.FirstOrDefault(x => x.IsMain)?.Url
                    };
                }

                throw new Exception("A problem occured while trying to create a user.");
            }
        }
    }
}
