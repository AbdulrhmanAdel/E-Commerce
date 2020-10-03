using System.Collections.Generic;

namespace Core.Entities
{
    public class CustomerBasket
    {
        public string Id { get; set; }
        public List<Basket> Items { get; set; } = new List<Basket>();

        public CustomerBasket()
        {
        }
        public CustomerBasket(string id)
        {
            Id = id;
        }
    }
}