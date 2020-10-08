using System.Collections.Generic;

namespace API.Dtos
{
    public class CustomerBasketDto
    {
        public string Id { get; set; }
        public List<BasketDto> Items { get; set; }
        public int? DeliveryMethodId { get; set; }
        public string ClientSecret { get; set; }
        public string PaymentIntentId { get; set; }
        public decimal ShippingPrice { get; set; }
    }
}