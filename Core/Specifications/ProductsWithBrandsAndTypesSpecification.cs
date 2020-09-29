using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithBrandsAndTypesSpecification : BaseSpecification<Product>
    {
        public ProductsWithBrandsAndTypesSpecification()
        {
            AddInclude(b => b.ProductBrand);
            AddInclude(t => t.ProductType);
        }

        public ProductsWithBrandsAndTypesSpecification(int id) 
            : base(x => x.Id == id)
        {
            AddInclude(b => b.ProductBrand);
            AddInclude(t => t.ProductType);
        }
    }
}