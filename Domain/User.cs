using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public enum Role {
        user, seller
    }  

    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Role UserRole {get; set; }
        public ICollection<Address> Addresses { get; set; } = new List<Address>();
        public ICollection<Cart> Orders { get; set; } = new List<Cart>();
    }
}