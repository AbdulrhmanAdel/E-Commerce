using API.Dtos;
using AutoMapper;
using Core.Entities;

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
        }
    }
}