using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        public string Biography { get; set; }

        public virtual ICollection<UserActivity> UserActivities { get; set; }

        public virtual ICollection<Picture> Pictures { get; set; }
    }
}
