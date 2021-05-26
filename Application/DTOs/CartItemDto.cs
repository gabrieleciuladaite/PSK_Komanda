using System;
using Domain;

namespace Application.DTOs
{
    public class CartItemDto
    {
        public Guid ItemBundleId { get; set; }
        public ItemBundleDto ItemBundle { get; set; }
        public int Quantity { get; set; }
    }
}