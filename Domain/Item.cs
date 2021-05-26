using System;
using System.Collections.Generic;


namespace Domain
{
    public class Item
    {
        public Guid ItemId { get; set; }
        public string Name { get; set; }
        public UInt32 WarehouseStock { get; set; }
        public ICollection<BundleContents> ItemBundles { get; set; } = new List<BundleContents>();
    }
}