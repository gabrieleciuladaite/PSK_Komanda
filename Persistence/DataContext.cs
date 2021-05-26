using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace Persistence
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<BundleContents> BundleContents { get; set; }
        public DbSet<Card> Cards { get; set; }
        public DbSet<CardDesign> CardDesigns { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemBundle> ItemBundles { get; set; }
        public DbSet<Receiver> Receivers { get; set; }
        public DbSet<ItemBundleCategory> ItemBundleCategories { get; set;}
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<BundleContents>(x => x.HasKey(bc => new {bc.ItemBundleId, bc.ItemId}));
            builder.Entity<ItemBundleCategory>(x => x.HasKey(ibc => new {ibc.ItemBundleId, ibc.CategoryId}));
            builder.Entity<CartItem>(x => x.HasKey(ci => new {ci.CartId, ci.ItembundleId}));

            builder.Entity<BundleContents>()
                .HasOne(ib => ib.ItemBundle)
                .WithMany(i => i.Items)
                .HasForeignKey(bc => bc.ItemBundleId);

            builder.Entity<BundleContents>()
                .HasOne(i => i.Item)
                .WithMany(ib => ib.ItemBundles)
                .HasForeignKey(bc => bc.ItemId);

            builder.Entity<ItemBundleCategory>()
                .HasOne(c => c.Category)
                .WithMany(ib => ib.ItemBundles)
                .HasForeignKey(ibc => ibc.CategoryId);

            builder.Entity<ItemBundleCategory>()
                .HasOne(ib => ib.ItemBundle)
                .WithMany(c => c.Categories)
                .HasForeignKey(ibc => ibc.ItemBundleId);

            builder.Entity<CartItem>()
                .HasOne(c => c.Cart)
                .WithMany(ib => ib.Items)
                .HasForeignKey(ci => ci.CartId);

            builder.Entity<CartItem>()
                .HasOne(ib => ib.ItemBundle)
                .WithMany(c => c.Carts)
                .HasForeignKey(ci => ci.ItembundleId);


        }
    }
}