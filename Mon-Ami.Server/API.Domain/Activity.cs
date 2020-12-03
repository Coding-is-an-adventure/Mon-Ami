﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Domain
{
    public class Activity
    {
        public Guid Id { get; set; }

        [MaxLength(60)]
        public string Title { get; set; }

        [MaxLength(60)]
        public string Description { get; set; }

        [MaxLength(60)]
        public string Category { get; set; }

        public DateTime Date { get; set; }

        [MaxLength(35)]
        public string City { get; set; }

        [MaxLength(95)]
        public string Venue { get; set; }
    }
}
