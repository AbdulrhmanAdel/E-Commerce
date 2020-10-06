using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;

namespace Infrastructure.Services {
    public class OrderService : IOrderService {
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        public OrderService (IUnitOfWork unitOfWork, IBasketRepository basketRepo) 
        {
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
        }

        public async Task<Order> CreateOrderAsync (string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress) 
        {
            // get basket from repo
            var basket = await _basketRepo.GetBasketAsync (basketId);

            // get items from product repo
            var items = new List<OrderItem> ();
            foreach (var item in basket.Items) {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync (item.Id);
                var itemOrdered = new ProductItemOrdered (productItem.Id, productItem.Name, productItem.ImageUrl);
                var orderItem = new OrderItem (itemOrdered, productItem.Price, item.Quantity);
                items.Add (orderItem);
            }

            // get delivery method from repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync (deliveryMethodId);

            // cal subtotal
            var subtotal = items.Sum (item => item.Price * item.Quantity);

            // create order and save to db
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);
            _unitOfWork.Repository<Order>().Add(order);

            // save to db
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            // delete basket
            await _basketRepo.DeleteBasketAsync(basketId);

            // return order
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync () 
        {
            return await _unitOfWork.Repository<DeliveryMethod>().GetListAsync();
        }

        public async Task<Order> GetOrderByIdAsync (int id, string buyerEmail)
        {
            var spec = new OrderWithItemsSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync (string buyerEmail) 
        {
            var spec = new OrderWithItemsSpecification(buyerEmail);

            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}