using System;
using System.Collections.Generic;
using System.Linq;

namespace Application.DTOs
{
    public class ItemBundleDto
    {
        public Guid ItemBundleId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
        public UInt32 Price { get; set; }
        public ICollection<BundleContentsDto> Items {get; set;} = new List<BundleContentsDto>();
        public ICollection<ItemBundleCategoryDto> Categories { get; set; } = new List<ItemBundleCategoryDto>();
        public int stock {get; set;}
        public int OPTIMISTIC_LOCK_VERSION { get; set; }
    }
}