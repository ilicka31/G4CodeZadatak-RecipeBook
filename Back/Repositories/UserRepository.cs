using Back.Database;
using Back.DTOs.User;
using Back.Models;
using Back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Back.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly RecipeDbContext _dbContext;

        public UserRepository(RecipeDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> AddCook(User cook)
        {
            await _dbContext.Users.AddAsync(cook);
            await _dbContext.SaveChangesAsync(); // proveri treba li
            return cook;
        }

        public async Task<List<User>> GetAllCooks()
        {
            return await _dbContext.Users.ToListAsync();
        }
        public async Task<User> GetByEmail(string email)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.Email.Equals(email));
        }


        public async Task<User> Register(User user)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }
    }
}
