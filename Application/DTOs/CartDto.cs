using System;
using System.Collections.Generic;
using Domain;

namespace Application.DTOs
{
    public class CartDto
    {
        public Guid CartId { get; set;}
        public DateTime LastUsed { get; set; }
        public string CartOwner { get; set; }
        public List<CartItemDto> Items { get; set; } = new List<CartItemDto>();
        public Card Card { get; set; }
        public CartAddress ShippingAddress { get; set; }
        public Receiver Receiver { get; set; }
        public Status Status { get; set; }
    }
}