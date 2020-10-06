namespace Core.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {
        public int ProductItemId { get; set; }
        public string ProducyName { get; set; }
        public string ImageUrl { get; set; }
        public ProductItemOrdered()
        {
        }
        public ProductItemOrdered(int productItemId, string producyName, string imageUrl)
        {
            ProductItemId = productItemId;
            ProducyName = producyName;
            ImageUrl = imageUrl;
        }
    }
}