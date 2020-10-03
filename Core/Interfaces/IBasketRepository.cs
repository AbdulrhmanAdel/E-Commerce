using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
         Task<CustomerBasket> GetBasketAsync(string Id);
         Task<CustomerBasket> UpdateBasketAsync(CustomerBasket customerBasket);
         Task<bool> DeleteBasketAsync(string Id);
    }
}