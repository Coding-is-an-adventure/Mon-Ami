using System.Collections.Generic;
using API.Domain;

namespace API.Application.Profiles
{
    public class Profile
    {
        public string DisplayName { get; set; }

        public string Username { get; set; }

        public string Image { get; set; }

        public string Biography { get; set; }

        public ICollection<Picture> Pictures { get; set; }
    }
}
