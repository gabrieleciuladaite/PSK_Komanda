using System;


namespace Domain
{
    public class BundleContents
    {
        public Guid ItemBundleId { get; set; }
        public ItemBundle ItemBundle { get; set; }
        public Guid ItemId { get; set; }
        public Item Item { get; set; }
        public int Quantity { get; set; }
    }
}