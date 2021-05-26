using System;

namespace Domain
{
    public class ItemBundleCategory
    {
        public Guid ItemBundleId { get; set; }
        public ItemBundle ItemBundle { get; set; }

        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
    }
}