using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Domain;
using API.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

#pragma warning disable SA1402 // File may only contain a single type
    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
#pragma warning restore SA1402 // File may only contain a single type
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _context;

        public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            string currentUserName = _httpContextAccessor
                .HttpContext
                .User?
                .Claims?
                .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?
                .Value;

            Guid activityId = Guid.Parse(_httpContextAccessor
                .HttpContext
                .Request
                .RouteValues
                .SingleOrDefault(x => x.Key == "id").Value.ToString());

            Activity activity = _context.Activities.FindAsync(activityId).Result;

            var host = activity.UserActivities.FirstOrDefault(x => x.IsHost);

            if (host?.AppUser?.UserName == currentUserName)
            {
                context.Succeed(requirement);
            }
            else
            {
                context.Fail();
            }

            return Task.CompletedTask;
        }
    }
}
