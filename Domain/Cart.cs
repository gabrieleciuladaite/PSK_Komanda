using System;
using System.Collections.Generic;

namespace Domain
{
    public enum Status{
        open,shipped,delivered
    }
    public class Cart
    {
        public Guid CartId { get; set; }
        public string CartToken { get; set; }
        public DateTime LastUsed { get; set; }
        public string? CartOwner { get; set; }
        public ICollection<CartItem> Items { get; set; } = new List<CartItem>();
        public Card Card { get; set; }
        public CartAddress ShippingAddress { get; set; }
        public Receiver Receiver { get; set; }
        public Status Status { get; set; }
    }
}