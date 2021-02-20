using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsCurrentUserRequirement : IAuthorizationRequirement
    {

    }

    public class IsCurrentUserRequirementHandler : AuthorizationHandler<IsCurrentUserRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public IsCurrentUserRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCurrentUserRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Task.CompletedTask;


            var profileName = _httpContextAccessor.HttpContext?.Request.RouteValues
                .SingleOrDefault(x => x.Key == "username").Value?.ToString();
            if (profileName == null) return Task.CompletedTask;

            foreach (var item in _dbContext.Users.ToArray())
            {
                if (item.Id == userId && item.UserName == profileName) {
                    context.Succeed(requirement);
                }
            }
            
            return Task.CompletedTask;
        } 
    }
}