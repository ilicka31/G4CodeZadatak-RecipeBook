using Back.Models;
using Back.Repositories.Interfaces;
using System;

namespace Back.Database
{
    public class AdminInitializer : IAdminInitializer
    {
        private readonly IUserRepository _userRepository;

        public AdminInitializer(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task InitializeUserData()
        {
            List<User> users = await _userRepository.GetAll();
            if (users.Count != 0 && users.Find(u => String.Equals(u.Email, "admin@admin.com")) != null)
            {
                return;
            }
           await _userRepository.Register(new User()
            {
                Name = "Admin",
                Email = "admin@admin.com",
                Password = "admin",
                UserRole = Role.ADMIN
            });
           
        }
    }
}
