using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using API.Application.ErrorHandlers;
using API.Domain;
using API.Persistence;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace API.Application.User
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }

            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;

            public Handler(
                UserManager<AppUser> userManager,
                SignInManager<AppUser> signInManager)
            {
                _userManager = userManager;
                _signInManager = signInManager;
            }

            public async Task<User> Handle(
                Query request,
                CancellationToken cancellationToken)
            {
                AppUser user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }

                SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (result.Succeeded)
                {
                    // TODO: generate token
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        UserName = user.UserName,
                        Image = null,
                        Token = "Todo: This needs to be a token"
                    };
                }

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
