using System;

namespace Domain
{
    public class CartItem
    {
        public Guid CartId { get; set; }
        public Cart Cart { get; set; }
        public Guid ItembundleId { get; set; }
        public ItemBundle ItemBundle { get; set; }
        public int Quantity { get; set; }
    }
}