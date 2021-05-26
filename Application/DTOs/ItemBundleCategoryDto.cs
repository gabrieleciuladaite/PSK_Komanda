using System;

namespace Application.DTOs
{
    public class ItemBundleCategoryDto
    {
        public Guid CategoryId { get; set; }
        public CategoryDto Category { get; set; }
    }
}