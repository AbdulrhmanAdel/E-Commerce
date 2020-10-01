using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithBrandsAndTypesSpecification : BaseSpecification<Product>
    {
        public ProductsWithBrandsAndTypesSpecification(ProductSpecParams productParams)
            : base(x => 
                (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId) && 
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId) &&
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search))
            )
        {
            AddInclude(b => b.ProductBrand);
            AddInclude(t => t.ProductType);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.PageSize, productParams.PageSize * (productParams.PageIndex - 1));

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort.ToLower())
                {
                    case "priceasc":
                        AddOrderBy(x => x.Price);
                        break;
                    case "pricedesc":
                        AddOrderByDesc(x => x.Price);
                        break;
                    default:
                        break;
                }
            }
        }

        public ProductsWithBrandsAndTypesSpecification(int id) 
            : base(x => x.Id == id)
        {
            AddInclude(b => b.ProductBrand);
            AddInclude(t => t.ProductType);
        }
    }
}