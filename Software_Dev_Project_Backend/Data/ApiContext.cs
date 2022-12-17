using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class ApiContext : DbContext
    {

        public DbSet<UserData> user_data { get; set; }
        public DbSet<ProductCategory> product_category { get; set; }
        public DbSet<UserAddress> user_address { get; set; }
        public DbSet<Product> product { get; set; }
        public DbSet<CartItem> cart_item { get; set; }
        public DbSet<PaymentDetails> payment_details { get; set; }
        public DbSet<Orders> orders { get; set; }
        public DbSet<OrderDetails> order_details { get; set; }
        public DbSet<GeoDetails> geo_details { get; set; }









        public ApiContext(DbContextOptions<ApiContext> options)
            :base(options)
        {

        }

    }
}
