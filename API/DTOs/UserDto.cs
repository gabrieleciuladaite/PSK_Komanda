using Domain;
using System.Collections.Generic;

namespace API.DTOs
{
    public class UserDto
    {
        public string FirstName { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }
        public string Email { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber {get; set; }
        public ICollection<AddressDto> Addresses { get; set; } = new List<AddressDto>();
        public Role Role { get; set; }
    }
}