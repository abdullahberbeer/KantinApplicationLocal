using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace KantinAPI.DTO.Auth
{
    public class UserForRegisterDTO
    {
        [Required(ErrorMessage = "name gerekli bir alan")]
        [StringLength(50, MinimumLength = 5, ErrorMessage = "Maksimum 50 minimum 10 karakter girmelisiniz..")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "name gerekli bir alan")]
        [StringLength(50, MinimumLength = 5, ErrorMessage = "Maksimum 50 minimum 10 karakter girmelisiniz..")]
        public string LastName { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Role { get; set; } = "Admin";
        [Required]
        public string Password { get; set; }
        
    
    }
}
