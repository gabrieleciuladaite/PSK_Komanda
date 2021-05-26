using System;

namespace API.DTOs
{
    public class AddressDto
    {
        public Guid AddressId { get; set; }
        public string AddressName { get; set; }
        public string Street { get; set; }
        public string ApartmentNumber { get; set; }
        public string AddressNumber { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string Notes { get; set; }
    }
}