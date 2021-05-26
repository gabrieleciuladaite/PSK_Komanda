using System;

namespace Application.DTOs
{
    public class BundleContentsDto
    {
        public Guid ItemId { get; set; }
        public ItemDto Item { get; set; }
        public int Quantity { get; set; }
    }
}