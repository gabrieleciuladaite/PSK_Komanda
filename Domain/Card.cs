using System;

namespace Domain
{
    public class Card
    {
        public Guid CardId { get; set; }
        public CardDesign Design { get; set; }
        public string message { get; set; }
        public string from { get; set; }
        public string to { get; set; }
    }
}