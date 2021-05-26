using System;
using System.Collections.Generic;

namespace Domain
{
    public class Category
    {
        public Guid CategoryId { get; set; }
        public string Name { get; set; }
        public ICollection<ItemBundleCategory> ItemBundles { get; set; } = new List<ItemBundleCategory>();
    }
}