using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Domain
{
    public class Value
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(3), MaxLength(75)]
        public string Name { get; set; }
    }
}
