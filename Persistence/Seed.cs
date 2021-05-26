using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<User>
                {
                    new User{
                        UserName="miken",
                        Email="miken@geles.lt"
                    },
                    new User{
                        UserName="jakep",
                        Email="jakep@geles.lt",
                        UserRole=Role.user
                    },
                    new User{
                        UserName="russa",
                        Email="russa@geles.lt",
                        UserRole=Role.seller
                    },
                    new User{
                        UserName="veon",
                        Email="veon@geles.lt"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Passw0rd!");
                }
            }

            // if (context.Addresses.Any()) return;
            // if (context.BundleContents.Any()) return;
            // if (context.Cards.Any()) return;
            // if (context.CardDesigns.Any()) return;
            // if (context.Carts.Any()) return;
            // if (context.CartItems.Any()) return;
            // if (context.Items.Any()) return;
            if (context.ItemBundles.Any()) return;
            // if (context.Receivers.Any()) return;
            // if (context.Users.Any()) return;
            
            var ItemBundles = new List<ItemBundle>
            {
                new ItemBundle{
                    Title = "Roze",
                    Description = "Rozes vienetas.",
                    Price = 699
                },
                new ItemBundle{
                    Title = "Tulpe",
                    Description = "Tulpes vienetetas",
                    Price = 499
                },
                new ItemBundle{
                    Title="Maiselis",
                    Description="Maiselio vienetas",
                    Price = 20
                },
                new ItemBundle{
                    Title="Buketas Roze ir Tulpe maiselyje",
                    Description="Buketas, sudarytas is tulpiu, roziu bei maiselio",
                    Price = 2999
                }
            };

    
            // await context.Items.AddRangeAsync(Items);
            await context.ItemBundles.AddRangeAsync(ItemBundles);
            // await context.BundleContents.AddRangeAsync(BundleContents);
            await context.SaveChangesAsync();
        }
    }
}