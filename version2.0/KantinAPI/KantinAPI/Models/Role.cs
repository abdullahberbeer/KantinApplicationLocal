using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.Models
{
    public class Role:IdentityRole<int>
    {
        public bool  IsActive { get; set; }
    }
}
