using API.Dtos;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class OrderImageUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration _config;
        public OrderImageUrlResolver(IConfiguration config)
        {
            _config = config;

        }
        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.ItemOrdered.ImageUrl))
                return _config["ApiUrl"] + source.ItemOrdered.ImageUrl;

            return null;
        }
    }
}