using System;

namespace Domain
{
    public class CartAddress
    {
        public Guid CartAddressId { get; set; }
        public string Street { get; set; }
        public string ApartmentNumber { get; set; }
        public string AddressNumber { get; set; }
        public string City { get; set; }
        public string PostCode { get; set; }
        public string Notes { get; set; }
    }
}