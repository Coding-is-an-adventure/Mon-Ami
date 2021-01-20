using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Domain
{
    public class Picture
    {
        public string Id { get; set; }

        public string Url { get; set; }

        public bool IsMain { get; set; }
    }
}
