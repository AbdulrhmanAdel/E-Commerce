using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseController
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IMapper _mapper;
        public BasketController(IBasketRepository basketRepo,
        IMapper mapper)
        {
            _mapper = mapper;
            _basketRepo = basketRepo;

        }

    [HttpGet]
    public async Task<ActionResult> GetBasket(string id)
    {
        var basket = await _basketRepo.GetBasketAsync(id);

        return Ok(basket ?? new CustomerBasket(id));
    }

    [HttpPost]
    public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basketDto)
    {
        var basket = _mapper.Map<CustomerBasket>(basketDto);
        
        var updatedBasket = await _basketRepo.UpdateBasketAsync(basket);

        return Ok(updatedBasket);
    }

    [HttpDelete]
    public async Task DeleteBasket(string id)
    {
        await _basketRepo.DeleteBasketAsync(id);
    }
}
}