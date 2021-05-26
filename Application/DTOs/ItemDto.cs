using System;

namespace Application.DTOs
{
    public class ItemDto
    {
        public Guid ItemId { get; set; }
        public string Name { get; set; }
        public int WarehouseStock { get; set; }
    }
}