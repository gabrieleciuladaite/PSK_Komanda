using System;

namespace Application.DTOs
{
    public class AddressDTO
    {
        public Guid AddressId { get; set; }
        public string UserId { get; set; }
        public string AddressName { get; set; }
        public string Street { get; set; }
        public string ApartmentNumber { get; set; }
        public string AddressNumber { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string Notes { get; set; }
    }
}