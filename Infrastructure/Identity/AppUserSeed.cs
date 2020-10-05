using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppUserSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Abdelrhman",
                    Email = "abdo@gmail.com",
                    UserName = "Abdo",
                    Address = new Address
                    {
                        FirstName = "Abdo",
                        LastName = "Adel",
                        Street = "10",
                        City = "Abuhammad",
                        State = "A",
                        ZipCode = "16191214"
                    }
                };

                await userManager.CreateAsync(user, "Aa?123456");
            }


        }
    }
}