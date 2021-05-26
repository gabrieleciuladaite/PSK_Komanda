using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class ItemBundle
    {
        public Guid ItemBundleId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Photo { get; set; }
        public UInt32 Price { get; set; }
        public ICollection<BundleContents> Items { get; set; } = new List<BundleContents>();
        public ICollection<ItemBundleCategory> Categories { get; set; } = new List<ItemBundleCategory>();
        public ICollection<CartItem> Carts { get; set; } = new List<CartItem>();
        public int OPTIMISTIC_LOCK_VERSION {get; set;}
    }
}