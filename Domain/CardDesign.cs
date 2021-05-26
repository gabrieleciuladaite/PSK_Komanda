using System;

namespace Domain
{
    public class CardDesign
    {
        public Guid CardDesignId { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string price { get; set; }
        public bool isEnabled { get; set; }
    }
}