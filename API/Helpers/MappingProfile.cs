using System.Reflection;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(p => p.ProductBrand, opt => opt.MapFrom(p => p.ProductBrand.Name))
                .ForMember(p => p.ProductType, opt => opt.MapFrom(p => p.ProductType.Name))
                .ForMember(p => p.ImageUrl, opt => opt.MapFrom<ProductUrlResolver>());
            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<BasketDto, Basket>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>().ReverseMap();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>().ReverseMap();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(od => od.DeliveryMethod, opt => opt.MapFrom(o => o.DeliveryMethod.ShortName))
                .ForMember(od => od.ShippingPrice, opt => opt.MapFrom(o => o.DeliveryMethod.Price))
                .ForMember(od => od.Total, opt => opt.MapFrom(o => o.GetTotal()))
                .ReverseMap();

            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(od => od.ProductId, opt => opt.MapFrom(o => o.ItemOrdered.ProductItemId))
                .ForMember(od => od.ProductName, opt => opt.MapFrom(o => o.ItemOrdered.ProducyName))
                .ForMember(od => od.ImageUrl, opt => opt.MapFrom(o => o.ItemOrdered.ImageUrl))
                .ForMember(od => od.ImageUrl, opt => opt.MapFrom<OrderImageUrlResolver>())
                .ReverseMap();
        }
    }
}